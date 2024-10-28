// HistoryPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryPage.css';

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState('payment'); // Set default tab to "payment"
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load payment history from localStorage
    const storedPaymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
    setPaymentHistory(storedPaymentHistory);

    // Load appointment history from localStorage
    const storedAppointmentHistory = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
    setAppointmentHistory(storedAppointmentHistory);
  }, []);

  const handleDelete = (id, type) => {
    if (type === 'payment') {
      const updatedHistory = paymentHistory.filter(item => item.serialNumber !== id);
      localStorage.setItem('paymentHistory', JSON.stringify(updatedHistory));
      setPaymentHistory(updatedHistory);
    } else if (type === 'appointment') {
      const updatedHistory = appointmentHistory.filter(item => item.bookingId !== id);
      localStorage.setItem('appointmentHistory', JSON.stringify(updatedHistory));
      setAppointmentHistory(updatedHistory);
    }
  };

  const handleViewDetails = (id, type) => {
    if (type === 'payment') {
      navigate(`/history/${id}`); // Navigate to payment details page
    } else if (type === 'appointment') {
      navigate(`/appointment/history/${id}`); // Navigate to appointment details page
    }
  };

  return (
    <div className="history-container">
      <h2>Submission History</h2>
      
      {/* Tabs for switching between payment and appointment histories */}
      <div className="tab-buttons">
        <button 
          className={activeTab === 'payment' ? 'active' : ''} 
          onClick={() => setActiveTab('payment')}
        >
          Payment History
        </button>
        <button 
          className={activeTab === 'appointment' ? 'active' : ''} 
          onClick={() => setActiveTab('appointment')}
        >
          Appointment History
        </button>
      </div>

      {/* Display Payment History or Appointment History based on active tab */}
      {activeTab === 'payment' ? (
        <div className="history-list">
          {paymentHistory.length === 0 ? (
            <p>No payment submissions found.</p>
          ) : (
            paymentHistory.map((data) => (
              <div className="history-item" key={data.serialNumber}>
                <h3 onClick={() => handleViewDetails(data.serialNumber, 'payment')}>
                  {`Submission Serial: ${data.serialNumber}`}
                </h3>
                <p><strong>Full Name:</strong> {data.name}</p>
                <button 
                  onClick={() => handleDelete(data.serialNumber, 'payment')} 
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="history-list">
          {appointmentHistory.length === 0 ? (
            <p>No appointment bookings found.</p>
          ) : (
            appointmentHistory.map((data) => (
              <div className="history-item" key={data.bookingId}>
                <h3 onClick={() => handleViewDetails(data.bookingId, 'appointment')}>
                  {`Booking ID: ${data.bookingId}`}
                </h3>
                <p><strong>Full Name:</strong> {data.name}</p>
                <p><strong>Phone Number:</strong> {data.phone}</p>
                <button 
                  onClick={() => handleDelete(data.bookingId, 'appointment')} 
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
