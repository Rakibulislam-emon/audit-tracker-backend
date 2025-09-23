import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import config from "./config/config.js";

const app = express();
const port = config.port;

app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Audit Tracker API is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
