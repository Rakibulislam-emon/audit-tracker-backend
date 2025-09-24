import dotenv from "dotenv";
dotenv.config();

import express from "express";
import config from "./config/config.js";
import connectDB from "./config/db.js";
// import routes
import  userRoutes from "./routes/userRoutes.js"
import groupCompanyRoutes from "./routes/groupCompanyRoutes.js"
import sisterConcernRoutes from './routes/sisterConcernRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import auditTypeRoutes from './routes/auditTypeRoutes.js';
import auditProgramRoutes from './routes/auditProgramRoutes.js';
import auditPlanRoutes from "./routes/auditPlanRoutes.js"
import auditInstanceRoutes from './routes/auditInstanceRoutes.js';
import auditFindingRoutes from './routes/auditFindingRoutes.js';


const port = config.port;
const app = express();
// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();
// Routes
app.use("/api/users", userRoutes);
app.use("/api/group-companies",groupCompanyRoutes)
app.use('/api/sister-concerns', sisterConcernRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/audit-types', auditTypeRoutes);
app.use('/api/audit-programs', auditProgramRoutes);
app.use("/api/audit-plans", auditPlanRoutes);
app.use('/api/audit-instances', auditInstanceRoutes);
app.use('/api/audit-findings', auditFindingRoutes);













app.get("/", (req, res) => {
  res.send("Audit Tracker API is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
