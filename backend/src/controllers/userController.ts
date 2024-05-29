import { Request, Response } from "express";
import { createUser, getUserById, getAllUsers } from "../services/userService";
import { CommandResult } from "../utils/CommandResult";

export const handleCreateUser = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    try {
        await createUser(email, password, username);
        res.status(201).json(CommandResult.success());
    } catch (error) {
        console.log(error);
        res.status(500).json(CommandResult.failure("Error creating user"));
    }
};

export const handleGetUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await getUserById(Number(id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json(CommandResult.failure("User not found"));
        }
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error fetching user"));
    }
};

export const handleGetAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json(CommandResult.failure("Error fetching users"));
    }
};
