const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

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
async function getToken() {
    const contents = fs.readFileSync(tokenFilePath, 'utf8');
    const oldTokenData = contents.split('\n');
    let token = oldTokenData[2];
    const oldUnixTime = oldTokenData[3];
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
            const params = {
            };
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

app.get('/beatmapInfo/:beatmapId/:userId', async function (req, res) {
    let beatmapId = req.params.beatmapId;
    let userId = req.params.userId;
    try {
        const token = await getToken();
        try {
            const url = new URL(
                `https://osu.ppy.sh/api/v2/beatmaps/${beatmapId}/scores/users/${userId}`
            );
            const params = {
            };
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


app.get('/usrScores/:userId/', async function (req, res) {
    let userId = req.params.userId;
    try {
        const token = await getToken();
        try {
            const url = new URL(`https://osu.ppy.sh/api/v2/users/${userId}/scores/best`);
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
        } catch (error) {
            console.error(error);
            res.send({ error: error.toString() });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error fetching data" });
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