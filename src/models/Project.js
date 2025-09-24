import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: 100
  },
  sisterConcern: {
    type: mongoose.Schema.ObjectId,
    ref: 'SisterConcern',
    required: [true, 'Project must belong to a Sister Concern']
  },
  description: {
    type: String,
    maxlength: 500
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'completed', 'on_hold'],
    default: 'planning'
  }
}, {
  timestamps: true // adds createdAt, updatedAt
});

// Index for faster queries by sisterConcern
ProjectSchema.index({ sisterConcern: 1 });

export default mongoose.model.Project || mongoose.model('Project', ProjectSchema);

