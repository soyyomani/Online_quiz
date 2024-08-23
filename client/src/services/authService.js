import axios from 'axios';

const register = async userData => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(userData);
  const res = await axios.post('/api/auth/register', body, config);
  return res.data;
};

const login = async userData => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(userData);
  const res = await axios.post('/api/auth/login', body, config);
  return res.data;
};

const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token
      }
    };
    const res = await axios.get('http://localhost:4020/api/auth/user', config);
    return res.data; // Return the user data
  } catch (err) {
    throw new Error('Error fetching user details: ' + (err.response ? err.response.data : err.message));
  }
};

const authService = {
  register,
  login,
  fetchUserDetails
};

export default authService;
