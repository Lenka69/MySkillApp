// backend/controllers/content.controller.js

const Content = require('../models/Content');

exports.getAllContents = async (req, res) => {
  try {
    const { search = '', category = '' } = req.query;

    const query = {};

    if (search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'Semua') {
      query.category = category;
    }

    const contents = await Content.find(query).sort({ createdAt: -1 });

    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({
      message: 'Gagal mengambil data konten',
      error: error.message
    });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        message: 'Konten tidak ditemukan'
      });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(400).json({
      message: 'ID konten tidak valid',
      error: error.message
    });
  }
};