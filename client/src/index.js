import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from './context/AuthContext';  // Default import
import {QuizProvider} from './context/QuizContext';  // Default import

ReactDOM.render(
  <AuthProvider>
    <QuizProvider>
      <App />
    </QuizProvider>
  </AuthProvider>,
  document.getElementById('root')
);
