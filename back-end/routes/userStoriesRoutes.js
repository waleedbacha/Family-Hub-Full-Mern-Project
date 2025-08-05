import express from "express";
import {
  getStories,
  getStoriesById,
  getStoriesByIdAndDelete,
  getStoriesByIdAndUpdate,
  postStory,
} from "../controllers/userStoriesController.js";
import {
  authorize,
  userAuthenticator,
} from "../middlewares/authenticators/authenticator.js";
import { handleImageUpload, upload } from "./imageUpload.js";

const userStoriesRoutes = express.Router();

userStoriesRoutes
  .post(
    "/",
    userAuthenticator,
    authorize("create:stories"),
    upload.single("image"),
    handleImageUpload,
    postStory
  )
  .get("/", userAuthenticator, authorize("read:stories"), getStories)
  .get("/:id", userAuthenticator, authorize("read:stories"), getStoriesById)
  .put(
    "/:id",
    userAuthenticator,
    authorize("update:stories"),
    getStoriesByIdAndUpdate
  )
  .delete(
    "/:id",
    userAuthenticator,
    authorize("delete:stories"),
    getStoriesByIdAndDelete
  );

export default userStoriesRoutes;
