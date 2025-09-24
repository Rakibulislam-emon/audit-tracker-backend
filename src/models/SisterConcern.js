// src/models/SisterConcern.js
 import mongoose from 'mongoose';
const SisterConcernSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sister Concern name is required'],
    trim: true,
    maxlength: 100
  },
  groupCompany: {
    type: mongoose.Schema.ObjectId,
    ref: 'GroupCompany',
    required: [true, 'Sister Concern must belong to a Group Company']
  },
  description: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true // adds createdAt, updatedAt
});

// Index for faster queries by groupCompany
SisterConcernSchema.index({ groupCompany: 1 });

export default mongoose.model.SisterConcern || mongoose.model('SisterConcern', SisterConcernSchema);