const coachService = require('../services/coachService');

exports.getCoachById = async (req, res, next) => {
    try {
        const coachId = req.params.id;
        const coach = await coachService.getCoachById(coachId);
        res.json(coach);
    } catch (error) {
        next(error);
    }
};

exports.getCoaches = async (req, res, next) => {
    try {
        const coaches = await coachService.getCoaches();
        res.json(coaches);
    } catch (error) {
        next(error);
    }
};
