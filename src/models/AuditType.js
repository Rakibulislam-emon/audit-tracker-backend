import mongoose from 'mongoose';
const AuditTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Audit Type name is required'],
    unique: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

export default mongoose.models.AuditType || mongoose.model('AuditType', AuditTypeSchema);