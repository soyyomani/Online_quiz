import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes, completedQuizzes, setCompletedQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;  // Default export
export const useQuiz = () => useContext(QuizContext);
