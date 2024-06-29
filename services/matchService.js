const getDb = require('../config/database').getDb;

const getMatchStatistics = async (matchId) => {
    try {
        const db = await getDb();
        const query = [
            { $match: { id: parseInt(matchId) } },
            { $unwind: { path: '$statistics' } },
            {
                $group: {
                    _id: '$statistics.type_id',
                    stats: { $push: '$statistics' }
                }
            },
            {
                $project: {
                    stats: { participant_id: 1, data: 1 }
                }
            }
        ]
        const queryCursor = await db.collection("matches").aggregate(query);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `Match ID '${matchId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getMatchDetails = async (matchId) => {
    try {
        const db = await getDb();
        const query = [
            { $match: { id: parseInt(matchId) } },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    league_id: 1,
                    season_id: 1,
                    starting_at: 1,
                    scores: {
                        type_id: 1,
                        score: 1,
                        description: 1,
                        participant_id: 1
                    },
                    'state.developer_name': 1,
                    'round.name': 1,
                    venue: 1,
                    events: {
                        id: 1,
                        participant_id: 1,
                        type_id: 1,
                        player_id: 1,
                        player_name: 1,
                        related_player_id: 1,
                        related_player_name: 1,
                        result: 1,
                        info: 1,
                        addition: 1,
                        minute: 1,
                        extra_minute: 1,
                        injured: 1,
                        on_bench: 1
                    }
                }
            }
        ]
        const queryCursor = await db.collection("matches").aggregate(query);
        const queryResult = await queryCursor.toArray();

        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `Match ID '${matchId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getMatchLineups = async (matchId) => {
    try {
        const db = await getDb();
        var query = [
            { $match: { id: parseInt(matchId) } },
            { $unwind: { path: '$lineups' } },
            {
                $group: {
                    _id: '$lineups.team_id',
                    lineup: {
                        $push: {
                            $cond: [
                                {
                                    $ne: [
                                        '$lineups.formation_field',
                                        null
                                    ]
                                },
                                '$lineups',
                                null
                            ]
                        }
                    },
                    bench: {
                        $push: {
                            $cond: [
                                {
                                    $eq: [
                                        '$lineups.formation_field',
                                        null
                                    ]
                                },
                                '$lineups',
                                null
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    lineup: {
                        position_id: 1,
                        formation_field: 1,
                        type_id: 1,
                        formation_position: 1,
                        player_name: 1,
                        jersey_number: 1,
                        'player.common_name': 1,
                        'player.image_path': 1
                    },
                    bench: {
                        position_id: 1,
                        type_id: 1,
                        player_name: 1,
                        jersey_number: 1,
                        'player.common_name': 1,
                        'player.image_path': 1
                    }
                }
            }
        ]
        const queryCursor = await db.collection("matches").aggregate(query);
        const queryResult = await queryCursor.toArray();

        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `Match ID '${matchId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getMatch = async (matchId) => {
    try {
        const db = await getDb();
        const query = { id: parseInt(matchId) };
        const queryCursor = await db.collection("matches").find(query);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `Match ID '${matchId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const getMatchesByDay = async (date) => {
    try {
        const db = await getDb();
        const query = [
            {
                $match: {
                    starting_at: { $regex: `^${date}` }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    league_id: 1,
                    starting_at: 1,
                    participants: {
                        id: 1,
                        name: 1,
                        image_path: 1,
                        meta: 1
                    },
                    scores: {
                        $map: {
                            input: {
                                $filter: {
                                    input: '$scores',
                                    as: 'score',
                                    cond: {
                                        $eq: ['$$score.type_id', 1525]
                                    }
                                }
                            },
                            as: 'score',
                            in: {
                                type_id: '$$score.type_id',
                                participant_id:
                                    '$$score.participant_id',
                                score: '$$score.score'
                            }
                        }
                    },
                    'state.developer_name': 1
                }
            },
            {
                $group: {
                    _id: '$league_id',
                    matches: { $push: '$$ROOT' }
                }
            }
        ];
        const queryCursor = await db.collection("matches").aggregate(query);
        const queryResult = await queryCursor.toArray();

        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `anyone match in data '${date}'`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};

const generateMatchesForDate = (date) => {
    return [
        { date, teamA: 'Team 1', teamB: 'Team 2', scoreA: 0, scoreB: 0 },
        { date, teamA: 'Team 3', teamB: 'Team 4', scoreA: 0, scoreB: 0 },
    ];
};

module.exports = {
    getMatchStatistics,
    getMatchDetails,
    getMatchesByDay,
    getMatchLineups,
    getMatch
};
