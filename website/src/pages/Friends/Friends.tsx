import Layout from "../../components/Layout/Layout.tsx";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store.ts";
import { RestUtils } from "../../utils/RestUtils.ts";
import { DataTable } from "primereact/datatable";
import { UserProfile } from "../../types/profileTypes.ts";
import { GenericColumn } from "../../components/DataTable/GenericColumn.tsx";
import { HOST_URL } from "../../api/axiosConfig.ts";
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

    useEffect(() => {
        RestUtils.Friends.getAll(currentLoggedInUserId!).then(setFriends);
    }, [currentLoggedInUserId]);

    // const getPersonCellBody = (rowData: FriendDTO): ReactElement => (
    //     <div className={styles.person}>
    //         <img src={`${HOST_URL}${rowData.friend?.profile?.avatarUrl}`} alt="Profile Picture" className={styles.profilePicture} />
    //         <div className={styles.userName}>{rowData.friend.username}</div>
    //     </div>
    // );

    const mapFriendsToFriendCards = (friends: FriendDTO[]): ReactElement[] => friends.map((friend) => <FriendCard friend={friend} />);

    return (
        <Layout>
            <div className={styles.friends}>{mapFriendsToFriendCards(friends)}</div>
        </Layout>
    );
};
