// src/components/UserProfileDropdown.js
import React, { useState } from 'react';

const UserProfileDropdown = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="user-profile-dropdown">
      <button onClick={toggleDropdown}>
        {user.name || 'User Profile'} <span>&#x25BC;</span>
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {user ? (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={onSignOut}>Sign Out</button>
            </>
          ) : (
            <p>Please Sign In</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
