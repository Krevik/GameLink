import { Request, Response } from "express";
import { CommandResult } from "../utils/CommandResult";
import { prisma } from "../../index";
import { ProfileService } from "./ProfileService";

export const ProfileController = {
    handleCreateProfile: async (req: Request, res: Response) => {
        const { userId, bio, avatarUrl, platform, availability } = req.body;
        try {
            await ProfileService.createProfile(userId, bio, avatarUrl, platform, availability);
            res.status(201).json(CommandResult.success());
        } catch (error) {
            res.status(500).json(CommandResult.failure("Error creating profile"));
        }
    },

    handleGetProfileByUserId: async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const profile = await ProfileService.getProfileByUserId(Number(userId));
            if (profile) {
                res.json(profile);
            } else {
                res.status(404).json(CommandResult.failure("Profile not found"));
            }
        } catch (error) {
            res.status(500).json(CommandResult.failure("Error fetching profile"));
        }
    },

    updateProfileByUserId: async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const profile = await ProfileService.getProfileByUserId(Number(userId));
            if (!profile) {
                await prisma.profile.create({ data: { userId: userId, ...req.body } });
            } else {
                await prisma.profile.update({ where: { userId: Number(userId) }, data: { ...req.body } });
            }
            res.json(CommandResult.success());
        } catch (error) {
            console.log(error);
            res.status(500).json(CommandResult.failure("Error updating profile"));
        }
    },
};
