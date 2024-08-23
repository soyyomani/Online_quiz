import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, user, logoutUser } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">QuizApp</Link>
      </div>
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            {user.role === 'admin' ? (
              <>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
                <Link to="/admin/quiz/new">Create Quiz</Link>
                <Link to="/profile">Profile</Link>
              </>
            ) : user.role === 'student' ? (
              <>
                <Link to="/student/dashboard">Student Dashboard</Link>
                <Link to="/student/quizzes">Available Quizzes</Link>
                <Link to="/profile">Profile</Link>
              </>
            ) : null}
            <button onClick={logoutUser} className="btn logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
