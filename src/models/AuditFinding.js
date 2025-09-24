// src/models/AuditFinding.js
import mongoose from 'mongoose';

const AuditFindingSchema = new mongoose.Schema({
  auditInstance: {
    type: mongoose.Schema.ObjectId,
    ref: 'AuditInstance',
    required: [true, 'Finding must be linked to an Audit Instance']
  },
  title: {
    type: String,
    required: [true, 'Finding title is required'],
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: [true, 'Finding description is required'],
    maxlength: 2000
  },
  riskRating: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open'
  },
  recommendation: {
    type: String,
    maxlength: 1000
  },
  // Optional: link to user who reported it (usually an auditor)
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

AuditFindingSchema.index({ auditInstance: 1 });
AuditFindingSchema.index({ riskRating: 1 });
AuditFindingSchema.index({ status: 1 });

export default mongoose.models.AuditFinding || mongoose.model('AuditFinding', AuditFindingSchema);