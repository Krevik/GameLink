import { Request, Response } from "express";
import { createGame, getGameById, getAllGames } from "../services/gameService";
import { CommandResult } from "../utils/CommandResult";

export const handleCreateGame = async (req: Request, res: Response) => {
    const { title, genre, platform } = req.body;
    try {
        await createGame(title, genre, platform);
        res.status(201).json(CommandResult.success());
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error creating game"));
    }
};

export const handleGetGameById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const game = await getGameById(Number(id));
        if (game) {
            res.json(game);
        } else {
            res.status(404).json(CommandResult.failure("Game not found"));
        }
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error fetching game"));
    }
};

export const handleGetAllGames = async (req: Request, res: Response) => {
    try {
        const games = await getAllGames();
        res.json(games);
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error fetching games"));
    }
};
