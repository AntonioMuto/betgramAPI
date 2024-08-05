const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagueController');

router.get('/retrieve/:id/details', leagueController.getLeagueById);
router.get('/retrieve/:id/table', leagueController.getLeagueTableById);
router.get('/retrieve/:id/transfers', leagueController.getLeagueTransfersById);
router.get('/retrieve/:id/fixtures', leagueController.getLeagueFixturesById);

module.exports = router;
