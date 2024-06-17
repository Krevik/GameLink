import Layout from "../../components/Layout/Layout.tsx";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store.ts";
import { RestUtils } from "../../utils/RestUtils.ts";
import { UserProfile } from "../../types/profileTypes.ts";
import styles from "./Friends.module.scss";
import { FriendCard } from "./FriendCard/FriendCard.tsx";

export interface FriendUserDTO {
    id: number;
    steamId?: string;
    email: string;
    username: string;
    profile?: UserProfile;
}

export interface FriendDTO {
    id: number;
    senderId: number;
    receiverId: number;
    accepted: boolean;
    friend: FriendUserDTO;
}

export const Friends = () => {
    const currentLoggedInUserId: number | null = useSelector((state: AppState) => state.auth.userId);
    const [friends, setFriends] = useState<FriendDTO[]>([]);

    const loadFriends = () => {
        RestUtils.Friends.getAll(currentLoggedInUserId!).then(setFriends);
    };

    useEffect(loadFriends, [currentLoggedInUserId]);

    const mapFriendsToFriendCards = (friends: FriendDTO[]): ReactElement[] => friends.map((friend) => <FriendCard friendDTO={friend} onFriendRemoval={loadFriends} />);

    return (
        <Layout>
            <div className={styles.friends}>{mapFriendsToFriendCards(friends)}</div>
        </Layout>
    );
};
