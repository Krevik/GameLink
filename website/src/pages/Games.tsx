import React, { useEffect, useState } from "react";
import { getAllGames } from "../api/gameApi";
import Layout from "../components/Layout/Layout.tsx";

const Games: React.FC = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await getAllGames();
            setGames(response.data);
        };

        fetchGames();
    }, []);

    return (
        <Layout>
            <h1>Games</h1>
            <ul>
                {games.map((game: any) => (
                    <li key={game.id}>{game.title}</li>
                ))}
            </ul>
        </Layout>
    );
};

export default Games;
