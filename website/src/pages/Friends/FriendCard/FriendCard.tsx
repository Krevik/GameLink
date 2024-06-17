import styles from "./FriendCard.module.scss";
import { FriendDTO } from "../Friends.tsx";
import { HOST_URL } from "../../../api/axiosConfig.ts";
import { useNavigate } from "react-router-dom";
import { RestUtils } from "../../../utils/RestUtils.ts";
import { NotificationUtils } from "../../../utils/notificationUtils.ts";
import { Button } from "primereact/button";

interface FriendCardProps {
    friendDTO: FriendDTO;
    onFriendRemoval: () => void;
}

export const FriendCard = (props: FriendCardProps) => {
    const navigate = useNavigate();

    const handleFriendRemoval = async () => {
        const result = await RestUtils.Friends.removeFriend(props.friendDTO.senderId, props.friendDTO.receiverId);
        if (result.isSuccess) {
            NotificationUtils.notifySuccess("Friend removed successfully");
            props.onFriendRemoval();
        }
    };

    const handleOpenConversation = () => {
        RestUtils.Conversations.createConversation(props.friendDTO.senderId, props.friendDTO.receiverId);
        //TODO open that particular conversations after creation
    };

    return (
        <div className={styles.friendCard}>
            <img src={`${HOST_URL}${props.friendDTO.friend.profile?.avatarUrl}`} alt="Profile Picture" className={styles.profilePicture} />
            <h3 className={styles.friendName}>{props.friendDTO.friend.username}</h3>
            {props.friendDTO.friend.profile && (
                <div className={styles.friendDetails}>
                    {props.friendDTO.friend.profile.bio && <p className={styles.bio}>{props.friendDTO.friend.profile.bio}</p>}
                    {props.friendDTO.friend.profile.platform && <p className={styles.platform}>Platform: {props.friendDTO.friend.profile.platform}</p>}
                    {props.friendDTO.friend.profile.availability && <p className={styles.availability}>Availability: {props.friendDTO.friend.profile.availability}</p>}
                </div>
            )}
            <div className={styles.friendActions}>
                <Button className={styles.messageBtn} onClick={handleOpenConversation}>
                    Message
                </Button>
                <Button className={styles.viewProfileBtn} onClick={() => navigate(`/profile/${props.friendDTO.friend.id}`)}>
                    View Profile
                </Button>
                <Button className={styles.removeFriendBtn} onClick={handleFriendRemoval}>
                    Remove
                </Button>
            </div>
        </div>
    );
};
