// UserLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleUserLogin = () => {
    if (userCredentials.username === 'user' && userCredentials.password === 'user123') {
      // Navigate to the user home page after successful login
      navigate('/user');
    } else {
      alert('Invalid user credentials');
    }
  };

  return (
    <div>
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
      <button onClick={handleUserLogin}>Login as User</button>
    </div>
  );
};

export default UserLogin;
