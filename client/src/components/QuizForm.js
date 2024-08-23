import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import quizService from '../services/quizService';
import './QuizForm.css';

const QuizForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    questions: [
      { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
    ]
  });

  const { title, questions } = formData;
  const navigate = useNavigate(); 

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };
  
  const handleCorrectAnswerChange = (e, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = parseInt(e.target.value);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]
    });
  };

  const removeQuestion = index => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await quizService.createQuiz(formData);
      console.log(res);
      navigate('/admin/dashboard');  
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="quiz-form-container">
      <h1>Create a New Quiz</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Quiz Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="Enter quiz title"
          />
        </div>

        {questions.map((question, index) => (
          <div key={index} className="question-group">
            <label htmlFor={`questionText-${index}`}>Question {index + 1}:</label>
            <input
              id={`questionText-${index}`}
              type="text"
              name="questionText"
              value={question.questionText}
              onChange={e => handleInputChange(e, index)}
              required
              placeholder="Enter question text"
            />
            
            <label>Options:</label>
            <div className="options-group">
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  value={option}
                  onChange={e => handleOptionChange(e, index, optionIndex)}
                  required
                  placeholder={`Option ${optionIndex + 1}`}
                />
              ))}
            </div>

            <label htmlFor={`correctAnswer-${index}`}>Correct Answer (index):</label>
            <input
              id={`correctAnswer-${index}`}
              type="number"
              name="correctAnswer"
              value={question.correctAnswer}
              onChange={e => handleCorrectAnswerChange(e, index)}
              required
              min="0"
              max="3"
              placeholder="Index of the correct answer"
            />
            
            <button type="button" className="remove-btn" onClick={() => removeQuestion(index)}>Remove Question</button>
          </div>
        ))}

        <button type="button" className="add-btn" onClick={addQuestion}>Add Question</button>
        <button type="submit" className="submit-btn">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;
