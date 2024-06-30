import {Router} from "express";
import {PlatformController} from "./PlatformController";

export const PlatformsRouter = Router();

PlatformsRouter.get("/:offset/:count", PlatformController.handleGetPlatforms);

