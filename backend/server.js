require("dotenv").config();

const jwt = require("jsonwebtoken");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Prediction = require("./models/Prediction");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// MongoDB Connection
// ===============================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log(
            "MongoDB connection failed:",
            error.message
        );
    });


// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {

    res.json({
        message: "Fake News Detection Backend is running"
    });

});


// ===============================
// Register User
// ===============================

app.post("/auth/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;


        // Check required fields

        if (!name || !email || !password) {

            return res.status(400).json({
                error: "All fields are required"
            });

        }


        // Check if user already exists

        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {

            return res.status(400).json({
                error: "User already exists"
            });

        }


        // Hash password

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create user

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });


        // Save user

        await user.save();


        // Send response

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        console.log(
            "Registration error:",
            error.message
        );

        res.status(500).json({
            error: "Unable to register user"
        });

    }

});


// ===============================
// Login User
// ===============================

app.post("/auth/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        // Check required fields

        if (!email || !password) {

            return res.status(400).json({
                error: "Email and password are required"
            });

        }


        // Find user by email

        const user = await User.findOne({
            email: email
        });


        // User not found

        if (!user) {

            return res.status(401).json({
                error: "Invalid email or password"
            });

        }


        // Compare password

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        // Wrong password

        if (!passwordMatch) {

            return res.status(401).json({
                error: "Invalid email or password"
            });

        }


        // ===============================
        // Create JWT Token
        // ===============================

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // ===============================
        // Login Successful
        // ===============================

        res.json({

            message: "Login successful",

            token: token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        console.log(
            "Login error:",
            error.message
        );

        res.status(500).json({
            error: "Unable to login"
        });

    }

});


// ===============================
// Predict News
// ===============================

app.post("/predict", async (req, res) => {

    try {

        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            {
                news: req.body.news
            }
        );


        // Save prediction in MongoDB

        const prediction = new Prediction({

            news: req.body.news,

            result: response.data.result,

            confidence: response.data.confidence,

            confidence_level:
                response.data.confidence_level

        });


        await prediction.save();


        // Send AI result to frontend

        res.json(response.data);

    } catch (error) {

        console.log(
            "Prediction error:",
            error.message
        );

        res.status(500).json({
            error: "Unable to process prediction"
        });

    }

});


// ===============================
// Get Prediction History
// ===============================

app.get("/history", async (req, res) => {

    try {

        const history = await Prediction.find()
            .sort({
                createdAt: -1
            });


        res.json(history);

    } catch (error) {

        console.log(
            "History error:",
            error.message
        );

        res.status(500).json({
            error: "Unable to fetch history"
        });

    }

});


// ===============================
// Dashboard Statistics
// ===============================

app.get("/stats", async (req, res) => {

    try {

        // Total predictions

        const totalPredictions =
            await Prediction.countDocuments();


        // Real news count

        const realNews =
            await Prediction.countDocuments({
                result: "REAL NEWS"
            });


        // Fake news count

        const fakeNews =
            await Prediction.countDocuments({
                result: "FAKE NEWS"
            });


        // Send statistics

        res.json({

            totalPredictions: totalPredictions,

            realNews: realNews,

            fakeNews: fakeNews

        });

    } catch (error) {

        console.log(
            "Statistics error:",
            error.message
        );

        res.status(500).json({
            error: "Unable to fetch statistics"
        });

    }

});


// ===============================
// Clear Prediction History
// ===============================

app.delete("/history", async (req, res) => {

    try {

        await Prediction.deleteMany({});


        res.json({
            message: "History cleared successfully"
        });

    } catch (error) {

        console.log(
            "Clear history error:",
            error.message
        );

        res.status(500).json({
            error: "Unable to clear history"
        });

    }

});


// ===============================
// Start Server
// ===============================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});