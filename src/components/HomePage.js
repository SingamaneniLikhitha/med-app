import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-content">
      <h1>Welcome to MedWeLL</h1>
      <p>Your trusted partner in medical insurance and care.</p>
      <section className="info-section">
        <div className="info-box">
          <h2>Insurance Plans</h2>
          <p>Explore a variety of insurance plans that provide full coverage for surgeries and medical treatments.</p>
        </div>
        <div className="info-box">
          <h2>Medical Care</h2>
          <p>Get the best medical care with our network of trusted hospitals and doctors.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
