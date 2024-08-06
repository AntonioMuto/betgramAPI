const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/retrieve/today', matchController.getMatchToday);
router.get('/retrieveByDate/:date', matchController.getMatchByDate);

router.get('/retrieve/:id/info', matchController.getMatchInfo);
router.get('/retrieve/:id/h2h', matchController.getMatchH2h);
router.get('/retrieve/:id/lineups', matchController.getMatchLineups);
router.get('/retrieve/:id/stats', matchController.getMatchStats);

module.exports = router;
