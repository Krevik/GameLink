import { Router } from "express";
import { handleCreateUser, handleGetUserById, handleGetAllUsers } from "../controllers/userController";

const router = Router();

router.post("/", handleCreateUser);
router.get("/:id", handleGetUserById);
router.get("/", handleGetAllUsers);

export default router;
