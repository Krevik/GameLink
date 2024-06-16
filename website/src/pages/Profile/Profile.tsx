import Layout from "../../components/Layout/Layout.tsx";
import React, { ReactElement, useEffect, useState } from "react";
import { translate, translateAnything } from "../../utils/translation/TranslationUtils.ts";
import { SexType, UserProfile } from "../../types/profileTypes.ts";
import { RestUtils, UserProfileUpdateDTO } from "../../utils/RestUtils.ts";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { InputTextarea } from "primereact/inputtextarea";
import { UploadableProfilePicture } from "../../components/UploadableProfilePicture/UploadableProfilePicture.tsx";
import { InputNumber, InputNumberChangeEvent } from "primereact/inputnumber";
import { Card } from "primereact/card";
import "./Profile.css";
import { InputText } from "primereact/inputtext";
import { NotificationUtils } from "../../utils/notificationUtils.ts";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store.ts";
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { Tooltip } from "primereact/tooltip";

export const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
    const [isUpdateInProgress, setIsUpdateInProgress] = useState<boolean>(false);
    const currentLoggedInUserId: number | null = useSelector((state: AppState) => state.auth.userId);

    const isMyProfile: boolean = currentLoggedInUserId === profile?.userId;

    const { userId } = useParams();

    useEffect(() => {
        userId && loadUserProfile(Number(userId));
    }, [userId]);

    const loadUserProfile = (userId: number) => {
        setIsUpdateInProgress(true);
        RestUtils.Profile.getByUserId(userId)
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
        RestUtils.Profile.updateProfile(Number(userId), getUserProfileWithoutId(userProfile))
            .then((result) => {
                if (result.isSuccess) {
                    loadUserProfile(Number(userId));
                } else {
                    NotificationUtils.notifyError(result.message);
                }
            })
            .finally(() => {
                setIsUpdateInProgress(false);
                NotificationUtils.notifySuccess("Profile updated!");
            });
    };

    const onSexChange = (event: DropdownChangeEvent) => {
        const updatedProfile: UserProfile = { ...profile, userId: Number(userId) };
        updatedProfile.sex = event.target.value;
        updateUserProfile(updatedProfile);
    };

    const onAgeChange = (event: InputNumberChangeEvent) => {
        const updatedProfile: UserProfile = { ...profile, userId: Number(userId) };
        if (event.value && event.value > 0) {
            updatedProfile.age = event.value;
            updateUserProfile(updatedProfile);
        } else {
            NotificationUtils.notifyError("Age cannot be less than 0!");
        }
    };

    const getSexFieldElement = (): ReactElement => (
        <div className="profile-field">
            <label>Sex</label>
            <Dropdown disabled={isUpdateInProgress || !isMyProfile} value={profile?.sex} options={sexSelectOptions} onChange={onSexChange} />
        </div>
    );

    const getAgeFieldElement = (): ReactElement => (
        <div className="profile-field">
            <label>Age</label>
            <InputNumber disabled={!isMyProfile} value={profile?.age} onChange={onAgeChange} />
        </div>
    );

    const getBioFieldElement = (): ReactElement => (
        <div className="profile-field">
            <label>Bio</label>
            <InputTextarea
                disabled={!isMyProfile}
                value={profile?.bio ?? ""}
                onChange={(event) =>
                    setProfile({
                        ...profile,
                        userId: Number(userId),
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
    );

    const getFavouritePlatformFieldElement = (): ReactElement => (
        <div className="profile-field">
            <label>Favourite Platform</label>
            <InputText
                disabled={!isMyProfile}
                value={profile?.favouritePlatform ?? ""}
                onChange={(event) =>
                    setProfile({
                        ...profile,
                        userId: Number(userId),
                        favouritePlatform: event.target.value,
                    })
                }
                onBlur={() => updateUserProfile(profile!)}
                className="p-inputtext-sm"
            />
        </div>
    );

    const getAvailablePlatformsFieldElement = (): ReactElement => (
        <div className="profile-field">
            <label>Available Platforms</label>
            <Chips
                tooltip={"Use comma for separating platforms"}
                separator={","}
                disabled={!isMyProfile}
                value={profile?.availablePlatforms}
                onBlur={() => updateUserProfile(profile!)}
                onChange={(event: ChipsChangeEvent) =>
                    setProfile({
                        ...profile,
                        userId: Number(userId),
                        availablePlatforms: event.target.value,
                    })
                }
            />
        </div>
    );

    const getFavouriteGamesFieldElement = (): ReactElement => (
        <div className="profile-field">
            <label>Favourite Games</label>
            <Chips
                tooltip={"Use comma for separating games"}
                separator={","}
                disabled={!isMyProfile}
                value={profile?.favouriteGames}
                onBlur={() => updateUserProfile(profile!)}
                onChange={(event: ChipsChangeEvent) =>
                    setProfile({
                        ...profile,
                        userId: Number(userId),
                        favouriteGames: event.target.value,
                    })
                }
            />
        </div>
    );

    return (
        <Layout>
            <div className="profile-container">
                <Card title={translate("MY_PROFILE")} className="profile-card">
                    <div className="profile-content">
                        <UploadableProfilePicture avatarFileName={profile?.avatarUrl} onNewAvatarUploaded={() => loadUserProfile(Number(userId))} editionEnabled={isMyProfile} />
                        <div className="profile-details">
                            <div className="details-row">
                                {getSexFieldElement()}
                                {getAgeFieldElement()}
                            </div>
                            {getBioFieldElement()}
                            {getFavouritePlatformFieldElement()}
                            {getAvailablePlatformsFieldElement()}
                            {getFavouriteGamesFieldElement()}
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};
