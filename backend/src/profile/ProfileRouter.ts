import { Router } from "express";
import { ProfileController } from "./ProfileController";

const ProfileRouter = Router();

ProfileRouter.post("/", ProfileController.handleCreateProfile);
ProfileRouter.get("/:userId", ProfileController.handleGetProfileByUserId);
ProfileRouter.post("/:userId", ProfileController.updateProfileByUserId);

export default ProfileRouter;
