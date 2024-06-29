const matchService = require('../services/matchService');

exports.getMatchStatistics = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const matches = await matchService.getMatchDetails(matchId);
        res.json(matches);
    } catch (error) {
        next(error);
    }
};

exports.getMatchesDetails = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const matches = await matchService.getMatchDetails(matchId);
        res.json(matches);
    } catch (error) {
        next(error);
    }
};

exports.getMatchLineups = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const matches = await matchService.getMatchLineups(matchId);
        res.json(matches);
    } catch (error) {
        next(error);
    }
};

exports.getMatch = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const match = await matchService.getMatch(matchId);
        res.json(match);
    } catch (error) {
        next(error);
    }
};

exports.getMatchesByDay = async (req, res, next) => {
    try {
        const date = req.params.data;
        const matches = await matchService.getMatchesByDay(date);
        res.json(matches);
    } catch (error) {
        next(error);
    }
};
