const mongoose = require('mongoose');
const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  tools: [{ type: String }],
  materials: [{ type: String }],
  steps: [{ type: String }],
  safetyTips: [{ type: String }],
  difficulty: { type: String },
  duration: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Content', ContentSchema);