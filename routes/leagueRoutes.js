const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagueController');

router.get('/retrieve/:id', leagueController.getLeagueById);
router.get('/', leagueController.getLeagues);

module.exports = router;
