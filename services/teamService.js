const getDb = require('../config/database').getDb;

const getTeamById = async (teamId) => {
    try {
        const db = await getDb();
        var query = { id: parseInt(teamId) };
        const queryCursor = db.collection("teams").find(query);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `Team ID '${teamId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getTeams = async () => {
    try {
        const db = await getDb();
        const queryCursor = db.collection("teams").find();
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: ` Teams not founds`
            };
        }
        return queryResult;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getTeamById,
    getTeams
};