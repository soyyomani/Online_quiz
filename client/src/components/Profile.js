// Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
 
  const userId = 'USER_ID';  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`https://online-quiz-backend-tp6d.onrender.com/api/profile/${userId}`);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      const response = await axios.put(`https://online-quiz-backend-tp6d.onrender.com/api/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        <h1>Profile</h1>
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
        {user.profilePicture && (
          <div className="profile-picture">
            <img src={user.profilePicture} alt="Profile" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
