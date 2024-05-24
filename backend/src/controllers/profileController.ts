import { Request, Response } from "express";
import { createProfile, getProfileByUserId } from "../services/profileService";
import { CommandResult } from "../utils/CommandResult";
import { prisma } from "../../index";
import multer from "multer";
import path from "node:path";
import * as fs from "fs";

export const handleCreateProfile = async (req: Request, res: Response) => {
    const { userId, bio, avatarUrl, platform, gameStyle, availability } = req.body;
    try {
        await createProfile(userId, bio, avatarUrl, platform, gameStyle, availability);
        res.status(201).json(CommandResult.success());
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error creating profile"));
    }
};

export const handleGetProfileByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const profile = await getProfileByUserId(Number(userId));
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json(CommandResult.failure("Profile not found"));
        }
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error fetching profile"));
    }
};

export const updateProfileByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const profile = await getProfileByUserId(Number(userId));
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
};
