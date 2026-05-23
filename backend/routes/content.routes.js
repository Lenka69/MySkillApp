const express = require('express');
const router = express.Router();
const contentController = require('../controllers/content.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, contentController.getAllContents);
router.get('/:id', auth, contentController.getContentById);

module.exports = router;