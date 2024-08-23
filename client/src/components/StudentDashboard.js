import React, { useEffect, useState } from 'react';
import quizService from '../services/quizService';
import authService from '../services/authService';  
import './StudentDashboard.css';
import QuizList from './QuizList';  

const StudentDashboard = () => {
  const [username, setUsername] = useState('');
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [availableQuizzes, setAvailableQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { completedQuizzes: availableQuizzes, upcomingQuizzes: completedQuizzes } = await quizService.getQuizzes();
        setCompletedQuizzes(completedQuizzes);
        setAvailableQuizzes(availableQuizzes);
      } catch (err) {
        console.error('Error fetching quizzes:', err.response ? err.response.data : err.message);
      }
    };
  
    const fetchUserDetails = async () => {
      try {
        const userData = await authService.fetchUserDetails();  
        setUsername(userData.username);  
      } catch (err) {
        console.error('Error fetching user details:', err.message);
      }
    };
  
    fetchQuizzes();
    fetchUserDetails();
  }, []);
  

  const totalQuizzesCount = completedQuizzes.length + availableQuizzes.length;
  const availableQuizzesCount = availableQuizzes.length;
  const completedQuizzesCount = completedQuizzes.length;

  return (
    <div className="student-dashboard">
      <div className="profile-section">
        <img src="profile-pic-url" alt="Student" className="profile-pic" />
        <h2>Welcome,{username}!</h2> 
        <p>Your progress is looking great. Keep it up!</p>
      </div>

      <div className="overview-section">
        <h2>Dashboard Overview</h2>
        <div className="stats">
          <div className="stat">
            <h3>{totalQuizzesCount}</h3>  
            <p>Total Quizzes</p>
          </div>
          <div className="stat">
            <h3>{availableQuizzesCount}</h3>  
            <p>Available Quizzes</p>
          </div>
          <div className="stat">
            <h3>{completedQuizzesCount}</h3>  
            <p>Completed Quizzes</p>
          </div>
        </div>
      </div>

      <QuizList availableQuizzes={availableQuizzes} completedQuizzes={completedQuizzes} />
    </div>
  );
};

export default StudentDashboard;
