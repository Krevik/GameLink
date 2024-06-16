import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { CommandResult } from "../utils/CommandResult";
import { prisma } from "../../index";

export const AuthController = {
    register: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, username } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    username,
                },
            });
            res.status(201).json(CommandResult.success());
        } catch (error) {
            console.log(error);
            res.status(500).json(CommandResult.failure("Error registering user"));
        }
    },

    login: async (req: Request, res: Response) => {
        const errors = validationResult(req);
        console.log(errors);

        if (!errors.isEmpty()) {
            return res.status(400).json(
                CommandResult.failure(
                    errors
                        .array()
                        .map((error) => error.msg)
                        .join("\n"),
                ),
            );
        }

        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json(CommandResult.failure("Invalid credentials"));
        }

        const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });
        res.json({ accessToken, userId: user.id });
    },
};
