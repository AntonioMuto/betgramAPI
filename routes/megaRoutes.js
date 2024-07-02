const express = require('express');
const router = express.Router();
const megaController = require('../controllers/megaController');

router.get('/folders', megaController.getFolders);
router.get('/elements', megaController.getElements);
router.get('/download/:id', megaController.downloadElement);

module.exports = router;
