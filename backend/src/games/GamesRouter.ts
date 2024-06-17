import { Router } from "express";
import { GamesController } from "./GamesController";

export const GamesRouter = Router();

GamesRouter.get("/:offset/:count/:query?", GamesController.handleGetGames);
