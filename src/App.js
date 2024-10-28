import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormScreen from './components/FormScreen';
import PaymentScreen from './components/PaymentScreen';
import HomePage from './components/HomePage'; 
import NavBar from './components/NavBar';
import HistoryPage from './components/HistoryPage'; 
import DetailsPage from './components/DetailsPage'; 
import Appointment from './components/Appointment'; // Import Appointment component
import Success from './components/Success'; // Adjust the path as necessary

import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    zipCode: '',
    phone: '',
    email: '',
    surgeries: [{ name: '', bill: '' }],
    insuranceProvider: '',
    policyNumber: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactEmail: ''
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const [user, setUser] = useState(null);  // User state for authentication

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData); // Store user data on sign-in
  };

  const handleSignOut = () => {
    setUser(null); // Clear user data on sign-out
  };

  return (
    <Router>
      <div className={`app-container ${scrollPosition > 100 ? 'scrolled' : ''}`}>
        <NavBar user={user} onSignOut={handleSignOut} onSignIn={handleSignIn} />  {/* Use NavBar component */}

        <Routes>
          {/* Redirect from root path to /home */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/form" element={<FormScreen formData={formData} setFormData={setFormData} />} />
          <Route path="/payment" element={<PaymentScreen formData={formData} />} />
          <Route path="/success" element={<Success />} /> {/* Changed from component to element */}
          <Route path="/history" element={<HistoryPage />} /> {/* Add the history route */}
          <Route path="/history/:serialNumber" element={<DetailsPage />} /> {/* Details route */}
          <Route path="/appointment" element={<Appointment />} /> {/* Appointment route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
