import { famliyHistoryModel } from "../models/familyHistoryModel.js";
import mongoose from "mongoose";
export const getHistory = async (req, res) => {
  try {
    const History = await famliyHistoryModel
      .find()
      .populate("parent", "name  address");
    res.status(200).json(History);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getHistoryById = async (req, res) => {
  try {
    const History = await famliyHistoryModel
      .findById(req.params.id)
      .populate("parent", "name  address");
    History
      ? res.status(200).json(History)
      : res.status(400).send("userHistory not found by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getHistoryByIdAndUpdate = async (req, res) => {
  try {
    const History = await famliyHistoryModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    History
      ? res.status(200).json(History)
      : res.status(400).send("Failed to update userHistory by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getHistoryByIdAndDelete = async (req, res) => {
  try {
    const History = await famliyHistoryModel.findByIdAndDelete(req.params.id);
    History
      ? res.status(200).json(History)
      : res.status(400).send("Failed to Delete userHistory by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const postHistory = async (req, res) => {
  try {
    const historyData = {
      ...req.body,
      parent:
        req.body.parent && mongoose.isValidObjectId(req.body.parent)
          ? req.body.parent
          : req.user?._id || null,
    };

    const History = await famliyHistoryModel.create(historyData);
    res.status(200).json(History);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
