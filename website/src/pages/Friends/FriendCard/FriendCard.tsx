import styles from "./FriendCard.module.scss";
import { FriendDTO } from "../Friends.tsx";
import { HOST_URL } from "../../../api/axiosConfig.ts";

interface FriendCardProps {
    friendDTO: FriendDTO;
}

export const FriendCard = (props: FriendCardProps) => {
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
                <button className={styles.messageBtn}>Message</button>
                <button className={styles.viewProfileBtn}>View Profile</button>
                <button className={styles.removeFriendBtn}>Remove</button>
            </div>
        </div>
    );
};
