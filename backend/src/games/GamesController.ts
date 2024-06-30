import { Request, Response } from "express";
import { ConversationService } from "../conversation/ConversationService";
import { CommandResult } from "../utils/CommandResult";
import { prisma } from "../../index";
import { GameInfo } from "@prisma/client";

export interface GamesInfoDTO {
    games: GameInfo[];
    totalGames: number;
}

export const GamesController = {
    handleGetGames: async (req: Request, res: Response) => {
        let { offset, count, query } = req.params;

        const finalOffset: number = offset ? Number(offset) : 0;
        const finalCount: number = count ? Number(count) : 100;
        const finalQuery: string | undefined = query;

        try {
            const gamesCount: number = await prisma.gameInfo.count({
                orderBy: { id: "asc" },
                where: {
                    name: {
                        contains: finalQuery,
                    },
                },
            });

            const games = await prisma.gameInfo.findMany({
                orderBy: { id: "asc" },
                skip: Number(finalOffset),
                take: Number(finalCount),
                where: {
                    name: {
                        mode: "insensitive",
                        contains: finalQuery,
                    },
                },
            });
            const responseDTO: GamesInfoDTO = {
                games: games,
                totalGames: gamesCount,
            };
            res.json(responseDTO);
        } catch (error) {
            res.status(500).json(CommandResult.failure("ERROR_GETTING_CONVERSATION"));
        }
    },
};
