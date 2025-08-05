import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dbConnection } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import donationRoutes from "./routes/donattionRoutes.js";
import donAppliRoutes from "./routes/donAppliRoutes.js";
import userStoriesRoutes from "./routes/userStoriesRoutes.js";
import famliyHistoryRoutes from "./routes/familyHistoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
dbConnection();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

const accessLogStream = fs.createWriteStream(path.join("logs", "access.log"), {
  flags: "a",
});

const swaggerDoc = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/donation-application", donAppliRoutes);
app.use("/api/stories", userStoriesRoutes);
app.use("/api/family-history", famliyHistoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`Server started on PORT: ${Port}`);
});
