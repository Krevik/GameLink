import { Router } from "express";
import { register, login } from "../controllers/authController";
import passport from "passport";
import { body } from "express-validator";

export const authRoutes = Router();

authRoutes.post(
    "/register",
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("username").not().isEmpty().withMessage("Username is required"),
    register,
);

authRoutes.post("/login", body("email").isEmail().withMessage("Email must be valid"), body("password").not().isEmpty().withMessage("Password is required"), login);

authRoutes.get("/steam", passport.authenticate("steam"));
authRoutes.get("/steam/return", passport.authenticate("steam", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/");
});
