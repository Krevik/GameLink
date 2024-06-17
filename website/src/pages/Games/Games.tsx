import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.tsx";
import { RestUtils } from "../../utils/RestUtils.ts";
import styles from "./Games.module.scss";
import { Pagination } from "./Pagination/Pagination.tsx";
import { SearchBar } from "./SearchBar/SearchBar.tsx";
import { GameCard } from "./GameCard/GameCard.tsx";

export interface GameDTO {
    id: number;
    alternative_names?: number[];
    category?: number;
    created_at?: number;
    dlcs?: number[];
    expanded_games?: number[];
    genres?: number[];
    name: string;
    platforms?: number[];
    aggregated_rating?: number;
    total_rating?: number;
    img_url?: string;
    summary?: string;
    similar_games?: number[];
}

const Games: React.FC = () => {
    const [games, setGames] = useState<GameDTO[]>([]);
    const [totalGames, setTotalGames] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        let timeout = setTimeout(fetchGames, 300);
        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const fetchGames = () => {
        RestUtils.Games.getGames().then((data) => {
            setGames(data);
            setTotalGames(data.length);
        });
    };

    useEffect(fetchGames, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <Layout>
            <div className={styles.gamesPage}>
                <SearchBar onSearch={handleSearch} />
                <div className={styles.gamesList}>
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={Math.ceil(totalGames / 10)} onPageChange={setCurrentPage} />
            </div>
        </Layout>
    );
};

export default Games;
