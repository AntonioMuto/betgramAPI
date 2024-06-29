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

exports.getLeagues = async (req, res, next) => {
    try {
        const leagues = await leagueService.getLeagues();
        res.json(leagues);
    } catch (error) {
        next(error);
    }
};
