const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/retrieve/:id/details', teamController.getTeamDetailsById);
router.get('/retrieve/:id/table', teamController.getTeamTable);
router.get('/retrieve/:id/transfers', teamController.getTeamTransfers);
router.get('/retrieve/:id/team', teamController.getTeamSquad);
router.get('/retrieve/:id/fixtures', teamController.getAllFixturesById);

module.exports = router;
