import React from 'react';
import './NavBar.css';  // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/home')}>
        <h1>MedWeLL</h1>
      </div>
      <div className="navbar-links">
        <ul>
          <li onClick={() => navigate('/form')}>Reimburse</li>
          <li onClick={() => navigate('/appointment')}>Book an Appointment</li>
          <li onClick={() => navigate('/history')}>History</li>
          <li onClick={() => navigate('/profile')}>User Profile</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
