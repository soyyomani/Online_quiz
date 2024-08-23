import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './QuizList.css';

const QuizList = () => {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [view, setView] = useState('available'); // Track the current view

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const res = await axios.get('http://localhost:4020/api/quiz', config);
        if (res.data && Array.isArray(res.data)) {
          const completed = res.data.filter((quiz) => quiz.completed);
          const available = res.data.filter((quiz) => !quiz.completed);
          setAvailableQuizzes(available);
          setCompletedQuizzes(completed);
        } else {
          console.error('Invalid or empty response data received from server');
        }
      } catch (err) {
        console.error('Error fetching quizzes:', err);
      }
    };
    fetchQuizzes();
  }, []);

  const handleQuizAttempt = async (quizId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };

      // Assuming you have an endpoint to mark a quiz as completed
      const res = await axios.put(`http://localhost:4020/api/quiz/${quizId}/complete`, {}, config);

      if (res.data) {
        setAvailableQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizId));
        setCompletedQuizzes((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error('Error marking quiz as completed:', err);
    }
  };

  return (
    <div className="quiz-list-container">
      <div className="quiz-list-navigation">
        <button 
          className={`quiz-list-button ${view === 'available' ? 'active' : ''}`} 
          onClick={() => setView('available')}
        >
          Available Quizzes
        </button>
        <button 
          className={`quiz-list-button ${view === 'completed' ? 'active' : ''}`} 
          onClick={() => setView('completed')}
        >
          Completed Quizzes
        </button>
      </div>

      {view === 'available' && (
        <div className="quiz-list-section">
          <h1 className="quiz-list-heading">Available Quizzes</h1>
          <div className="quiz-grid">
            {availableQuizzes.map((quiz) => (
              <div className="quiz-box" key={quiz._id}>
                <div className="quiz-title">{quiz.title}</div>
                <Link 
                  to={`/student/quiz/${quiz._id}`} 
                  className="quiz-link" 
                  onClick={() => handleQuizAttempt(quiz._id)}
                >
                  Start Quiz
                </Link>
                <div className="quiz-status pending">Pending</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'completed' && (
        <div className="quiz-list-section">
          <h1 className="quiz-list-heading">Completed Quizzes</h1>
          <div className="quiz-grid">
            {completedQuizzes.map((quiz) => (
              <div className="quiz-box" key={quiz._id}>
                <div className="quiz-title">{quiz.title}</div>
                <div className="quiz-status completed">Completed</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizList;
