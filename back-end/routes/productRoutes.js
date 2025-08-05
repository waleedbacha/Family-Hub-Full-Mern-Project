import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductByIdAndDelete,
  getProductByIdAndUpdate,
  postProduct,
} from "../controllers/productController.js";
import {
  authorize,
  userAuthenticator,
} from "../middlewares/authenticators/authenticator.js";
import { handleImageUpload, upload } from "./imageUpload.js";

const productRoutes = express.Router();

productRoutes
  .post(
    "/",
    userAuthenticator,
    authorize("create:marketplace"),
    upload.single("image"), 
    handleImageUpload,
    postProduct
  )
  .get("/", userAuthenticator, authorize("read:marketplace"), getAllProducts)
  .get("/:id", userAuthenticator, authorize("read:marketplace"), getProductById)
  .put(
    "/:id",
    userAuthenticator,
    authorize("update:marketplace"),
    getProductByIdAndUpdate
  )
  .delete(
    "/:id",
    userAuthenticator,
    authorize("delete:marketplace"),
    getProductByIdAndDelete
  );

export default productRoutes;
