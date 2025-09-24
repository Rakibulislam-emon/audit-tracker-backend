import mongoose from 'mongoose';
const AuditProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Audit Program name is required'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  auditType: {
    type: mongoose.Schema.ObjectId,
    ref: 'AuditType',
    required: [true, 'Audit Program must be linked to an Audit Type']
  }
}, {
  timestamps: true
});

// Index for faster queries by auditType
AuditProgramSchema.index({ auditType: 1 });

export default mongoose.models.AuditProgram || mongoose.model('AuditProgram', AuditProgramSchema);