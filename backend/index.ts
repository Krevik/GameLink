import { Express, Request, Response } from "express";
import express = require("express");
import bodyParser = require("body-parser");
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "node:path";
import fs from "fs";
import { CommandResult } from "./src/utils/CommandResult";
import userRouter from "./src/user/UserRouter";
import profileRouter from "./src/profile/ProfileRouter";
import messageRouter from "./src/message/MessageRouter";
import { authRouter } from "./src/auth/authRouter";
import { ConversationRouter } from "./src/conversation/ConversationRouter";
import { FriendsRouter } from "./src/friends/FriendsRouter";
import { IgdbApi } from "./src/games/IgdbApi";
import { GamesRouter } from "./src/games/GamesRouter";
import { MessagingServer } from "./src/message/MessagingServer";
const cors = require("cors");

export const prisma = new PrismaClient();
const serverApp: Express = express();

serverApp.use(cors());
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: true }));

serverApp.use("/users", userRouter);
serverApp.use("/games", GamesRouter);
serverApp.use("/profiles", profileRouter);
serverApp.use("/conversations", ConversationRouter);
serverApp.use("/messages", messageRouter);
serverApp.use("/auth", authRouter);
serverApp.use("/uploads", express.static(path.join(__dirname, "uploads")));
serverApp.use("/friends", FriendsRouter);

//TODO move somehwere else
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, "uploads/profilePictures");
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

//TODO move to controller, cut out special chars from filename
serverApp.post(`/profiles/uploadProfilePicture/:userId`, upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send(CommandResult.failure("NO_FILE_UPLOADED"));
    }

    const filePath: string = `/uploads/profilePictures/${req.file.filename}`;
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).send(CommandResult.failure("NO_USER_ID_GIVEN"));
    }
    try {
        await prisma.profile.update({
            where: { userId: Number(userId) },
            data: { avatarUrl: filePath },
        });

        const oldProfile = await prisma.profile.findUnique({
            where: { id: Number(userId) },
        });
        if (oldProfile?.avatarUrl) {
            const oldFilePath = path.join(__dirname, `uploads${oldProfile.avatarUrl}`);
            fs.unlink(oldFilePath, (err) => {
                if (err) {
                    console.error("Error deleting old file:", err);
                }
            });
        }

        res.json({ imageUrl: filePath });
    } catch (error) {
        console.error("Error saving file path to database:", error);
        res.status(500).send(CommandResult.failure("ERROR_UPLOADING_FILE"));
    }
});

//TODO make script for database cleaning and seeding with use of databaseSeeder
//DatabaseSeeder.seedDatabase();

const PORT = process.env.PORT || 8124;
const gamesInfoFetchingInterval: number = 1000 * 60 * 60 * 24 * 7; // 7 days - once in a week
serverApp.listen(PORT, async () => {
    console.log(`Server is setting up on PORT ${PORT}`);
    // await dbUtils.testDBConnection();
    console.log(`Initial setup finished`);
    setInterval(async () => {
        IgdbApi.updateGameInfos();
    }, gamesInfoFetchingInterval);
    if ((await prisma.gameInfo.count()) < 10) {
        IgdbApi.updateGameInfos();
    }
    MessagingServer.setupServer();
});
