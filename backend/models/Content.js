// backend/models/Content.js

const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String,
      default: ''
    },
    videoUrl: {
      type: String,
      default: ''
    },
    tools: [
      {
        type: String,
        trim: true
      }
    ],
    materials: [
      {
        type: String,
        trim: true
      }
    ],
    steps: [
      {
        type: String,
        trim: true
      }
    ],
    safetyTips: [
      {
        type: String,
        trim: true
      }
    ],
    difficulty: {
      type: String,
      default: 'Mudah'
    },
    duration: {
      type: String,
      default: '20 menit'
    },
    field: {
      type: String,
      default: 'Teknik SMK'
    },
    format: {
      type: String,
      default: 'Artikel + Video'
    },
    author: {
      type: String,
      default: 'Siswa SMK'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Content', ContentSchema);