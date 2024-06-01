import { Router } from "express";
import passport from "passport";
import { body } from "express-validator";
import { AuthController } from "./authController";

export const authRouter = Router();

authRouter.post(
    "/register",
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("username").not().isEmpty().withMessage("Username is required"),
    AuthController.register,
);

authRouter.post("/login", body("email").isEmail().withMessage("Email must be valid"), body("password").not().isEmpty().withMessage("Password is required"), AuthController.login);

authRouter.get("/steam", passport.authenticate("steam"));
authRouter.get("/steam/return", passport.authenticate("steam", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/");
});
