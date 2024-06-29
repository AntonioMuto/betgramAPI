const getDb = require('../config/database').getDb;

const getCoachById = async (coachId) => {
    try {
        const db = await getDb();
        var query = { id: parseInt(coachId) };
        const queryCursor = db.collection("coaches").find(query);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `Coach ID '${coachId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getCoaches = async () => {
    try {
        const db = await getDb();
        const queryCursor = db.collection("coaches").find();
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: ` Coaches not founds`
            };
        }
        return queryResult;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getCoachById,
    getCoaches
};