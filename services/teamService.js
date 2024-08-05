const getDb = require('../config/database').getDb;
const axios = require('axios');
const TeamUtils = require('../utils/TeamUtils');

const API_URL = process.env.API_URL;
const INFO = process.env.INFO;

const getTeamById = async (teamId) => {
    try {
        const response = await axios.get(`${API_URL}/teams?id=${teamId}&${INFO}`);
        let team = TeamUtils.remapTeams(response.data);
        return team;
    } catch (error) {
        throw new Error(error);
    }
};

const getTeamTableById = async (teamId) => {
    try {
        const response = await axios.get(`${API_URL}/teams?id=${teamId}&${INFO}`);
        return response.data.table;
    } catch (error) {
        throw new Error(error);
    }
};

const getTeamTransfersById = async (teamId) => {
    try {
        const response = await axios.get(`${API_URL}/teams?id=${teamId}&${INFO}`);
        return response.data.transfers;
    } catch (error) {
        throw new Error(error);
    }
};

const getTeamSquadById = async (teamId) => {
    try {
        const response = await axios.get(`${API_URL}/teams?id=${teamId}&${INFO}`);
        return response.data.squad;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllFixturesById = async (teamId) => {
    try {
        const response = await axios.get(`${API_URL}/teams?id=${teamId}&${INFO}`);
        return response.data.fixtures.allFixtures;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getTeamById,
    getTeamTableById,
    getTeamTransfersById,
    getTeamSquadById,
    getAllFixturesById
};