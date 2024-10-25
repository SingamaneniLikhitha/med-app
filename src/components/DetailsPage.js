import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css'; // Import the new CSS file

const DetailsPage = () => {
  const { serialNumber } = useParams();
  const [submission, setSubmission] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    const foundSubmission = storedHistory.find(item => item.serialNumber === Number(serialNumber));
    setSubmission(foundSubmission);
  }, [serialNumber]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!submission) {
    return <p>No submission found.</p>;
  }

  return (
    <div className="details-container">
      <button className="go-back-arrow" onClick={handleGoBack}>&larr; Back</button>
      <h2>Submission Details</h2>

      <div className="details-section">
        <h3>Personal Information</h3>
        <p><strong>Full Name:</strong> {submission.name}</p>
        <p><strong>Date of Birth:</strong> {submission.dateOfBirth}</p>
        <p><strong>Gender:</strong> {submission.gender}</p>
        <p><strong>Address:</strong> {submission.address}</p>
        <p><strong>Zip Code:</strong> {submission.zipCode}</p>
        <p><strong>Phone Number:</strong> {submission.phone}</p>
        <p><strong>Email:</strong> {submission.email}</p>
      </div>

      <div className="details-section">
        <h3>Surgery Details</h3>
        {submission.surgeries && submission.surgeries.length > 0 ? (
          submission.surgeries.map((surgery, idx) => (
            <div key={idx}>
              <p><strong>Surgery Name:</strong> {surgery.name}</p>
              <p><strong>Surgery Bill:</strong> ${surgery.bill}</p>
            </div>
          ))
        ) : (
          <p>No surgeries listed.</p>
        )}
      </div>

      <div className="details-section">
        <h3>Insurance Information</h3>
        <p><strong>Insurance Provider:</strong> {submission.insuranceProvider}</p>
        <p><strong>Policy Number:</strong> {submission.policyNumber}</p>
      </div>

      <div className="details-section">
        <h3>Emergency Contact Information</h3>
        <p><strong>Full Name:</strong> {submission.emergencyContactName}</p>
        <p><strong>Phone Number:</strong> {submission.emergencyContactPhone}</p>
        <p><strong>Email:</strong> {submission.emergencyContactEmail}</p>
      </div>
    </div>
  );
};

export default DetailsPage;
