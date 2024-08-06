const getDb = require('../config/database').getDb;
const axios = require('axios');
const API_URL = process.env.API_URL;
const INFO = process.env.INFO;

const getPlayerById = async (playerId) => {
    try {
        const response = await axios.get(`${API_URL}/playerData?id=${playerId}&${INFO}`);
        let res = {
            birthDate: response.data.birthDate,
            isCaptain: response.data.isCaptain,
            name: response.data.name,
            playerInformation: response.data.playerInformation,
            positionDescription: response.data.positionDescription,
            primaryTeam: response.data.primaryTeam,
            trophies: response.data.trophies,
            mainLeague: response.data.mainLeague
        }
        return res;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getPlayerById,
};