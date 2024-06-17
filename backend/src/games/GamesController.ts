import { Request, Response } from "express";
import { ConversationService } from "../conversation/ConversationService";
import { CommandResult } from "../utils/CommandResult";
import { prisma } from "../../index";

export const GamesController = {
    handleGetGames: async (req: Request, res: Response) => {
        let { offset, count } = req.params;

        const finalOffset: number = offset ? Number(offset) : 0;
        const finalCount: number = count ? Number(count) : 100;

        try {
            const games = await prisma.gameInfo.findMany({ orderBy: { id: "asc" }, skip: Number(finalOffset), take: Number(finalCount) });
            res.json(games);
        } catch (error) {
            res.status(500).json(CommandResult.failure("ERROR_GETTING_CONVERSATION"));
        }
    },
};
