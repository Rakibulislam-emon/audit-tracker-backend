import dotenv from "dotenv";
dotenv.config();

import express from "express";
import config from "./config/config.js";
import connectDB from "./config/db.js";
// import routes
import  userRoutes from "./routes/userRoutes.js"

const port = config.port;
const app = express();
// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();
// Routes
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Audit Tracker API is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
