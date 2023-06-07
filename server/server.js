const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const User = require("./User");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = app;
console.clear();
app.listen(5000, function () {
    console.log("App running on port 5000");
});

const tokenFilePath = path.resolve(__dirname, 'token');
const contents = fs.readFileSync(tokenFilePath, 'utf8');
const tokenData = contents.split('\n');
const clientId = tokenData[0];
const clientSecret = tokenData[1];
const uri = tokenData[2];

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to the database');
        // Continue with your code here
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
    }
}

connectToDatabase().then();

function pushOrReplaceObjects(existingArray, newArray) {
    newArray.forEach(newObj => {
        const index = existingArray.findIndex(existingObj => existingObj.date.getTime() === newObj.date.getTime());

        if (index !== -1) {
            existingArray[index] = newObj; // Replace existing object with the new object
        } else {
            existingArray.push(newObj); // Add new object to the existing array
        }
    });
}

async function updateUser(userId, username, userRanks, countryRank, mode) {
    if (countryRank) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const objectRanks = userRanks.map((number, index) => {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - (userRanks.length - 1 - index));
            return {rank: number, date};
        });
        const currentCountryRank = {
            date: currentDate,
            rank: countryRank
        }
        try {
            let response = {};
            if (await User.exists({userId: userId})) {
                const user = await User.findOne({userId: userId});
                switch (mode) {
                    case 'osu':
                        pushOrReplaceObjects(user.modes.osu.rankHistory, objectRanks);
                        pushOrReplaceObjects(user.modes.osu.countryRankHistory, [currentCountryRank]);
                        user.modes.osu.rankHistory.sort((a, b) => a.date - b.date);
                        user.modes.osu.countryRankHistory.sort((a, b) => a.date - b.date);
                        response.global_rank = user.modes.osu.rankHistory;
                        response.country_rank = user.modes.osu.countryRankHistory;
                        break;
                    case 'taiko':
                        pushOrReplaceObjects(user.modes.taiko.rankHistory, objectRanks);
                        pushOrReplaceObjects(user.modes.taiko.countryRankHistory, [currentCountryRank]);
                        user.modes.taiko.rankHistory.sort((a, b) => a.date - b.date);
                        user.modes.taiko.countryRankHistory.sort((a, b) => a.date - b.date);
                        response.global_rank = user.modes.taiko.rankHistory;
                        response.country_rank = user.modes.taiko.countryRankHistory;
                        break;
                    case 'fruits':
                        pushOrReplaceObjects(user.modes.fruits.rankHistory, objectRanks);
                        pushOrReplaceObjects(user.modes.fruits.countryRankHistory, [currentCountryRank]);
                        user.modes.fruits.rankHistory.sort((a, b) => a.date - b.date);
                        user.modes.fruits.countryRankHistory.sort((a, b) => a.date - b.date);
                        response.global_rank = user.modes.fruits.rankHistory;
                        response.country_rank = user.modes.fruits.countryRankHistory;
                        break;
                    case 'mania':
                        pushOrReplaceObjects(user.modes.mania.rankHistory, objectRanks);
                        pushOrReplaceObjects(user.modes.mania.countryRankHistory, [currentCountryRank]);
                        user.modes.mania.rankHistory.sort((a, b) => a.date - b.date);
                        user.modes.mania.countryRankHistory.sort((a, b) => a.date - b.date);
                        response.global_rank = user.modes.mania.rankHistory;
                        response.country_rank = user.modes.mania.countryRankHistory;
                        break;
                }
                await user.save();
            } else {
                switch (mode) {
                    case 'osu':
                        const userOsu = new User(
                            {
                                userId: userId,
                                username: username,
                                modes: {
                                    osu: {
                                        rankHistory: objectRanks,
                                        countryRankHistory: [currentCountryRank]
                                    }
                                }
                            }
                        )
                        await userOsu.save();
                        response.global_rank = userOsu.modes.osu.rankHistory;
                        response.country_rank = userOsu.modes.osu.countryRankHistory;
                        break;
                    case 'taiko':
                        const userTaiko = new User(
                            {
                                userId: userId,
                                username: username,
                                modes: {
                                    taiko: {
                                        rankHistory: objectRanks,
                                        countryRankHistory: [currentCountryRank]
                                    }
                                }
                            }
                        )
                        await userTaiko.save();
                        response.global_rank = userTaiko.modes.taiko.rankHistory;
                        response.country_rank = userTaiko.modes.taiko.countryRankHistory;
                        break;
                    case 'fruits':
                        const userFruits = new User(
                            {
                                userId: userId,
                                username: username,
                                modes: {
                                    fruits: {
                                        rankHistory: objectRanks,
                                        countryRankHistory: [currentCountryRank]
                                    }
                                }
                            }
                        )
                        await userFruits.save();
                        response.global_rank = userFruits.modes.fruits.rankHistory;
                        response.country_rank = userFruits.modes.fruits.countryRankHistory;
                        break;
                    case 'mania':
                        const userMania = new User(
                            {
                                userId: userId,
                                username: username,
                                modes: {
                                    mania: {
                                        rankHistory: objectRanks,
                                        countryRankHistory: [currentCountryRank]
                                    }
                                }
                            }
                        )
                        await userMania.save();
                        response.global_rank = userMania.modes.mania.rankHistory;
                        response.country_rank = userMania.modes.mania.countryRankHistory;
                        break;
                }
            }
            return response;
        } catch (e) {
            console.error(e);
            return [];
        }
    } else {
        return {
            "global_rank": [],
            "country_rank": []
        }
    }
}

async function getToken() {
    const contents = fs.readFileSync(tokenFilePath, 'utf8');
    const oldTokenData = contents.split('\n');
    let token = oldTokenData[3];
    const oldUnixTime = oldTokenData[4];
    const currentUnixTime = Math.floor(new Date().getTime() / 1000).toString();
    const expiration = 82800;
    if (parseInt(currentUnixTime) - parseInt(oldUnixTime) > expiration) {
        try {
            token = await getNewToken();
            await writeNewToken(token, currentUnixTime);
            return token;
        } catch (error) {
            return 'error3';
        }
    }
    return token;
}

async function getNewToken() {
    const url = new URL(
        "https://osu.ppy.sh/oauth/token"
    );
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    };
    let body = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=public`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: body,
        });
        if (!response.ok) {
            return new Error('Network response was not ok');
        }
        const data = await response.json();
        return data["access_token"];
    } catch (error) {
        return error;
    }
}

function writeNewToken(token, currentUnixTime) {
    fs.truncate(tokenFilePath, 0, function () {
        console.log('token erased')
    })
    const tokenData = [
        clientId,
        clientSecret,
        uri,
        token,
        currentUnixTime
    ];
    try {
        const options = {encoding: 'utf8', flag: 'a'};
        fs.appendFile(tokenFilePath, tokenData.join('\n'), options, (err) => {
            if (err) throw err;
            console.log('Data appended to file');
        });
    } catch (err) {
        console.error(err);
    }
}

app.get('/usrInfo/:username/:mode', async function (req, res) {
    console.log('usr request made')
    let username = req.params.username;
    let mode = req.params.mode;
    try {
        const token = await getToken();
        try {
            const url = new URL(
                `https://osu.ppy.sh/api/v2/users/${username}/${mode}`
            );
            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const response = await fetch(url, {
                method: "GET",
                headers,
            });
            const data = await response.json();
            data.db_rank_history = await updateUser(data.id, data.username, data.rank_history.data, data.statistics.country_rank, mode);
            res.send(data);
        } catch (error) {
            res.send({error: error.toString()});
            console.log(error.toString())
        }
    } catch (error) {
        res.status(500).send({error: 'Error fetching data'})
    }
})

app.get('/beatmapInfo/:beatmapId/:userId/', async function (req, res) {
    console.log('beatmap request made')
    let beatmapId = req.params.beatmapId;
    let userId = req.params.userId;
    try {
        const token = await getToken();
        try {
            const url = new URL(
                `https://osu.ppy.sh/api/v2/beatmaps/${beatmapId}/scores/users/${userId}`
            );
            const params = {};
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));
            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const response = await fetch(url, {
                method: "GET",
                headers,
            });
            const data = await response.json();
            res.send(data);
        } catch (error) {
            res.send({error: error.toString()});
        }
    } catch (error) {
        res.status(500).send({error: 'Error fetching data'})
    }
});

app.get('/usrScores/:userId/:thing/:mode', async function (req, res) {
    console.log('scores request made')
    let userId = req.params['userId'];
    let thing = req.params['thing'];
    let mode = req.params['mode'];
    try {
        const token = await getToken();
        let offset = 0;
        let response = [];
        let data = [];
        try {
            offset = 0;
            do {
                const url = new URL(
                    `https://osu.ppy.sh/users/${userId}/scores/${thing}?mode=${mode}&limit=100&offset=${offset}`
                );
                const params = {};
                Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
                const headers = {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                };
                const fetchResponse = await fetch(url, {
                    method: "GET",
                    headers,
                });
                data = await fetchResponse.json();
                offset += data.length;
                response = response.concat(data);
            } while (data.length === 100);
            res.send(response);
        } catch (error) {
            console.error(error);
            res.send({error: error.toString()});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "Error fetching data"});
    }
});
app.get('/getBG', async function (req, res) {
    console.log('bg request made')
    try {
        const token = await getToken();
        try {
            const url = new URL(
                `https://osu.ppy.sh/api/v2/seasonal-backgrounds`
            );
            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const response = await fetch(url, {
                method: "GET",
                headers,
            });
            const data = await response.json();
            res.send(data);
        } catch (error) {
            res.send({error: error.toString()});
            console.log(error.toString())
        }
    } catch (error) {
        res.status(500).send({error: 'Error fetching data'})
    }
});
app.get('/getMedals', async function (req, res) {
    console.log('medals request made')
    try {
        try {
            const url = new URL(
                `https://osekai.net/medals/api/medals.php`
            );
            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            };
            const response = await fetch(url, {
                method: "POST",
                headers,
            });
            const data = await response.json();
            res.send(data);
        } catch (error) {
            res.send({error: error.toString()});
            console.log(error.toString())
        }
    } catch (error) {
        res.status(500).send({error: 'Error fetching data'})
    }
});
