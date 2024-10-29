import React, { useState } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login'); // Redirect to login page
  };

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
          <li className="navbar-profile" onClick={handleDropdownToggle}>
            User Profile
            {showDropdown && (
              <div className="profile-dropdown">
                <button onClick={() => handleNavigate('/userprofile')}>View Full Profile</button>
                <button onClick={() => handleNavigate('/settings')}>Settings & Privacy</button>
                <button onClick={() => handleNavigate('/help')}>Help</button>
                <button>Language</button>
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
