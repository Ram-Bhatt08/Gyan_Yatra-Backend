const express = require("express");
const Result = require("../models/Result");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * GET /api/result/:id
 * Returns a single quiz result for the logged-in user
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const result = await Result.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(result);
  } catch (err) {
    console.error("Error fetching result:", err);
    res.status(500).json({ message: "Failed to fetch result" });
  }
});

/**
 * GET /api/result
 * Returns all quiz results of the logged-in user
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("Error fetching results:", err);
    res.status(500).json({ message: "Failed to fetch results" });
  }
});

module.exports = router;

