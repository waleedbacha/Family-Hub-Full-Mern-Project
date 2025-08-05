import express from "express";
import {
  getHistory,
  getHistoryById,
  getHistoryByIdAndDelete,
  getHistoryByIdAndUpdate,
  postHistory,
} from "../controllers/familyHistoryController.js";
import { authorize, userAuthenticator } from "../middlewares/authenticators/authenticator.js";

const famliyHistoryRoutes = express.Router();

famliyHistoryRoutes
  .post("/",userAuthenticator ,authorize("create:familyHistory") ,postHistory)
  .get("/",userAuthenticator ,authorize("read:familyHistory"), getHistory)
  .get("/:id", userAuthenticator ,authorize("read:familyHistory"),getHistoryById)
  .put("/:id", userAuthenticator ,authorize("update:familyHistory"),getHistoryByIdAndUpdate)
  .delete("/:id", userAuthenticator ,authorize("delete:familyHistory"),getHistoryByIdAndDelete);

export default famliyHistoryRoutes;