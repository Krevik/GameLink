import Layout from "../../components/Layout/Layout.tsx";
import React, { useEffect, useState } from "react";
import { translate, translateAnything } from "../../utils/translation/TranslationUtils.ts";
import { SexType, UserProfile } from "../../types/profileTypes.ts";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store.ts";
import { RestUtils, UserProfileUpdateDTO } from "../../utils/RestUtils.ts";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { notifyError, notifySuccess } from "../../utils/notificationUtils.ts";
import { InputTextarea } from "primereact/inputtextarea";
import { UploadableProfilePicture } from "../../components/UploadableProfilePicture/UploadableProfilePicture.tsx";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Card } from "primereact/card";
import "./MyProfile.css";
import { InputText } from "primereact/inputtext";

export const MyProfile = () => {
    const userId: number | null = useSelector((state: AppState) => state.auth.userId);
    const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
    const [isUpdateInProgress, setIsUpdateInProgress] = useState<boolean>(false);

    useEffect(() => {
        loadUserProfile();
    }, [userId]);

    const loadUserProfile = () => {
        setIsUpdateInProgress(true);
        RestUtils.Profile.getByUserId(userId!)
            .then(setProfile)
            .finally(() => setIsUpdateInProgress(false));
    };

    const sexSelectOptions: SelectItem[] = Object.keys(SexType).map((sex) => ({
        label: translateAnything(sex),
        value: sex,
    }));

    //function for stripping id out of userProfile object
    const getUserProfileWithoutId = (userProfile: UserProfile): UserProfileUpdateDTO => {
        const { id, userId, ...rest } = userProfile;
        return rest;
    };

    const updateUserProfile = (userProfile: UserProfile) => {
        setIsUpdateInProgress(true);
        RestUtils.Profile.updateProfile(userId!, getUserProfileWithoutId(userProfile))
            .then((result) => {
                if (result.isSuccess) {
                    loadUserProfile();
                } else {
                    notifyError(result.message);
                }
            })
            .finally(() => {
                setIsUpdateInProgress(false);
                notifySuccess("Profile updated!");
            });
    };

    const onSexChange = (event: DropdownChangeEvent) => {
        const updatedProfile: UserProfile = { ...profile, userId: userId! };
        updatedProfile.sex = event.target.value;
        updateUserProfile(updatedProfile);
    };

    const onAgeChange = (event: InputNumberChangeEvent) => {
        const updatedProfile: UserProfile = { ...profile, userId: userId! };
        if (event.value && event.value > 0) {
            updatedProfile.age = event.value;
            updateUserProfile(updatedProfile);
        } else {
            notifyError("Age cannot be less than 0!");
        }
    };

    return (
        <Layout>
            <div className="profile-container">
                <Card title={translate("MY_PROFILE")} className="profile-card">
                    <div className="profile-content">
                        <UploadableProfilePicture avatarFileName={profile?.avatarUrl} onNewAvatarUploaded={loadUserProfile} />
                        <div className="profile-details">
                            <div className="profile-field">
                                <label>Sex</label>
                                <Dropdown disabled={isUpdateInProgress} value={profile?.sex} options={sexSelectOptions} onChange={onSexChange} className="p-inputtext-sm" />
                            </div>
                            <div className="profile-field">
                                <label>Age</label>
                                <InputNumber value={profile?.age} onChange={onAgeChange} className="p-inputtext-sm" />
                            </div>
                            <div className="profile-field">
                                <label>Bio</label>
                                <InputTextarea
                                    value={profile?.bio ?? ""}
                                    onChange={(event) =>
                                        setProfile({
                                            ...profile,
                                            userId: userId!,
                                            bio: event.target.value,
                                        })
                                    }
                                    cols={60}
                                    rows={5}
                                    autoResize={true}
                                    onBlur={() => updateUserProfile(profile!)}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="profile-field">
                                <label>Favourite Platform</label>
                                <InputText
                                    value={profile?.favouritePlatform ?? ""}
                                    onChange={(event) =>
                                        setProfile({
                                            ...profile,
                                            userId: userId!,
                                            favouritePlatform: event.target.value,
                                        })
                                    }
                                    onBlur={() => updateUserProfile(profile!)}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="profile-field">
                                <label>Available Platforms</label>
                                <InputText
                                    value={profile?.availablePlatforms?.join(",") ?? ""}
                                    onChange={(event) =>
                                        setProfile({
                                            ...profile,
                                            userId: userId!,
                                            availablePlatforms: event.target.value.split(","),
                                        })
                                    }
                                    onBlur={() => updateUserProfile(profile!)}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <div className="profile-field">
                                <label>Favourite Games</label>
                                <InputText
                                    value={profile?.favouriteGames?.join(",") ?? ""}
                                    onChange={(event) =>
                                        setProfile({
                                            ...profile,
                                            userId: userId!,
                                            favouriteGames: event.target.value.split(","),
                                        })
                                    }
                                    onBlur={() => updateUserProfile(profile!)}
                                    className="p-inputtext-sm"
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
