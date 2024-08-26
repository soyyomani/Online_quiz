import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const body = JSON.stringify({ email, password });
      const res = await axios.post('https://online-quiz-backend-tp6d.onrender.com/api/auth/login', body, config);
  
      console.log('Login successful:', res.data);
      const { token, user } = res.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate(user.role === 'admin' ? 'https://online-quiz-backend-tp6d.onrender.com/admin/dashboard' : 'https://online-quiz-backend-tp6d.onrender.com/student/dashboard');
       
    } catch (err) {
      console.error('Error during login:', err.response.data);
    }
  };
  
   
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? 
        <button type="button" onClick={() => navigate('https://online-quiz-app-1tzo.onrender.com/register')} className="link-button">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;
