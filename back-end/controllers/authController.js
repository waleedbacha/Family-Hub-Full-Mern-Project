import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../models/userModel.js";

dotenv.config();

const JWT_TOKEN = process.env.JWT_TOKEN;

const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_TOKEN, {
    expiresIn: "7d",
  });
  console.log(token);
  return token;
};

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      address,
      phone_number,
      image,
      role,
      permissions: bodyPermissions,
    } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ message: "User with this email address already exists" });
    }

    const permissions =
      role === "admin"
        ? ["*"]
        : bodyPermissions?.length > 0
        ? bodyPermissions
        : [
            "read:users",
            "read:familyHistory",
            "read:marketplace",
            "read:stories",
            "read:scholarships",
            "read:donations",
            "create:donations",
            "create:scholarships",
          ];

    const user = await userModel.create({
      name,
      email,
      address,
      phone_number,
      image,
      password,
      age,
      role,
      permissions,
    });
    res.cookie("token", generateToken(user), {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone_number: user.phone_number,
        role: user.role,
        permissions: user.permissions,
      },
      // token: generateToken(user),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.cookie("token", generateToken(user), {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 60 * 60 * 1000,
      });
      res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: "Login Successfully",
        // token: generateToken(user),
      });
    } else {
      res.status(400).json({ error: "Invalid email or passaword" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: "false",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
