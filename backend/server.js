require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
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

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            error: "Unable to connect to AI service"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});