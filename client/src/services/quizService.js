import axios from 'axios';

const createQuiz = async quizData => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    };

    const res = await axios.post('https://online-quiz-backend-tp6d.onrender.com/api/quiz', quizData, config);
    return res.data;
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};

const getQuizzes = async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token
      }
    };
    const res = await axios.get('https://online-quiz-backend-tp6d.onrender.com/api/quiz', config);
    if (!res.data) {
      throw new Error('No data returned from server');
    }
    const quizzes = res.data;
    const completedQuizzes = quizzes.filter(quiz => quiz.results);
    const upcomingQuizzes = quizzes.filter(quiz => !quiz.results);

    return { completedQuizzes, upcomingQuizzes };
  } catch (error) {
    console.error('Error fetching quizzes:', error.message || error);
    throw error;
  }
};



const getQuiz = async quizId => {
  try {
    const res = await axios.get(`https://online-quiz-backend-tp6d.onrender.com/api/quiz/${quizId}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching quiz ${quizId}:`, error);
    throw error;
  }
};

const submitQuiz = async (quizId, answers) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    };

    const res = await axios.post(`https://online-quiz-backend-tp6d.onrender.com/api/quiz/${quizId}/submit`, answers, config);
    return res.data;
  } catch (error) {
    console.error(`Error submitting quiz ${quizId}:`, error);
    throw error;
  }
};

const fetchResult = async id => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. User might not be authenticated.');
    }

    const config = {
      headers: {
        'x-auth-token': token
      }
    };

    const res = await axios.get(`https://online-quiz-backend-tp6d.onrender.com/api/quiz/${id}/result`, config);
    return res.data;
  } catch (error) {
    console.error(`Error fetching result for quiz ${id}:`, error.response || error.message || error);
    throw error;
  }
};

const quizService = {
  createQuiz,
  getQuizzes,
  getQuiz,
  submitQuiz,
  fetchResult
};

export default quizService;
