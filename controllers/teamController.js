const teamService = require('../services/teamService');

exports.getTeamDetailsById = async (req, res, next) => {
    try {
        const teamId = req.params.id;
        const team = await teamService.getTeamById(teamId);
        res.json(team);
    } catch (error) {
        next(error);
    }
};


exports.getTeamTable = async (req, res, next) => {
    try {
        const teamTable = await teamService.getTeamTableById();
        res.json(teamTable);
    } catch (error) {
        next(error);
    }
};


exports.getTeamTransfers = async (req, res, next) => {
    try {
        const teamTransfers = await teamService.getTeamTransfersById();
        res.json(teamTransfers);
    } catch (error) {
        next(error);
    }
};

exports.getTeamSquad = async (req, res, next) => {
    try {
        const team = await teamService.getTeamSquadById();
        res.json(team);
    } catch (error) {
        next(error);
    }
};

exports.getAllFixturesById = async (req, res, next) => {
    try {
        const fixtures = await teamService.getAllFixturesById();
        res.json(fixtures);
    } catch (error) {
        next(error);
    }
};
