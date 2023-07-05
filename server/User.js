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
    lang: {
        name: String,
        code: String,
    },
    ranks: {
        xh: Number,
        x: Number,
        sh: Number,
        s: Number,
        a: Number,
        b: Number,
        c: Number,
        d: Number,
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
    },
    setup: {
        peripherals: {
            monitor: String,
            headphones: String,
            microphone: String,
            tablet: String,
            mouse: String,
            keyboard: String,
            keypad: String,
            mousepad: String,
            chair: String,
        },
        tablet: {
            drivers: String,
            filters: [String],
            maxArea: {
                x: Number,
                y: Number,
            },
            area: {
                x: Number,
                y: Number,
                offsetX: Number,
                offsetY: Number,
            }
        },
        keyboard: {
            format: {
                type: String,
                enum: ['2', '3', '4', '60', '75', 'tkl', 'full']
            },
            inputs: [String]
        },
        mouse: {
            dpi: Number
        }
    }
})

module.exports = mongoose.model("User", userSchema)