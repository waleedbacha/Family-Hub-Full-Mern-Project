import mongoose from "mongoose";

const familyHistorySchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required "] },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: Number, required: [true, "dateOfBirth is required"] },
  dateOfDeath: { type: Number },
  relation: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  status: { type: String, enum: ["alive", "death"], required: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

export const famliyHistoryModel = mongoose.model(
  "History",
  familyHistorySchema
);
