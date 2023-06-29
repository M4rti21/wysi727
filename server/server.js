const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const axios = require('axios');

const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const User = require("./User");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const {Client, Events, GatewayIntentBits} = require('discord.js');
const MemoryStore = session.MemoryStore;


const token = process.env.DISCORD_TOKEN;
const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.login(token);


// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'

// Log in to Discord with your client's token

const tokenFilePath = path.resolve(__dirname, 'token');
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const uri = process.env.DB_CONNECTION;


const user = '468516101639241731';
client.users.send(user, 'content');
client.on('messageCreate', (message) => {
    console.log(`Message from ${message.author.tag}: ${message.content}`);
});
client.on(Events.InteractionCreate, async interaction => {
    console.log(interaction)
    if (!interaction.isChatInputCommand()) return;

    const {commandName} = interaction;

    console.log(commandName)
});

// bot.getDMChannel(user)
//     .then(dmChannel => {
//         console.log(dmChannel)
//     })
//     .catch((error) => {
//         console.error('Error getting DM channel:', error);
//     });
// bot.on("messageCreate", (msg) => { // When a message is created
//     if (msg.author.id !== '722915398156157009') {
//         console.log(msg.content)
//         if (msg.author.id === '752997287692599336') {
//             bot.createMessage(msg.channel.id, "🖕");
//         }
//     }
// });

app.use(express.json());
app.set('trust proxy', 1); // Enable proxy trust

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your front-end URL
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "nofuckingwaycookiezifcbluezenith727!!!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true, // Enable this in production with HTTPS
        httpOnly: true,
        sameSite: 'none', // Set to 'lax' or 'strict' for single origin
    },
}));

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
                switch (mode) {
                    case 'osu':
                        pushOrReplaceObjects(user.modes.osu.rankHistory, objectRanks);
                        pushOrReplaceObjects(user.modes.osu.countryRankHistory, [currentCountryRank]);
                        user.modes.osu.rankHistory.sort((a, b) => a.date - b.date);
                        user.modes.osu.countryRankHistory.sort((a, b) => a.date - b.date);
                        response.global_rank = user.modes.osu.rankHistory;
                        response.country_rank = user.modes.osu.countryRankHistory;
                        // if (user.userId === 17018032) {
                        //     user.setup = {
                        //         peripherals: {
                        //             tablet: 'Wacom CTH-680',
                        //             setup: 'Akko ACR Pro Alice Plus',
                        //             keypad: 'Sayobot O2C',
                        //             mouse: 'Logitech G502X Lightspeed',
                        //             monitor: 'Acer Nitro XV252QF 24.5" 1920x1080 1 ms 390Hz',
                        //             headphones: 'Beyerdynamic DT880 + Audient ID14 MKII',
                        //             microphone: 'Shure SM7b + Triton Fethead + Audient ID14 MKII',
                        //             mousepad: 'Generic 1200x600mm mousepad',
                        //             chair: 'Corsair T3',
                        //         },
                        //         tablet: {
                        //             drivers: "OpenTabletDriver",
                        //             filters: "none",
                        //             area: {
                        //                 x: 216,
                        //                 y: 121.5,
                        //                 offsetX: 108,
                        //                 offsetY: 60.75
                        //             },
                        //             maxArea: {
                        //                 x: 216,
                        //                 y: 135
                        //             },
                        //         },
                        //         setup: {
                        //             format: '60',
                        //             inputs: ['z', 'x']
                        //         }
                        //     }
                        // }
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
                const userCompact = await getUserCompact(data.id);
                req.session.userid = userCompact.id;
                res.cookie('userid', userCompact.id);
                res.status(200).json(userCompact);
            } else {
                res.status(200).json({msg: "error"});
            }
        } catch (error) {
            console.error(error);
            res.status(400).send('Bad Request');        }
    } catch (error) {
        console.error(error);
        res.status(400).send('Bad Request');    }
});
app.get('/login', async (req, res) => {
    const user = req.session.userid;
    if (user) {
        const userCompact = await getUserCompact(req.session.userid);
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

        res.set('Content-Type', 'image/jpeg');
        res.status(200).send(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching image');
    }
});

app.listen(5000, function () {
    console.log("App running on port 5000");
});
