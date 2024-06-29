const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachController');

router.get('/retrieve/:id', coachController.getCoachById);
router.get('/', coachController.getCoaches);

module.exports = router;