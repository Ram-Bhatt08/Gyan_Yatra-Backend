const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  timeTaken: { type: Number, default: 0 },
  topicStats: { type: Object, default: {} },
  detailed: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", ResultSchema);
