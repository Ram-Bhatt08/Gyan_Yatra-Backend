const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get leaderboard
router.get("/", async (req, res) => {
  try {
    const leaders = await User.find({}, "username highestScore")
      .sort({ highestScore: -1 })
      .limit(10);

    const leaderboard = leaders.map((u, index) => ({
      rank: index + 1,
      username: u.username,
      score: u.highestScore
    }));

    res.json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
