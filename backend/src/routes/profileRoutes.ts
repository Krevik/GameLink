import { Router } from "express";
import { handleCreateProfile, handleGetProfileByUserId, updateProfileByUserId } from "../controllers/profileController";
import { upload } from "../../index";

const router = Router();

router.post("/", handleCreateProfile);
router.get("/:userId", handleGetProfileByUserId);
router.post("/:userId", updateProfileByUserId);

export default router;
