import { Request, Response } from "express";
import { CommandResult } from "../utils/CommandResult";
import { UserService } from "./UserService";

export const UserController = {
    handleCreateUser: async (req: Request, res: Response) => {
        const { email, password, username } = req.body;
        try {
            await UserService.createUser(email, password, username);
            res.status(201).json(CommandResult.success());
        } catch (error) {
            res.status(500).json(CommandResult.failure("Error creating user"));
        }
    },
    handleGetUserById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await UserService.getUserById(Number(id));
            if (user) {
                res.json(user);
            } else {
                res.status(404).json(CommandResult.failure("User not found"));
            }
        } catch (error) {
            res.status(500).json(CommandResult.failure("Error fetching user"));
        }
    },
    handleGetAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json(CommandResult.failure("Error fetching users"));
        }
    },
};
