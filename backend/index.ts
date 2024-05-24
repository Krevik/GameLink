import { Express, Request, Response } from "express";
import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");
import { PrismaClient } from "@prisma/client";
import messageRoutes from "./src/routes/messageRoutes";
import conversationRoutes from "./src/routes/conversationRoutes";
import profileRoutes from "./src/routes/profileRoutes";
import gameRoutes from "./src/routes/gameRoutes";
import userRoutes from "./src/routes/userRoutes";
import authRoutes from "./src/routes/authRoutes";
import multer from "multer";
import path from "node:path";
import fs from "fs";

export const prisma = new PrismaClient();
const serverApp: Express = express();

serverApp.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
    }),
);
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: true }));

serverApp.use("/users", userRoutes);
serverApp.use("/games", gameRoutes);
serverApp.use("/profiles", profileRoutes);
serverApp.use("/conversations", conversationRoutes);
serverApp.use("/messages", messageRoutes);
serverApp.use("/auth", authRoutes);
serverApp.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

serverApp.post(`/profiles/uploadProfilePicture/:userId`, upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    //TODO remove old on success
    const filePath: string = `/uploads/profilePictures/${req.file.filename}`;
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).send("No userId given.");
    }
    try {
        await prisma.profile.update({
            where: { id: Number(userId) },
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
        res.status(500).send("Error uploading file");
    }
});

const PORT = process.env.PORT || 8124;
serverApp.listen(PORT, async () => {
    console.log(`Server is setting up on PORT ${PORT}`);
    // await dbUtils.testDBConnection();
    console.log(`Initial setup finished`);
});
