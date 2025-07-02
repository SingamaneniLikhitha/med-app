import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
    

      <div className="hero">
        <h1>Welcome to <span>MedWeLL</span></h1>
        <p>Your trusted partner in medical insurance and care.</p>
      </div>

      <section className="info-section">
        <div className="info-box">
          <h2>Insurance Plans</h2>
          <p>Explore a variety of insurance plans with full coverage for surgeries and treatments.</p>
        </div>
        <div className="info-box">
          <h2>Medical Care</h2>
          <p>Get access to top-notch care from our trusted hospital and doctor network.</p>
        </div>
      </section>

      <section className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-box">
          <p>“MedWeLL helped me get my claim processed in just 3 days!”</p>
          <span>- Sneha Reddy, Bangalore</span>
        </div>
        <div className="testimonial-box">
          <p>“Booking appointments is so easy and the partner hospitals are top-notch.”</p>
          <span>- Ravi Kumar</span>
        </div>
      </section>

      <section className="tips-section">
        <h2>Health Tips & Insights</h2>
        <div className="tips-boxes">
          <div className="tip">
            <h3>Choosing the Right Health Plan</h3>
            <p>Not sure which insurance plan suits you? Here are 5 key points to consider.</p>
          </div>
          <div className="tip">
            <h3>Post-Surgery Nutrition</h3>
            <p>Recover faster with these tips that promote healing after major surgeries.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
