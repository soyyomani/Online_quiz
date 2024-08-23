const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizResultSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  feedback: { type: String }
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
