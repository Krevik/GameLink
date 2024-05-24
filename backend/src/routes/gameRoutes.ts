import { Router } from "express";
import { handleCreateGame, handleGetGameById, handleGetAllGames } from "../controllers/gameController";

const router = Router();

router.post("/", handleCreateGame);
router.get("/:id", handleGetGameById);
router.get("/", handleGetAllGames);

export default router;
