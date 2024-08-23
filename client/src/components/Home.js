import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useAuth } from '../context/AuthContext';

const images = [
    '/images/pic0.jpg',
    '/images/pic1.jpg',
    '/images/pic3.jpg',
];

const Home = () => {
    const { isLoggedIn, user } = useAuth();

    useEffect(() => {
        let currentIndex = 0;
        const heroSection = document.querySelector('.hero-section');

        const changeBackgroundImage = () => {
            heroSection.style.backgroundImage = `url(${images[currentIndex]})`;
            currentIndex = (currentIndex + 1) % images.length;
        };

        changeBackgroundImage();
        const intervalId = setInterval(changeBackgroundImage, 3000);

        return () => clearInterval(intervalId);
    }, []);

    const getDashboardLink = () => {
        if (user?.role === 'admin') {
            return '/admin/dashboard';
        } else if (user?.role === 'student') {
            return '/student/dashboard';
        }
        return '/login';
    };

    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Online Quiz Maker</h1>
                    <p>Create and take quizzes with ease</p>
                    <div className="hero-buttons">
                        {!isLoggedIn && (
                            <Link to="/login" className="btn btn-secondary">Login</Link>
                        )}
                        <Link to={getDashboardLink()} className="btn">Get Started</Link>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h2>Features</h2>
                <div className="features">
                    <div className="feature-item">
                        <h3>Create Quizzes</h3>
                        <p>Easily create custom quizzes with various question types.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Take Quizzes</h3>
                        <p>Participate in quizzes and track your performance.</p>
                    </div>
                    <div className="feature-item">
                        <h3>Analyze Results</h3>
                        <p>Get detailed reports and analytics of quiz results.</p>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2>About Me</h2>
                <p>I provide an intuitive platform for creating and taking quizzes, making learning and assessment more engaging and effective.</p>
            </section>
        </div>
    );
};

export default Home;
