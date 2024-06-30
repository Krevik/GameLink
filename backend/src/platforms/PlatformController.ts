import {Request, Response} from "express";
import {prisma} from "../../index";
import {CommandResult} from "../utils/CommandResult";

export const PlatformController = {
    handleGetPlatforms: async (req: Request, res: Response) => {
        let { offset, count } = req.params;

        const finalOffset: number = offset ? Number(offset) : 0;
        const finalCount: number = count ? Number(count) : 100;

        try {
            const platforms = await prisma.platform.findMany({
                orderBy: { id: "asc" },
                skip: Number(finalOffset),
                take: Number(finalCount),
            });
            res.json(platforms);
        } catch (error) {
            res.status(500).json(CommandResult.failure("ERROR_GETTING_PLATFORMS"));
        }
    }
}