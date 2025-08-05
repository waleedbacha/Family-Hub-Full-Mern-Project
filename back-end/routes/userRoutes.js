import express from "express";
import {
  getAllUsers,
  getCurrentUser,
  getUserById,
  getUserByIdAndDelete,
  getUserByIdAndUpdate,
} from "../controllers/userController.js";
import {
  authorize,
  userAuthenticator,
} from "../middlewares/authenticators/authenticator.js";

const userRoutes = express.Router();

userRoutes
  .get("/me", userAuthenticator, getCurrentUser)
  .get("/", userAuthenticator, authorize("read:users"), getAllUsers)
  .get("/:id", userAuthenticator, authorize("read:users"), getUserById)
  .put(
    "/:id",
    userAuthenticator,
    authorize("update:users"),
    getUserByIdAndUpdate
  )
  .delete(
    "/:id",
    userAuthenticator,
    authorize("delete:users"),
    getUserByIdAndDelete
  );

export default userRoutes;
