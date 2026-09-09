require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Prediction = require("./models/Prediction");
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Fake News Detection Backend is running"
    });
});
app.post("/predict", async (req, res) => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            {
                news: req.body.news
            }
        );

        const prediction = new Prediction({
            news: req.body.news,
            result: response.data.result,
            confidence: response.data.confidence,
            confidence_level: response.data.confidence_level
        });

        await prediction.save();

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            error: "Unable to process prediction"
        });
    }
});
app.get("/history", async (req, res) => {
    try {
        const history = await Prediction.find()
            .sort({ createdAt: -1 });

        res.json(history);

    } catch (error) {
        res.status(500).json({
            error: "Unable to fetch history"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});