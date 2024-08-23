import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const images = [
  '/images/reg2.jpg',
  '/images/reg3.jpg',
  '/images/reg4.jpg',
];

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: '',
    sex: ''
  });

  const navigate = useNavigate();

  const { username, email, phone, role, password, confirmPassword, sex } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('http://localhost:4020/api/auth/register', formData);
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error('Error', err.message);
      }
    }
  };

  useEffect(() => {
    let currentIndex = 0;
    const imageSection = document.querySelector('.image-section');
    const images = imageSection.querySelectorAll('img');

    const changeImage = () => {
      images.forEach((img, index) => {
        img.classList.remove('active');
        if (index === currentIndex) {
          img.classList.add('active');
        }
      });
      currentIndex = (currentIndex + 1) % images.length;
    };

    changeImage();
    const intervalId = setInterval(changeImage, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="register-container">
      <div className="image-section">
        {images.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`Slide ${index}`} />
        ))}
      </div>
      <div className="register-form">
        <h2 className="register-header">Register Here</h2>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
          <input type="text" name="phone" value={phone} onChange={onChange} placeholder="Phone Number" required />
          <select name="role" value={role} onChange={onChange} required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirm Password" required />
          <select name="sex" value={sex} onChange={onChange} required>
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
          <button type="submit">Register</button>
          <div className="text">
            <a href="/login">Already have an account? Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
