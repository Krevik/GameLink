import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.tsx";
import { RestUtils } from "../../utils/RestUtils.ts";
import styles from "./Games.module.scss";
import { Pagination } from "./Pagination/Pagination.tsx";
import { SearchBar } from "./SearchBar/SearchBar.tsx";
import { GameCard } from "./GameCard/GameCard.tsx";
import { ProgressSpinner } from "primereact/progressspinner";

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

export interface GamesInfoDTO {
    games: GameDTO[];
    totalGames: number;
}

const GAMES_COUNT_PER_PAGE: number = 50;

const Games: React.FC = () => {
    const [games, setGames] = useState<GameDTO[]>([]);
    const [totalGames, setTotalGames] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    //TODO render spinner when loading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(fetchGames, 300);
        return () => clearTimeout(timeout);
    }, [searchQuery, currentPage]);

    const fetchGames = () => {
        setIsLoading(true);
        RestUtils.Games.getGames(GAMES_COUNT_PER_PAGE, GAMES_COUNT_PER_PAGE * (currentPage - 1), searchQuery)
            .then((data) => {
                setGames(data.games);
                setTotalGames(data.totalGames);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(fetchGames, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <Layout>
            <div className={styles.gamesPage}>
                <SearchBar onQueryChange={handleSearch} disabled={isLoading} />
                {isLoading ? (
                    <ProgressSpinner className={styles.spinner} />
                ) : (
                    <div className={styles.gamesList}>
                        {games.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}
                <Pagination currentPage={currentPage} totalPages={Math.ceil(totalGames / GAMES_COUNT_PER_PAGE)} onPageChange={setCurrentPage} />
            </div>
        </Layout>
    );
};

export default Games;
