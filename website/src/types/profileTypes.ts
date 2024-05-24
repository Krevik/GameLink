export type UserProfile = {
    id?: number;
    userId: number;
    sex?: SexType;
    bio?: string;
    avatarUrl?: string;
    platform?: string;
    availability?: string;
    age?: number;
    favouritePlatform?: string;
    availablePlatforms?: string[];
    favouriteGames?: string[];
};

export enum SexType {
    MALE = "MALE",
    FEMALE = "FEMALE",
}
