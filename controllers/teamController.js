const teamService = require('../services/teamService');

exports.getTeamById = async (req, res, next) => {
    try {
        const teamId = req.params.id;
        const team = await teamService.getTeamById(teamId);
        res.json(team);
    } catch (error) {
        next(error);
    }
};


exports.getTeams = async (req, res, next) => {
    try {
        const teams = await teamService.getTeams();
        res.json(teams);
    } catch (error) {
        next(error);
    }
};
