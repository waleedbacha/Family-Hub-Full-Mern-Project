import { userModel } from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch current user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(400).send("User not found by this ID!");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserByIdAndUpdate = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    user
      ? res.status(200).json(user)
      : res.status(400).send("Cannot Update User by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserByIdAndDelete = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(400).send("Cannot delete User by this ID");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// export const postUser = async(req , res) => {
//    try {
//      const user = await userModel.create(req.body);
//     res.status(200).json(user);
//    } catch (err) {
//     res.status(400).json({error : err.message})
//    }

// }
