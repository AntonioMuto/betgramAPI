const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/retrieve/:id/info', playerController.getPlayerById)


module.exports = router;