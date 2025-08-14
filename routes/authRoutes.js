const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide username, email and password" });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) return res.status(400).json({ message: "User with email or username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashed
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || "7d" });

    res.status(201).json({
      user: { id: user._id, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) return res.status(400).json({ message: "Please provide credentials" });

    const user = await User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || "7d" });

    res.json({
      user: { id: user._id, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get profile (protected)
router.get("/profile", authMiddleware, async (req, res) => {
  // authMiddleware attaches req.user
  res.json({ user: req.user });
});

module.exports = router;
