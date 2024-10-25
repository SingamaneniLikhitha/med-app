import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentScreen.css';

const PaymentScreen = ({ formData }) => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const generateSerialNumber = () => {
    return Math.floor(10000 + Math.random() * 90000); // Generates a unique 5-digit number
  };

  const handlePayment = () => {
    const isPaymentSuccessful = true; // Simulate payment success

    if (isPaymentSuccessful) {
      const serialNumber = generateSerialNumber(); // Generate a serial number
      const existingHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
      const updatedHistory = [...existingHistory, { ...formData, serialNumber }];
      localStorage.setItem('paymentHistory', JSON.stringify(updatedHistory));

      setNotification('Submitted successfully!'); // Set the notification message

      setTimeout(() => {
        setNotification(''); // Clear the notification after 3 seconds
      }, 3000);

      navigate('/history'); // Navigate to the history page
    } else {
      navigate('/failure'); // Navigate to failure page
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="payment-container">
      <button className="go-back-arrow" onClick={handleGoBack}>&larr; Back</button>
      <h2>Payment Information</h2>

      {/* Display Personal Information */}
      <div className="summary">
        <div className="summary-section">
          <h3>Personal Information</h3>
          <p><strong>Full Name:</strong> {formData.name}</p>
          <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Zip Code:</strong> {formData.zipCode}</p>
          <p><strong>Phone Number:</strong> {formData.phone}</p>
          <p><strong>Email:</strong> {formData.email}</p>
        </div>

        {/* Display Surgery Details */}
        <div className="summary-section">
          <h3>Surgery Details</h3>
          {formData.surgeries && formData.surgeries.length > 0 ? (
            formData.surgeries.map((surgery, index) => (
              <div key={index}>
                <p><strong>Surgery Name:</strong> {surgery.name}</p>
                <p><strong>Surgery Bill:</strong> ${surgery.bill}</p>
              </div>
            ))
          ) : (
            <p>No surgeries listed.</p>
          )}
        </div>

        {/* Display Insurance Information */}
        <div className="summary-section">
          <h3>Insurance Information</h3>
          <p><strong>Insurance Provider:</strong> {formData.insuranceProvider}</p>
          <p><strong>Policy Number:</strong> {formData.policyNumber}</p>
        </div>

        {/* Display Emergency Contact Information */}
        <div className="summary-section">
          <h3>Emergency Contact Information</h3>
          <p><strong>Full Name:</strong> {formData.emergencyContactName}</p>
          <p><strong>Phone Number:</strong> {formData.emergencyContactPhone}</p>
          <p><strong>Email:</strong> {formData.emergencyContactEmail}</p>
        </div>
      </div>

      <button onClick={handlePayment} className="pay-button">Submit</button>

      {/* Notification Popup */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
    </div>
  );
};

export default PaymentScreen;
