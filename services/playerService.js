const getDb = require('../config/database').getDb;

const getPlayerById = async (playerId) => {
    try {
        const db = await getDb();
        var query = { id: parseInt(playerId) };
        const queryCursor = db.collection("players").find(query);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `Player ID '${playerId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getPlayerByTeam = async (teamId) => {
    try {
        const db = await getDb();
        var query = { team_id: parseInt(teamId) };
        var sorting = { position_id: 1 };
        const queryCursor = db.collection("players").find(query).sort(sorting);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `Players not founds`
            };
        }
        return queryResult;
    } catch (error) {
        throw new Error(error);
    }
};

const getPlayers = async () => {
    try {
        const db = await getDb();
        const queryCursor = db.collection("players").find();
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: ` Players not founds`
            };
        }
        return queryResult;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getPlayerById,
    getPlayerByTeam,
    getPlayers
};