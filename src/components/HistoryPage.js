import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css'; // Import the CSS file

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const handleDelete = (serialNumber) => {
    const updatedHistory = history.filter(item => item.serialNumber !== serialNumber);
    localStorage.setItem('paymentHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const handleViewDetails = (serialNumber) => {
    navigate(`/history/${serialNumber}`); // Navigate to details page
  };

  return (
    <div className="history-container">
      <h2>Submission History</h2>
      {history.length === 0 ? (
        <p>No previous submissions found.</p>
      ) : (
        history.map((data) => (
          <div className="history-item" key={data.serialNumber}>
            <h3 onClick={() => handleViewDetails(data.serialNumber)}>{`Submission Serial: ${data.serialNumber}`}</h3>
            <p><strong>Full Name:</strong> {data.name}</p>
            <button onClick={() => handleDelete(data.serialNumber)} className="delete-button">Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryPage;
