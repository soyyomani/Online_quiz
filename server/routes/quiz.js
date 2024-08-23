const express = require('express');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

 
router.post('/', authMiddleware, async (req, res) => {
  const { title, questions } = req.body;

 
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ msg: 'Quiz must contain at least one question.' });
  }

  try {
    const quiz = new Quiz({
      title,
      questions,
      createdBy: req.user.id
    });

    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error('Error creating quiz:', err.message);
    res.status(500).send({ msg: 'Server error', error: err.message });
  }
});

 
router.get('/', authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err.message);
    res.status(500).send('Server error');
  }
});

 
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    console.error('Error fetching quiz:', err.message);
    res.status(500).send('Server error');
  }
});

 
router.post('/:id/submit', authMiddleware, async (req, res) => {
  const { answers } = req.body;
  const quizId = req.params.id;
  let score = 0;
  let feedback = '';

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }

    const questions = quiz.questions;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      let answer = answers.find(a => a.questionId === question._id.toString()).answer;
      
      const normalizedAnswer = answer.toString().trim().toLowerCase();
      const normalizedCorrectAnswer = question.correctAnswer.trim().toLowerCase();

      if (normalizedAnswer === normalizedCorrectAnswer) {
        score++;
        feedback += `Question ${i + 1}: Correct! \n`;
      } else {
        feedback += `Question ${i + 1}: Incorrect. The correct answer was ${question.correctAnswer}. \n`;
      }
    }

    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;

    feedback += percentage === 100
      ? 'Excellent! You answered all questions correctly. 🎉😊'
      : percentage >= 75
      ? 'Great work! You nearly aced it. 😃'
      : percentage >= 50
      ? 'Good job! You passed the quiz. 🙂'
      : 'You could improve. Try again! 😞';

    const quizResult = new QuizResult({
      user: req.user.id,
      quiz: quizId,
      score,
      feedback
    });
    await quizResult.save();

    await Quiz.findByIdAndUpdate(quizId, { completed: true });

    res.json({
      quizId: quiz._id,
      submittedAnswers: answers,
      score,
      feedback
    });
  } catch (err) {
    console.error('Error submitting quiz:', err.message);
    res.status(500).send('Server error');
  }
});




 
router.get('/:id/result', authMiddleware, async (req, res) => {
  try {
    const quizId = req.params.id;
    const quizResult = await QuizResult.findOne({ quiz: quizId, user: req.user.id })
      .populate('quiz', 'title questions');

    if (!quizResult) {
      return res.status(404).json({ msg: 'Quiz result not found for this user.' });
    }

    const resultData = {
      quizTitle: quizResult.quiz.title,
      score: quizResult.score,
      totalQuestions: quizResult.quiz.questions.length,
      feedback: quizResult.feedback
    };

    res.json(resultData);
  } catch (err) {
    console.error('Error fetching quiz result:', err.message);
    res.status(500).send('Server error');
  }
});

 
router.put('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });
    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    console.error('Error marking quiz as completed:', err.message);
    res.status(500).send('Server error');
  }
});



module.exports = router;
