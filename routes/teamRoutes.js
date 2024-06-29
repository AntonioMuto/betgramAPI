const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/retrieve/:id', teamController.getTeamById);
router.get('/', teamController.getTeams);

module.exports = router;
