import mongoose from "mongoose";

const userStorySchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "description is required"] },
    scholarshipRewarded: { type: String },
    imageUrl: String,
  },
  { timestamps: true }
);

export const userStoriesModel = mongoose.model("Stories", userStorySchema);
