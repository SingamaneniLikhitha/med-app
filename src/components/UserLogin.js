// UserLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';

const UserLogin = ({ onSignIn }) => {
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = () => {
    if (userCredentials.username === 'user' && userCredentials.password === 'user123') {
      onSignIn({ username: userCredentials.username });
      navigate('/home');
    } else {
      setError('Invalid user credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>User Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={userCredentials.username}
          onChange={(e) => setUserCredentials({ ...userCredentials, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userCredentials.password}
          onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleUserLogin}>Login as User</button>
      </div>
    </div>
  );
};

export default UserLogin;
