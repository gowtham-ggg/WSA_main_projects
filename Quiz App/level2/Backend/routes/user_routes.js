const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const authUser = require("../middleware/user-middleware")

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use. Please log in." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully!",
            user: { _id: savedUser._id, name: savedUser.name, email: savedUser.email },
        });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "An error occurred. Please try again." });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter both email and password." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "No account found with this email." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH);

        res.status(200).json({ message: "Login successful!", accessToken, refreshToken });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
});


//quiz-attend

router.get("/quiz-attempts", authUser, async (req, res) => {
    try {
        // Get user ID from authenticated request
        const userId = req.user._id; 
        
        // Find user and populate quiz attempts
        const user = await User.findById(userId).populate("quiz_attempts");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "Quiz attempts retrieved successfully.",
            attempts: user.quiz_attempts
        });

    } catch (error) {
        console.error("Error fetching quiz attempts:", error);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
});



module.exports = router;
