const getDb = require('../config/database').getDb;
const axios = require('axios');
const API_URL = process.env.API_URL;
const INFO = process.env.INFO;

const arrayLeagues = [55,86,47,53,54,87,57,61]

const getMatchInfo = async (matchId) => {
    try {
        const response = await axios.get(`${API_URL}/matchDetails?matchId=${matchId}&${INFO}`);
        let res = response.data.content.matchFacts;
        res.QAData = undefined;
        res.matchesInRound = undefined;
        res.topScorers = undefined;
        res.insights = undefined;
        res.topPlayers = undefined;
        res.poll = undefined;
        res.playerOfTheMatch = undefined;
        res.header = response.data.header;
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

const getMatchH2h = async (matchId) => {
    try {
        const response = await axios.get(`${API_URL}/matchDetails?matchId=${matchId}&${INFO}`);
        return response.data.content.h2h;
    } catch (error) {
        throw new Error(error);
    }
};

const getMatchLineups = async (matchId) => {
    try {
        const response = await axios.get(`${API_URL}/matchDetails?matchId=${matchId}&${INFO}`);
        return response.data.content.lineup2;
    } catch (error) {
        throw new Error(error);
    }
};

const getMatchStats = async (matchId) => {
    try {
        const response = await axios.get(`${API_URL}/matchDetails?matchId=${matchId}&${INFO}`);
        return response.data.content.stats;
    } catch (error) {
        throw new Error(error);
    }
};

const getMatchToday = async (matchId) => {
    try {
        const formattedDate = getFormattedDate();
        const response = await axios.get(`${API_URL}matches?date=${formattedDate}&timezone=Europe%2FRome&${INFO}`);
        return response.data.leagues.filter((match) => arrayLeagues.includes(match.id));
    } catch (error) {
        throw new Error(error);
    }
};


const getMatchByDate = async (date) => {
    try {
        const formattedDate = getFormattedDate();
        const response = await axios.get(`${API_URL}matches?date=${date}&timezone=Europe%2FRome&${INFO}`);
        return response.data.leagues.filter((match) => arrayLeagues.includes(match.id));
    } catch (error) {
        throw new Error(error);
    }
};

const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

const getLiveMatch = async (matchId) => {
    try {
        const response = await axios.get(`${API_URL}/matchDetails?matchId=${matchId}&${INFO}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getMatchH2h,
    getMatchLineups,
    getMatchInfo,
    getMatchStats,
    getMatchToday,
    getMatchByDate,
    getLiveMatch
};
