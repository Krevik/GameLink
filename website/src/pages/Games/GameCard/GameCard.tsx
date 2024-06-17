// src/components/GameCard/GameCard.tsx

import React from "react";
import styles from "./GameCard.module.scss";
import { GameDTO } from "../Games.tsx";

interface GameCardProps {
    game: GameDTO;
}

const HOST_URL = "https://example.com";

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
    return (
        <div className={styles.gameCard}>
            <div className={styles.imageContainer}>
                <img src={game.img_url ? game.img_url : `${HOST_URL}/path/to/default/image.jpg`} alt={game.name} className={styles.coverImage} />
            </div>
            <div className={styles.gameInfo}>
                <h3 className={styles.gameName}>{game.name}</h3>
                {game.aggregated_rating && <p className={styles.rating}>Rating: {game.aggregated_rating}</p>}
            </div>
            {game.summary && <div className={styles.summary}>{game.summary}</div>}
        </div>
    );
};
