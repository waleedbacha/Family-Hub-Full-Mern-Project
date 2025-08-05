import { userStoriesModel } from "../models/userStoriesModel.js";

export const getStories = async (req, res) => {
  try {
    const userStories = await userStoriesModel.find();
    res.status(200).json(userStories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getStoriesById = async (req, res) => {
  try {
    const userStories = await userStoriesModel.findById(req.params.id);
    userStories
      ? res.status(200).json(userStories)
      : res.status(400).send("userStory not found by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getStoriesByIdAndUpdate = async (req, res) => {
  try {
    const userStories = await userStoriesModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    userStories
      ? res.status(200).json(userStories)
      : res.status(400).send("Failed to update userStory by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getStoriesByIdAndDelete = async (req, res) => {
  try {
    const userStories = await userStoriesModel.findByIdAndDelete(req.params.id);
    userStories
      ? res.status(200).json(userStories)
      : res.status(400).send("Failed to Delete userStory by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const postStory = async (req, res) => {
  try {
    const storyData = req.body;
    // storyData.imageUrl = req.imageUrl;
    const userStories = await userStoriesModel.create(storyData);
    console.log("data here", storyData);
    // console.log("seeing if req.imageUrl exists", req.imageUrl);

    res.status(200).json(userStories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
