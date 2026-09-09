const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
    {
        news: {
            type: String,
            required: true
        },

        result: {
            type: String,
            required: true
        },

        confidence: {
            type: Number,
            required: true
        },

        confidence_level: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Prediction", predictionSchema);