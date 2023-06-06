const mongoose = require("mongoose");

const rankSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    rank: {
        type: Number,
        required: true
    }
})

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        immutable: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    modes: {
        osu: {
            rankHistory: [rankSchema],
            countryRankHistory: [rankSchema]
        },
        taiko: {
            rankHistory: [rankSchema],
            countryRankHistory: [rankSchema]
        },
        fruits: {
            rankHistory: [rankSchema],
            countryRankHistory: [rankSchema]
        },
        mania: {
            rankHistory: [rankSchema],
            countryRankHistory: [rankSchema]
        }
    }
})

module.exports = mongoose.model("User", userSchema)