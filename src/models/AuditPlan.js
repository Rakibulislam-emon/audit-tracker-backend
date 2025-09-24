import mongoose from "mongoose";
const AuditPlanSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: [true, "Audit Plan must be linked to a Project"],
    },
    auditType: {
      type: mongoose.Schema.ObjectId,
      ref: "AuditType",
      required: [true, "Audit Plan must have an Audit Type"],
    },
    auditProgram: {
      type: mongoose.Schema.ObjectId,
      ref: "AuditProgram",
      required: [true, "Audit Plan must be linked to an Audit Program"],
    },
    plannedDate: {
      type: Date,
      required: [true, "Planned date is required"],
    },
    frequency: {
      type: String,
      enum: ["annual", "semi_annual", "quarterly", "monthly"],
      default: "annual",
    },
    status: {
      type: String,
      enum: ["planned", "scheduled", "in_progress", "completed", "cancelled"],
      default: "planned",
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

//  one plan per project + type + date
AuditPlanSchema.index(
  { project: 1, auditType: 1, plannedDate: 1 },
  { unique: true }
);

export default mongoose.models.AuditPlan ||
  mongoose.model("AuditPlan", AuditPlanSchema);
