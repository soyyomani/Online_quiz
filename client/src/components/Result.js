import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../services/quizService';
import './Result.css';

const Result = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const fetchedResult = await quizService.fetchResult(id);
        console.log('Fetched Result:', fetchedResult); // Debugging
        setResult(fetchedResult);
        setError('');  
      } catch (err) {
        console.error('Error fetching quiz result:', err);
        setError('Failed to fetch quiz result. Please try again.');
      }
    };

    fetchResult();
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!result) {
    return <div>Loading...</div>;
  }

  const { quizTitle, score, totalQuestions, feedback } = result;

  let emoji;
  let emojiClass;

  if (feedback.includes('all questions correctly')) { // Flexible feedback matching
    emoji = '😄';
    emojiClass = 'happy';
  } else if (feedback.includes('passed the quiz')) { // Flexible feedback matching
    emoji = '😊';
    emojiClass = 'neutral';
  } else {
    emoji = '😞';
    emojiClass = 'sad';
  }

  return (
    <div className="result-container">
      <h1>Quiz Result</h1>
      <h2>{quizTitle}</h2>
      <p>Score: {score} / {totalQuestions}</p>
      <p>{feedback}</p>
      <span className={`emoji ${emojiClass}`}>{emoji}</span>
    </div>
  );
};

export default Result;
