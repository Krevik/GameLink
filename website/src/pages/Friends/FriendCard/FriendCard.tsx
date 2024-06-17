import styles from "./FriendCard.module.scss";
import { FriendDTO } from "../Friends.tsx";
import { Card } from "primereact/card";
import { HOST_URL } from "../../../api/axiosConfig.ts";

interface FriendCardProps {
    friend: FriendDTO;
}

export const FriendCard = (props: FriendCardProps) => {
    return (
        <Card title={props.friend?.friend?.username}>
            <img src={`${HOST_URL}${props.friend?.friend?.profile?.avatarUrl}`} alt="Profile Picture" className={styles.profilePicture} />
        </Card>
    );
};
