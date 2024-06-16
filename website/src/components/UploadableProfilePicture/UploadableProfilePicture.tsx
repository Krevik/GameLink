import React, { useEffect, useRef, useState } from "react";
import { CommandResult, RestUtils } from "../../utils/RestUtils.ts";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store.ts";
import { HOST_URL } from "../../api/axiosConfig.ts";
import "./UploadableProfilePicture.css";
import { NotificationUtils } from "../../utils/notificationUtils.ts";

interface UploadableProfilePictureProps {
    avatarFileName?: string;
    onNewAvatarUploaded: () => void;
    editionEnabled?: boolean;
}

export const UploadableProfilePicture = (props: UploadableProfilePictureProps) => {
    const userId: number = useSelector((state: AppState) => state.auth.userId)!;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef: React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (props.avatarFileName) {
            setPreview(`${HOST_URL}${props.avatarFileName}`);
        }
    }, [props.avatarFileName]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

        await handleUpload();
        props.onNewAvatarUploaded();
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const result: CommandResult = await RestUtils.Profile.uploadProfilePicture(userId, formData);
            if (result.isSuccess) {
                NotificationUtils.notifySuccess("PROFILE_PICTURE_UPDATED");
                props.onNewAvatarUploaded();
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const onInputClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="profile-picture-upload">
            <div className="profile-picture-preview">
                <img src={preview ?? `${HOST_URL}${props.avatarFileName}`} alt="Profile Preview" className="profile-picture" onClick={props.editionEnabled && onInputClick} />
                <input ref={fileInputRef} style={{ display: "none" }} type="file" accept="image/*" onChange={props.editionEnabled && handleFileChange} className="file-input" />
            </div>
        </div>
    );
};
