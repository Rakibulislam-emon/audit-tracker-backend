// src/models/AuditInstance.js
import mongoose from "mongoose";

const AuditInstanceSchema = new mongoose.Schema(
  {
    auditPlan: {
      type: mongoose.Schema.ObjectId,
      ref: "AuditPlan",
      required: [true, "Audit Instance must be linked to an Audit Plan"],
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: "Project",
      required: [true, "Audit Instance must be linked to a Project"],
    },
    assignedAuditors: {
      type: [mongoose.Schema.ObjectId],
      ref: "User",
      required: [true, "At least one auditor must be assigned"],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one auditor must be assigned",
      },
    },

    status: {
      type: String,
      enum: ["not_started", "in_progress", "on_hold", "completed", "cancelled"],
      default: "not_started",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
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

AuditInstanceSchema.index({ auditPlan: 1 });
AuditInstanceSchema.index({ project: 1 });
AuditInstanceSchema.index({ status: 1 });

export default mongoose.models.AuditInstance ||
  mongoose.model("AuditInstance", AuditInstanceSchema);
