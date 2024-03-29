const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const request = require('request');
const url = 'mongodb://localhost:27017';
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
        await db.collection('players').createIndex(
            { id: 1 },
            { unique: true }
        );

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

app.get('/api/retrieve/team/:id', async function (req, res) {
    try {
        const result = await retrieveData(req.params.id);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function insertPlayerInMongoDb(db) {
    const arrayTeam =
        [
            34,
            36,
            37,
            43,
            44,
            58,
            59,
            61,
            68,
            73,
            79,
            82,
            83,
            90,
            94,
            102,
            103,
            106,
            109,
            113,
            176,
            214,
            231,
            266,
            267,
            268,
            271,
            277,
            289,
            345,
            346,
            364,
            366,
            377,
            397,
            398,
            445,
            450,
            459,
            482,
            485,
            494,
            503,
            510,
            522,
            581,
            585,
            591,
            593,
            594,
            597,
            598,
            605,
            613,
            618,
            625,
            629,
            645,
            652,
            664,
            676,
            682,
            683,
            686,
            690,
            708,
            750,
            781,
            794,
            814,
            830,
            884,
            919,
            960,
            988,
            999,
            1000,
            1006,
            1016,
            1028,
            1053,
            1055,
            1072,
            1079,
            1085,
            1123,
            1198,
            1216,
            1403,
            1433,
            1453,
            1459,
            1628,
            1652,
            1658,
            2396,
            2714,
            2726,
            2831,
            2892,
            2930,
            2975,
            3161,
            3319,
            3320,
            3321,
            3468,
            3477,
            3513,
            3543,
            4070,
            4092,
            5447,
            6377,
            6789,
            6898,
            7055,
            7214,
            7471,
            7743,
            7790,
            7980,
            8164,
            8485,
            8513,
            9257,
            10722,
            10729,
            10744,
            10759,
            10775,
            11452,
            11741,
            12152,
            13258,
            17301,
            28028,
            134619,
        ];

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
        21638,
        21646,
        21694,
        21730,
        21779,
        21795,
        21818,
        21825,
        21943
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
                        const result = await db.collection('teams').insertOne(team);
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


async function retrieveData(teamId) {
    var query = { id: teamId };
    console.log(query);
    const queryResult = await dbName.collection("teams").find();
    console.log(queryResult);
    return queryResult;
}

async function insetDocumentsByDay(data, db) {
    var arrayDataCompleto = [];
    await callApiMatch(data, arrayDataCompleto)
        .then(async (apiResponse) => {
            console.log(apiResponse.length);
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