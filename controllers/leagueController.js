const leagueService = require('../services/leagueService');

exports.getLeagueById = async (req, res, next) => {
    try {
        const leagueId = req.params.id;
        const league = await leagueService.getLeagueById(leagueId);
        res.json(league);
    } catch (error) {
        next(error);
    }
};

exports.getLeagueTableById = async (req, res, next) => {
    try {
        const leagueId = req.params.id;
        const leagues = await leagueService.getLeagueTableById(leagueId);
        res.json(leagues);
    } catch (error) {
        next(error);
    }
};

exports.getLeagueTransfersById = async (req, res, next) => {
    try {
        const leagueId = req.params.id;
        const leagues = await leagueService.getLeagueTransfersById(leagueId);
        res.json(leagues);
    } catch (error) {
        next(error);
    }
};

exports.getLeagueFixturesById = async (req, res, next) => {
    try {
        const leagueId = req.params.id;
        const leagues = await leagueService.getLeagueFixturesById(leagueId);
        res.json(leagues);
    } catch (error) {
        next(error);
    }
};