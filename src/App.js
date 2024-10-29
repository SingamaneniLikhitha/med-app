import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FormScreen from './components/FormScreen';
import PaymentScreen from './components/PaymentScreen';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import HistoryPage from './components/HistoryPage';
import DetailsPage from './components/DetailsPage';
import Appointment from './components/Appointment';
import Success from './components/Success';
import UserProfile from './components/UserProfile';
import UserLogin from './components/UserLogin';
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
    localStorage.setItem('isLoggedIn', 'true'); // Save login state in localStorage
  };

  const handleSignOut = () => {
    setUser(null); // Clear user data on sign-out
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
  };

  return (
    <Router>
      <div className={`app-container ${scrollPosition > 100 ? 'scrolled' : ''}`}>
        <NavBar user={user} onSignOut={handleSignOut} /> {/* Pass user and sign-out handler */}

        <Routes>
          {/* Redirect from root path to /home if logged in, or to /login if not */}
          <Route
            path="/"
            element={<Navigate to={user ? "/home" : "/login"} replace />}
          />

          {/* Public Routes */}
          <Route path="/login" element={<UserLogin onSignIn={handleSignIn} />} /> {/* Pass onSignIn to UserLogin */}

          {/* Private Routes - accessible only if logged in */}
          {user && (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/form" element={<FormScreen formData={formData} setFormData={setFormData} />} />
              <Route path="/payment" element={<PaymentScreen formData={formData} />} />
              <Route path="/success" element={<Success />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/history/:serialNumber" element={<DetailsPage />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/userprofile" element={<UserProfile />} />
            </>
          )}

          {/* Redirect any undefined routes */}
          <Route path="*" element={<Navigate to={user ? "/home" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
