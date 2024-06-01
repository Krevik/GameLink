import { Router } from "express";
import { UserController } from "./UserController";

const UserRouter = Router();

UserRouter.post("/", UserController.handleCreateUser);
UserRouter.get("/:id", UserController.handleGetUserById);
UserRouter.get("/", UserController.handleGetAllUsers);

export default UserRouter;
