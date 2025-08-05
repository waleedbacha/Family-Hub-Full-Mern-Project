import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../../models/userModel.js";

dotenv.config();

export const userAuthenticator = async (req, res, next) => {
  // const token = req.headers.authorization;
  const token = req.cookies.token;
  if (!token) {
    res.status(400).json({ error: "Unauthorized - No token provided" });
  } else {
    try {
      const decodedUser = jwt.verify(token, process.env.JWT_TOKEN);
      console.log(decodedUser);
      req.user = await userModel.findById(decodedUser.id).select("-password");
      next();
    } catch (err) {
      console.log("Unauthorized - Invalid auth token");
      res.status(400).json({ error: err.message });
    }
  }
};

export const authorize = (requestedPermission) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    if (user.role === "admin" || user.permissions?.includes("*")) {
      return next();
    }

    if (
      user.role === "user" &&
      user.permissions?.includes(requestedPermission)
    ) {
      return next();
    }
    return res.status(403).json({ error: "Unauthorized - Access forbidden" });
  };
};
