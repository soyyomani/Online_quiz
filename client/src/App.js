// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navfoot/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import QuizForm from './components/QuizForm';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Profile from './components/Profile';
import Footer from './navfoot/Footer';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import PrivateRoute from './utils/PrivateRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <div className="app-container">
          <Router>
            <Navbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<PrivateRoute role="admin" />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="quiz/new" element={<QuizForm />} />
                </Route>
                <Route path="/student/*" element={<PrivateRoute role="student" />}>
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="quizzes" element={<QuizList />} />
                  <Route path="quiz/:id" element={<Quiz />} />
                  <Route path="quiz/:id/result" element={<Result />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
