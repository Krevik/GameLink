import axiosInstance from "../api/axiosConfig.ts";
import { UserProfile } from "../types/profileTypes.ts";

export interface CommandResultFailure {
    isSuccess: false;
    message: string;
}

export interface CommandResultSuccess {
    isSuccess: true;
    message: never;
}

export type UserProfileUpdateDTO = Omit<UserProfile, "id" | "userId">;

export type CommandResult = CommandResultFailure | CommandResultSuccess;

export const RestUtils = {
    Profile: {
        getByUserId: (userId: number) => axiosInstance.get<UserProfile>(`/profiles/${userId}`).then((data) => data.data),
        updateProfile: (userId: number, profileData: UserProfileUpdateDTO) => axiosInstance.post<CommandResult>(`/profiles/${userId}`, profileData).then((data) => data.data),
        uploadProfilePicture: (userId: number, fileData: FormData): Promise<CommandResult> =>
            axiosInstance
                .post<CommandResult>(`/profiles/uploadProfilePicture/${userId}`, fileData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((data) => data.data),
    },
};
