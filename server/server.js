const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
const path = require('path');
const User = require("./User");
const fs = require('fs');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
    secret: "nofuckingwaycookiezifcbluezenith727!!!",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
}));

dotenv.config();
const discordToken = process.env.DISCORD_TOKEN;
const tokenFilePath = path.resolve(__dirname, 'token');
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});
const countOccurrences = (arr, word) => {
    // Use the reduce function to iterate over the array
    return arr.reduce(function (count, currentWord) {
        // Check if the current word matches the specified word
        if (currentWord === word) {
            // If it matches, increment the count
            return count + 1;
        } else {
            // Otherwise, return the current count
            return count;
        }
    }, 0);
}
const pushOrReplaceObjects = async (existingArray, newArray) => {
    newArray.forEach(newObj => {
        const index = existingArray.findIndex(existingObj => existingObj.date.getTime() === newObj.date.getTime());

        if (index !== -1) {
            existingArray[index] = newObj; // Replace existing object with the new object
        } else {
            existingArray.push(newObj); // Add new object to the existing array
        }
    });
}
const updateUser = async (userId, username, userRanks, countryRank, mode) => {
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
                await pushOrReplaceObjects(user.modes[mode].rankHistory, objectRanks);
                await pushOrReplaceObjects(user.modes[mode].countryRankHistory, [currentCountryRank]);
                user.modes[mode].rankHistory.sort((a, b) => a.date - b.date);
                user.modes[mode].countryRankHistory.sort((a, b) => a.date - b.date);
                response.global_rank = user.modes[mode].rankHistory;
                response.country_rank = user.modes[mode].countryRankHistory;
                response.setup = user.setup ? user.setup : null;
                try {
                    const contents = fs.readFileSync(path.resolve(__dirname, 'scores.csv'), 'utf8');
                    const scores = contents.split('\n').map((score => score.split(',')));
                    if (scores[1][0] === userId.toString()) {
                        const ranks = scores.map(score => score[11]);
                        user.ranks = {
                            xh: countOccurrences(ranks, 'XH'),
                            x: countOccurrences(ranks, 'X'),
                            sh: countOccurrences(ranks, 'SH'),
                            s: countOccurrences(ranks, 'S'),
                            a: countOccurrences(ranks, 'A'),
                            b: countOccurrences(ranks, 'B'),
                            c: countOccurrences(ranks, 'C'),
                            d: countOccurrences(ranks, 'D')
                        };
                    }
                    response.ranks = user.ranks;
                } catch (e) {
                    console.error(e)
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
        } catch
            (e) {
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
const getToken = async () => {
    const contents = fs.readFileSync(tokenFilePath, 'utf8');
    const oldTokenData = contents.split('\n');
    let token = oldTokenData[0];
    const oldUnixTime = oldTokenData[1];
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
const getNewToken = async () => {
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
const writeNewToken = async (token, currentUnixTime) => {
    fs.truncate(tokenFilePath, 0, function () {
        console.log('token erased')
    })
    const tokenData = [
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
const getUserCompact = async (username) => {
    try {
        const token = await getToken();
        try {
            const url = new URL(
                "https://osu.ppy.sh/api/v2/users"
            );
            const params = {
                "ids[]": [username],
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
            return data.users[0];
        } catch (error) {
            return {error: error.toString()}
        }
    } catch (error) {
        return {error: 'Error fetching data'};
    }
}
app.get('/getUserId/:username', async function (req, res) {
    let username = req.params.username;
    try {
        const token = await getToken();
        const url = new URL(
            `https://osu.ppy.sh/api/v2/users/${username}`
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
        res.status(200).send({id: data.id});
    } catch (err) {
        res.status(500).json({error: err});
    }
});
app.get('/usrInfo/:username/:mode', async function (req, res) {
    let username = req.params.username;
    let mode = req.params.mode;
    try {
        const token = await getToken();

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
        data.db_info = await updateUser(data.id, data.username, data.rank_history.data, data.statistics.country_rank, mode);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({error: err})
    }
})
app.get('/usrScores/:userId/:thing/:mode', async function (req, res) {
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
            res.status(200).send(response);
        } catch (err) {
            console.error(err);
            res.status(500).send({error: err});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({error: "Error fetching data"});
    }
});
app.get('/getMedals', async function (req, res) {
    req.session.test = true;
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
            console.error(error)
        }
    } catch (error) {
        res.status(500).send({error: 'Error fetching data'})
    }
});
app.get('/oauth-redirect/:userCode/', async function (req, res) {
    let code = req.params['userCode'];
    try {
        const response = await axios.post('https://osu.ppy.sh/oauth/token', {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: 'http://localhost:3000/oauth-redirect',
            code: code,
            grant_type: 'authorization_code',
        });
        const accessToken = response.data.access_token;
        try {
            const url = new URL(
                "https://osu.ppy.sh/api/v2/me/osu"
            );
            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${accessToken}`
            };
            const response = await fetch(url, {
                method: "GET",
                headers,
            });
            const data = await response.json();
            if (data?.id) {
                req.session.userId = data.id;
                const userCompact = await getUserCompact(req.session.userId);
                console.log(req.session.userId)
                res.status(200).json(userCompact);
            } else {
                res.status(200).json({msg: "error"});
            }
        } catch (error) {
            console.error(error);
            res.status(400).send('Bad Request');
        }
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');
    }
});
app.get('/login', async (req, res) => {
    const user = req.session.userId;
    if (user) {
        const userCompact = await getUserCompact(req.session.userId);
        res.status(200).send(userCompact);
    } else {
        res.status(401).send('Unauthorized');
    }
});
app.get('/logout', async (req, res) => {
    req.session.destroy();
    res.status(200);
});
app.get('/image/:id/:url', async (req, res) => {
    const id = req.params['id'];
    const imageUrl = req.params['url'];
    try {
        const imageResponse = await fetch(`https://a.ppy.sh/${id}?${imageUrl}.jpeg`);
        const imageArrayBuffer = await imageResponse.arrayBuffer();
        const imageBuffer = Buffer.from(imageArrayBuffer);
        res.status(200).set('Content-Type', 'image/jpeg').send(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
    }
});

app.listen(5000, function () {
    console.log("App running on port 5000");
});
