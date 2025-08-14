// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizzesPlayed: { type: Number, default: 0 },
  highestScore: { type: Number, default: 0 },
  quizHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
