import { productModel } from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const product = await productModel.find().populate("addedBy", "name email");
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate("addedBy", "name email");
    product
      ? res.status(200).json(product)
      : res.status(400).send("Cannot found Product by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProductByIdAndUpdate = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    product
      ? res.status(200).json(product)
      : res.status(400).send("Cannot Update Product by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProductByIdAndDelete = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    product
      ? res.status(200).json(product)
      : res.status(400).send("Cannot Delete Product by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const postProduct = async (req, res) => {
  try {
    const productData = req.body;
    // productData.imageUrl = req.imageUrl;
    const product = await productModel.create(productData);
    // console.log("seeing if req.imageUrl exists", req.imageUrl);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
