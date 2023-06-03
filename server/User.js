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
    rankHistory: [rankSchema],
    countryRankHistory: [rankSchema]
})

module.exports = mongoose.model("User", userSchema)