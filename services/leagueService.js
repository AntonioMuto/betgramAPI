const getDb = require('../config/database').getDb;

const getLeagueById = async (leagueId) => {
    try {
        const db = await getDb();
        var query = { id: parseInt(leagueId) };
        const queryCursor = db.collection("leagues").find(query);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `League ID '${leagueId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getLeagues = async () => {
    try {
        const db = await getDb();
        const queryCursor = db.collection("leagues").find();
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: ` Leagues not founds`
            };
        }
        return queryResult;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getLeagueById,
    getLeagues
};