// routes/quizRoutes.js
const express = require("express");
const Question = require("../models/Question");
const Result = require("../models/Result");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET /api/quiz/start?size=10
 * Returns random questions using aggregation $sample (without correct answers)
 */
router.get("/start", authMiddleware, async (req, res) => {
  try {
    const size = Number.parseInt(req.query.size, 10) || 10;

    const questions = await Question.aggregate([{ $sample: { size } }]);

    // Hide correct answers from client
    const publicQuestions = questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options,
      topic: q.topic,
    }));

    res.json(publicQuestions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

/**
 * POST /api/quiz/submit
 * Body: { answers: [{ qid, answer }], timeTaken?: number }
 * Returns score and analytics; also updates user stats
 */
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "No answers submitted" });
    }

    // Fetch the set of questions answered
    const qids = answers.map((a) => a.qid);
    const questions = await Question.find({ _id: { $in: qids } });

    // Build a quick lookup
    const qMap = new Map();
    questions.forEach((q) => qMap.set(String(q._id), q));

    // Score the quiz
    let correctCount = 0;
    const topicStats = {}; // topic => correct count
    const detailed = [];   // detailed per-question breakdown

    for (const a of answers) {
      const q = qMap.get(String(a.qid));
      if (!q) {
        detailed.push({
          qid: a.qid,
          correct: false,
          reason: "Question not found",
        });
        continue;
      }

      const correct = q.correctAnswer === a.answer;
      if (correct) {
        correctCount += 1;
        topicStats[q.topic] = (topicStats[q.topic] || 0) + 1;
      }

      detailed.push({
        qid: a.qid,
        questionText: q.questionText,
        correctAnswer: q.correctAnswer,
        userAnswer: a.answer,
        correct,
      });
    }

    const total = answers.length;
    const scorePercent = Math.round((correctCount / total) * 100);

    // Persist result
    const result = await Result.create({
      userId: req.user._id,
      score: scorePercent,
      totalQuestions: total,
      correctAnswers: correctCount,
      timeTaken: timeTaken || 0,
      topicStats,
      detailed,
    });

    // Push to user's history and update stats
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { quizHistory: result._id },
        $inc: { quizzesPlayed: 1 },
        $max: { highestScore: scorePercent }, // keep the best score
      },
      { new: true }
    );

    // Send response
    res.json({
      resultId: result._id,
      scorePercent,
      correctAnswers: correctCount,
      totalQuestions: total,
      topicStats,
      timeTaken: timeTaken || 0,
      detailed,
    });
  } catch (err) {
    console.error("Failed to submit quiz:", err);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
});

module.exports = router;
