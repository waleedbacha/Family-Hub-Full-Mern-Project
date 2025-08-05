import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/logout", logoutUser);

export default authRoutes;
