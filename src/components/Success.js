// Success.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Change this to useNavigate
import './Success.css';

const Success = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleBack = () => {
    navigate('/appointment'); // Use navigate to go back to appointment screen
  };

  return (
    <div className="success-container">
      <h2>Appointment Booked Successfully!</h2>
      <p>Your appointment has been booked successfully. Thank you!</p>
      <button onClick={handleBack}>Back to Appointment</button>
    </div>
  );
};

export default Success;
