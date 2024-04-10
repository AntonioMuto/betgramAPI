const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const request = require('request');
const url = 'mongodb://localhost:27017';
const cron = require('node-cron');
const axios = require('axios');
var express = require('express');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
const TOKEN = process.env.TOKEN;
const client = new MongoClient(url);
app.listen(3000);
var dbName = null;

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connesso al server MongoDB');

        var db = client.db("betgram");
        dbName = db;

    } catch (err) {
        console.error('Errore durante la connessione a MongoDB:', err);
    }
}

connectToMongoDB();


app.get('/api/insert/match/:data', async function (req, res) {
    try {
        var result = await insetDocumentsByDay(req.params.data, dbName);
        result == true ? res.json({ "AGGIUNTI": true }) : res.json({ "AGGIUNTI": false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/insert/teams', async function (req, res) {
    try {
        var result = await searchTeamsInSeason(dbName);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/insert/players', async function (req, res) {
    try {
        var result = await insertPlayerInMongoDb(dbName)
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/insert/leagues', async function (req, res) {
    try {
        var result = await insertLeaguesInMongoDb(dbName)
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/leagues', async function (req, res) {
    try {
        const queryCursor = dbName.collection("leagues").find();
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/update/leagues', async function (req, res) {
    try {
        await dbName.collection("leagues").deleteMany();
        var result = await insertLeaguesInMongoDb(dbName)
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/insert/coaches', async function (req, res) {
    try {
        if (dbName !== undefined) {
            var result = await insertAllCoaches(dbName)
            res.json(result);
        } else {
            res.json("UNDEFINED");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/teams', async function (req, res) {
    try {
        const queryCursor = dbName.collection("teams").find();
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/team/:id', async function (req, res) {
    try {
        var query = { id: parseInt(req.params.id) };
        const queryCursor = dbName.collection("teams").find(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/teamsByLeague/:league', async function (req, res) {
    try {
        var query = { activeseasons: { $elemMatch: { "league_id": parseInt(req.params.league) } } };
        const queryCursor = dbName.collection("teams").find(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/trytry/:page', async function (req, res) {
    try {
        var query = [
            { $match: { season_id: 21730 } },
            {
                $group: {
                    _id: '$round_id',
                    matches: { $push: '$$ROOT' }
                }
            },
            { $sort: { "_id": 1 } }
        ];
        const queryCursor = dbName.collection("matches").aggregate(query);
        const queryResult = await queryCursor.toArray();
        const round = queryResult[req.params.page];
        res.status(200).json({ round });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/player/:id', async function (req, res) {
    try {
        var query = { id: parseInt(req.params.id) };
        const queryCursor = dbName.collection("players").find(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/players', async function (req, res) {
    try {
        const queryCursor = dbName.collection("players").find();
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/playersByTeam/:team', async function (req, res) {
    try {
        var query = { id: parseInt(req.params.team) };
        const queryCursor = dbName.collection("players").find(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/league/:id', async function (req, res) {
    try {
        var query = { id: parseInt(req.params.id) };
        const queryCursor = dbName.collection("leagues").find(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/coaches/:id', async function (req, res) {
    try {
        var query = { id: parseInt(req.params.id) };
        const queryCursor = dbName.collection("coaches").find(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/retrieve/match/:id', async function (req, res) {
    try {
        var query = { id: parseInt(req.params.id) };
        const queryCursor = dbName.collection("matches").find(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/retrieve/matchesByDate/:date', async function (req, res) {
    try {
        const query = { starting_at: { $regex: new RegExp(`^${req.params.date}`) } };
        const queryCursor = dbName.collection("matches").find(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/retrieve/matchesBySeason/:season/page/:pageNumber', async function (req, res) {
    try {
        var query = [
            { $match: { season_id: parseInt(req.params.season) } },
            {
                $group: {
                    _id: '$round_id',
                    matches: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    matches: {
                        $map: {
                            input: '$matches',
                            as: 'match',
                            in: {
                                id: '$$match.id',
                                starting_at: '$$match.starting_at',
                                participants:
                                    '$$match.participants',
                                scores: '$$match.scores',
                                state: '$$match.state'
                            }
                        }
                    }
                }
            },
            { $sort: { "_id": 1 } }
        ];
        const queryCursor = dbName.collection("matches").aggregate(query);
        const queryResult = await queryCursor.toArray();
        const round = queryResult[parseInt(req.params.pageNumber) - 1];
        res.status(200).json({ round });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/retrieve/matchesByTeam/:team', async function (req, res) {
    try {
        var query = [
            { $unwind: { path: '$participants' } },
            { $match: { 'participants.id': 625 } },
            {
                $group: {
                    _id: '$participants.id',
                    matches: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    matches: {
                        $map: {
                            input: '$matches',
                            as: 'match',
                            in: {
                                id: '$$match.id',
                                starting_at: '$$match.starting_at',
                                participants:
                                    '$$match.participants',
                                scores: '$$match.scores',
                                state: '$$match.state'
                            }
                        }
                    }
                }
            },
            { $unwind: { path: '$matches' } },
            { $sort: { 'matches.round_id': 1 } }
        ];
        const queryCursor = dbName.collection("matches").aggregate(query);
        const queryResult = await queryCursor.toArray();
        res.status(200).json({ queryResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function insertPlayerInMongoDb(db) {
    const arrayTeam = [
        1628,
        708,
        113,
        102,
        109,
        43,
        37,
        4070,
        613,
        7790,
        346,
        7743,
        597,
        2930,
        397,
        1123,
        625,
        585,
        377,
        3477,
        3468,
        103,
        485,
        2921,
        36,
        6827,
        8513,
        2714,
        676,
        83,
        2975,
        594,
        214,
        7980,
        618,
        106,
        13258,
        459,
        7214,
        830,
        3161,
        8164,
        58,
        988,
        605,
        6377,
        1085,
        4092,
        652,
        12152,
        645,
        1198,
        231,
        11741,
        960,
        364,
        78,
        11,
        8,
        19,
        29,
        115,
        51,
        21,
        14,
        236,
        52,
        20,
        63,
        13,
        9,
        1,
        18,
        15,
        6,
        27,
        44,
        690,
        598,
        1028,
        6789,
        1055,
        1658,
        581,
        884,
        271,
        59,
        3513,
        289,
        266,
        9257,
        6898,
        450,
        79,
        61,
        814,
        629,
        94,
        1652,
        919,
        1403,
        750,
        494,
        2396,
        664,
        1433,
        1053,
        1459,
        593,
        1016,
        682,
        73,
        1000,
        267,
        10759,
        1216,
        7471,
        10775,
        1006,
        1072,
        445,
        7055,
        176,
        686,
        591,
        8485,
        2892,
        268,
        10744,
        398,
        10722,
        522,
        1079,
        510,
        3321,
        3543,
        68,
        82,
        3320,
        277,
        90,
        683,
        3319,
        2831,
        999,
        2726,
        482,
        366,
        794,
        503,
        345,
        10729,
        28028,
        34,
        5447,
        17301,
        134619,
        781,
        1453,
        11452,
        2535,
        571,
        3859,
        5909
    ]

    const arrayResults = [];

    await Promise.all(arrayTeam.map(async (element) => {
        return new Promise((resolve, reject) => {
            const url = `https://api.sportmonks.com/v3/football/squads/teams/${element}?api_token=${TOKEN}&include=team:name;player;position;detailedPosition;transfer`;
            request.get({ url }, (error, response, body) => {
                if (error) {
                    console.error('Errore nella richiesta HTTP:', error);
                    reject(error);
                } else {
                    const res = JSON.parse(response.body);
                    res.data.forEach(async (player) => {
                        const result = await db.collection('players').insertOne(player);
                    })
                    resolve();
                }
            });
        });
    }));
    return arrayResults;
}

async function searchTeamsInSeason(db) {
    const arraySeason = [
        21646,
        21818,
        21943,
        21779,
        21694,
        21795,
        21825,
        21730,
        21638,
    ];
    const arrayResults = [];

    await Promise.all(arraySeason.map(async (element) => {
        return new Promise((resolve, reject) => {
            const url = `https://api.sportmonks.com/v3/football/teams/seasons/${element}?api_token=${TOKEN}&include=activeSeasons;country;venue;coaches;rivals;socials;`;
            request.get({ url }, (error, response, body) => {
                if (error) {
                    console.error('Errore nella richiesta HTTP:', error);
                    reject(error);
                } else {
                    const res = JSON.parse(response.body);
                    res.data.forEach(async (team) => {
                        if (team.gender != "neutral") {
                            const result = await db.collection('teams').insertOne(team);
                        }
                    })
                    if (res.pagination && res.pagination.has_more === false) {
                        end = true;
                    }
                    resolve();
                }
            });
        });
    }));
    return arrayResults;
}

async function insertLeaguesInMongoDb(db) {
    const arraySeason = [
        2,
        8,
        384,
        387,
        564,
        82,
        301,
        72,
        462
    ];
    const arrayResults = [];

    await Promise.all(arraySeason.map(async (element) => {
        return new Promise((resolve, reject) => {
            const url = `https://api.sportmonks.com/v3/football/leagues/${element}?api_token=${TOKEN}&include=country;latest.scores;latest.participants;currentSeason.statistics&timezone=Europe/Rome`;
            request.get({ url }, async (error, response, body) => {
                if (error) {
                    console.error('Errore nella richiesta HTTP:', error);
                    reject(error);
                } else {
                    const res = JSON.parse(response.body);
                    const result = await db.collection('leagues').insertOne(res.data);
                    resolve();
                }
            });
        });
    }));
    return arrayResults;
}

async function retrieveData(teamId) {
    var query = { id: teamId };
    const queryResult = await dbName.collection("teams").find();
    return queryResult;
}

async function insetDocumentsByDay(data, db) {
    var arrayDataCompleto = [];
    await callApiMatch(data, arrayDataCompleto)
        .then(async (apiResponse) => {
            if (apiResponse.length > 0) {
                for (let index = 0; index < arrayDataCompleto.length; index++) {
                    const result = await db.collection('matches').insertOne(arrayDataCompleto[index]);
                }
                return true;
                // var result = await insertFile(`${req.params.data}`, content);
                // result ? res.json({ response: `Match aggiunto ${req.params.data}.json` }) : res.json({ error: "IMPOSSIBILE AGGIUNGERE IL FILE" })
            } else {
                return false;
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

async function insertAllCoaches(db) {
    var arrayDataCompleto = [];
    await callApiCoaches(arrayDataCompleto)
        .then(async (apiResponse) => {
            if (apiResponse.length > 0) {
                for (let index = 0; index < arrayDataCompleto.length; index++) {
                    const result = await db.collection('coaches').insertOne(arrayDataCompleto[index]);
                }
                return true;
            } else {
                return false;
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

async function callApiMatch(date, arrayDataCompleto) {
    var end = false;
    for (var i = 1; i < 20 && !end; i++) {
        await new Promise((resolve, reject) => {
            const url = `https://api.sportmonks.com/v3/football/fixtures/date/${date}?api_token=${TOKEN}&include=round:name;league:id;coaches:common_name,image_path;coaches;league:id;participants;scores;venue:name,capacity,image_path,city_name;state;lineups.player:common_name,image_path;events;comments;lineups.player:common_name,image_path;events;comments;statistics:data,participant_id;periods;metadata;&filters=fixtureLeagues:384,387,564,462,72,82,301,8,2;MetaDataTypes:159,161,162;fixtureStatisticTypes:54,86,45,41,56,42,39,51,34,80,58,57&page=${i}&timezone=Europe/Rome`;
            request.get({ url }, (error, response, body) => {
                if (error) {
                    console.error('Errore nella richiesta HTTP:', error);
                    reject(error);
                } else {
                    var res = JSON.parse(response.body);
                    if (res.pagination && res.pagination.has_more === false) {
                        end = true;
                        resolve(arrayDataCompleto);
                    }
                    for (var match of res.data || []) {
                        arrayDataCompleto.push(match);
                    }
                    resolve(arrayDataCompleto);
                }
            })
        });
    }
    return new Promise((resolve, reject) => {
        resolve(arrayDataCompleto);
    });
}

async function callApiCoaches(arrayDataCompleto) {
    var end = false;
    for (var i = 1; i < 20 && !end; i++) {
        await new Promise((resolve, reject) => {
            const url = `https://api.sportmonks.com/v3/football/coaches?api_token=${TOKEN}&include=country;nationality&page=${i}`;
            request.get({ url }, (error, response, body) => {
                if (error) {
                    console.error('Errore nella richiesta HTTP:', error);
                    reject(error);
                } else {
                    var res = JSON.parse(response.body);
                    if (res.pagination && res.pagination.has_more === false) {
                        end = true;
                        resolve(arrayDataCompleto);
                    }
                    for (var match of res.data || []) {
                        arrayDataCompleto.push(match);
                    }
                    resolve(arrayDataCompleto);
                }
            })
        });
    }
    return new Promise((resolve, reject) => {
        resolve(arrayDataCompleto);
    });
}

// async function callUpdateLeagues() {
//     try {
//         const response = await axios.get('http://localhost:3000/api/retrieve/leagues');
//         console.log('Chiamata GET eseguita con successo:', response.data);
//     } catch (error) {
//         console.error('Errore durante la chiamata GET:', error);
//     }
// }
