import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [recentComments, setRecentComments] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token
          }
        };

        const quizRes = await axios.get('http://localhost:4020/api/quiz', config);
        setQuizzes(quizRes.data);

        const analyticsRes = await axios.get('http://localhost:4020/api/quiz/analytics', config);
        setAnalytics(analyticsRes.data);

        const commentsRes = await axios.get('http://localhost:4020/api/quiz/comments', config);
        setRecentComments(commentsRes.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-overview">
        <div className="overview-item">
          <h2>Quiz Created</h2>
          <p>{quizzes.length} Quizzes</p>
        </div>
        <div className="overview-item">
          <h2>Quiz Analytics</h2>
          <p>Percentage Completion: {analytics.percentage}%</p>
        </div>
        <div className="overview-item">
          <h2>Recent Comments</h2>
          <ul>
            {recentComments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link to="/admin/create-quiz" className="create-quiz-btn">
        Create New Quiz
      </Link>
    </div>
  );
};

export default AdminDashboard;
