const matchService = require('../services/matchService');

exports.getMatchInfo = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const matches = await matchService.getMatchInfo(matchId);
        res.json(matches);
    } catch (error) {
        next(error);
    }
};

exports.getMatchH2h = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const matches = await matchService.getMatchH2h(matchId);
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

exports.getMatchStats = async (req, res, next) => {
    try {
        const matchId = req.params.id;
        const matches = await matchService.getMatchStats(matchId);
        res.json(matches);
    } catch (error) {
        next(error);
    }
};

exports.getMatchToday = async (req, res, next) => {
    try {
        const matches = await matchService.getMatchToday();
        res.json(matches);
    } catch (error) {
        next(error);
    }
};

exports.getMatchByDate = async (req, res, next) => {
    try {
        const date = req.params.date;
        const matches = await matchService.getMatchByDate(date);
        res.json(matches);
    } catch (error) {
        next(error);
    }
};

exports.getLiveMatch = async (req, res, next) => {
    try {
        const match = req.params.id;
        const matches = await matchService.getLiveMatch(match);
        res.json(matches);
    } catch (error) {
        next(error);
    }
};

