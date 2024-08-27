import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Quiz.css';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token
          }
        };

        const res = await axios.get('https://online-quiz-backend-tp6d.onrender.com/api/quiz/${id}`, config);
        setQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(''));
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleInputChange = (e, questionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      };

      const submissionData = {
        answers: answers.map((answer, index) => ({
          questionId: quiz.questions[index]._id,
          answer: answer.toString().trim()
        }))
      };

      const res = await axios.post(`https://online-quiz-backend-tp6d.onrender.com/api/quiz/${id}/submit`, submissionData, config);
      console.log(res.data);
      navigate(`/student/quiz/${id}/result`);
    } catch (err) {
      console.error('Error submitting quiz:', err.response?.data);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz">
      <h1>{quiz.title}</h1>
      <form onSubmit={onSubmit} className="quiz-form">
        {quiz.questions.map((question, index) => (
          <div key={index} className="question">
            <p>{question.questionText}</p>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option">
                <label>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value={optionIndex}
                    onChange={e => handleInputChange(e, index)}
                    required
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit Quiz</button>
      </form>
    </div>
  );
};

export default Quiz;
