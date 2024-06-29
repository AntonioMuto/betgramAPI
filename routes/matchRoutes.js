const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/retrieve/:id/statistics', matchController.getMatchStatistics);
router.get('/retrieve/:id/details', matchController.getMatchesDetails);
router.get('/retrieve/:id/lineups', matchController.getMatchLineups);
router.get('/:data', matchController.getMatchesByDay);

module.exports = router;
