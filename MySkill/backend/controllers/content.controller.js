const Content = require('../models/Content');

exports.getAllContents = async (req, res) => {
  try {
    const contents = await Content.find();
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Konten tidak ditemukan' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};