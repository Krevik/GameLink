import axiosInstance from "../api/axiosConfig.ts";
import { UserProfile } from "../types/profileTypes.ts";
import { FriendDTO } from "../pages/Friends/Friends.tsx";
import { GameDTO, GamesInfoDTO } from "../pages/Games/Games.tsx";
import { Conversation } from "../store/slices/messagesSlice.ts";

export interface CommandResultFailure {
    isSuccess: false;
    message: string;
}

export interface CommandResultSuccess {
    isSuccess: true;
    message: never;
}

export interface GamePlatformDTO {
    id: number;
    name: string;
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
    Friends: {
        getAll: (userId: number) => axiosInstance.get<FriendDTO[]>(`/friends/${userId}/friends`).then((data) => data.data),
        removeFriend: (userId: number, friendId: number) => axiosInstance.delete<CommandResult>(`/friends/${userId}/remove/${friendId}`).then((data) => data.data),
    },
    Conversations: {
        getOrCreateConversation: (userId: number, userId2: number) =>
            axiosInstance.post<Conversation | undefined>(`/conversations/create`, { participants: [userId2, userId] }).then((data) => data.data),
    },
    Games: {
        getGames: (count: number = 100, offset: number = 0, searchQuery?: string) =>
            axiosInstance.get<GamesInfoDTO>(`/games/${offset}/${count}/${searchQuery}`).then((data) => data.data)
    },
    Platforms: {
        getPlatforms: (count: number = 400, offset: number = 0) => axiosInstance.get<GamePlatformDTO[]>(`/platforms/${offset}/${count}`).then((data) => data.data)
    }
};
