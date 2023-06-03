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

connectToDatabase().then(() => console.log("tried to connect"));

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

async function updateUser(userId, username, userRanks, countryRank) {
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
            console.log(user);
            pushOrReplaceObjects(user.rankHistory, objectRanks);
            pushOrReplaceObjects(user.countryRankHistory, [currentCountryRank]);
            await user.save();
            response.global_rank = user.rankHistory;
            response.country_rank = user.countryRankHistory;
        } else {
            const user = new User(
                {
                    userId: userId,
                    username: username,
                    rankHistory: objectRanks,
                    countryRankHistory: [currentCountryRank]
                }
            )
            await user.save();
            response.global_rank = user.rankHistory;
            response.country_rank = user.countryRankHistory;
        }
        return response;
    } catch (e) {
        console.error(e);
        return [];
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

app.get('/usrInfo/:username/', async function (req, res) {
    let username = req.params.username;
    try {
        const token = await getToken();
        try {
            const url = new URL(
                `https://osu.ppy.sh/api/v2/users/${username}/osu`
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
            data.db_rank_history = await updateUser(data.id, data.username, data.rank_history.data, data.statistics.country_rank);
            res.send(data);
        } catch (error) {
            res.send({error: error.toString()});
        }
    } catch (error) {
        res.status(500).send({error: 'Error fetching data'})
    }
});

app.get('/beatmapInfo/:beatmapId/:userId', async function (req, res) {
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

app.get('/usrScores/:userId/:type', async function (req, res) {
    let userId = req.params.userId;
    let type = req.params.type;
    try {
        const token = await getToken();
        try {
            const url = new URL(`https://osu.ppy.sh/api/v2/users/${userId}/scores/${type}`);
            const params = {
                include_fails: "1",
                mode: "osu",
                "limit": "9999999999999999999999999999999999999999",
            };
            Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
            const headers = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            };
            const response = await fetch(url, {
                method: "GET",
                headers,
            });
            const data = await response.json();
            res.send(data);
            console.log(data)
        } catch (error) {
            console.error(error);
            res.send({error: error.toString()});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "Error fetching data"});
    }
});

app.get('/rankInfo/', async function (req, res) {
    try {
        const token = await getToken();
        try {
            const url = new URL(
                `https://osu.ppy.sh/api/v2/rankings/osu/performance`
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