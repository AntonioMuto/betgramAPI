const getDb = require('../config/database').getDb;
const axios = require('axios');

const API_URL = process.env.API_URL;
const INFO = process.env.INFO;

const getLeagueById = async (leagueId) => {
    try {
        const response = await axios.get(`${API_URL}/leagues?id=${leagueId}&${INFO}`);
        let league = response.data.details;
        league.breadcrumbJSONLD = undefined;
        league.faqJSONLD = undefined;
        return league;
    } catch (error) {
        throw new Error(error);
    }
};

const getLeagueTableById = async (leagueId) => {
    try {
        const response = await axios.get(`${API_URL}/leagues?id=${leagueId}&${INFO}`);
        let league = response.data.table;
        return league;
    } catch (error) {
        throw new Error(error);
    }
};

const getLeagueTransfersById = async (leagueId) => {
    try {
        const response = await axios.get(`${API_URL}/leagues?id=${leagueId}&${INFO}`);
        let league = response.data.transfers;
        return league;
    } catch (error) {
        throw new Error(error);
    }
};

const getLeagueFixturesById = async (leagueId) => {
    try {
        const response = await axios.get(`${API_URL}/leagues?id=${leagueId}&${INFO}`);
        let league = response.data.matches.allMatches;
        return league;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getLeagueById,
    getLeagueTableById,
    getLeagueTransfersById,
    getLeagueFixturesById
};