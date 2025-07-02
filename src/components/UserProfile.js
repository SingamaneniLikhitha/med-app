import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; // This will be your new CSS file for the profile page

const UserProfile = ({ userProfileData }) => { // Assume userProfileData is passed as prop
  const navigate = useNavigate();

  // Dummy data for illustration. In a real app, this would come from props, API, or context.
  const defaultProfileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "+1234567890",
    profilePicture: "https://via.placeholder.com/120/e0e2e7/3f4a59?text=JD", // Placeholder image, you can replace with a real one
    insuranceProvider: "ABC Insurance",
    policyNumber: "123456789",
    upcomingAppointment: "2025-07-15, 10:00 AM (Dr. Smith)",
    recentReimbursements: [
      { id: 'R001', amount: '$500', date: '2025-06-28' },
      { id: 'R002', amount: '$120', date: '2025-06-15' },
    ],
    overallWellnessScore: 85, // Example for a potential wellness score
    // You can add more data points here relevant to MedWeLL
  };

  // Use passed data if available, otherwise use dummy data
  const profile = userProfileData || defaultProfileData;

  return (
    <div className="profile-screen-wrapper">
      <div className="main-profile-card">
        {/* Profile Picture and basic info */}
        <div className="profile-picture-container">
          {/* Placeholder or actual user image */}
          <img src={profile.profilePicture} alt="Profile" />
        </div>
        <h2>{profile.name}</h2>
        <p>Email: {profile.email}</p>
        <p>Contact: {profile.contact}</p>
        <button onClick={() => navigate('/settings')} className="edit-profile-btn">
          Edit Profile
        </button>
      </div>

      <div className="profile-widgets-grid">
        {/* Insurance Details Widget */}
        <div className="profile-widget-card" onClick={() => navigate('/insurance-details')}>
          <h3>Insurance Information</h3>
          <p>Provider: {profile.insuranceProvider}</p>
          <p>Policy Number: {profile.policyNumber}</p>
          <button className="widget-link-btn" onClick={(e) => { e.stopPropagation(); navigate('/settings'); }}>
            Manage Insurance
          </button>
        </div>

        {/* Upcoming Appointments Widget */}
        <div className="profile-widget-card" onClick={() => navigate('/appointment')}>
          <h3>Upcoming Appointment</h3>
          {profile.upcomingAppointment ? (
            <p>{profile.upcomingAppointment}</p>
          ) : (
            <p>No upcoming appointments.</p>
          )}
          <button className="widget-link-btn" onClick={(e) => { e.stopPropagation(); navigate('/appointment'); }}>
            View All Appointments
          </button>
        </div>

        {/* Recent Reimbursements Widget */}
        <div className="profile-widget-card" onClick={() => navigate('/history')}>
          <h3>Recent Reimbursements</h3>
          {profile.recentReimbursements && profile.recentReimbursements.length > 0 ? (
            <ul>
              {profile.recentReimbursements.map((r) => (
                <li key={r.id}>
                  <p>{r.date}: <strong>{r.amount}</strong></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent reimbursements.</p>
          )}
          <button className="widget-link-btn" onClick={(e) => { e.stopPropagation(); navigate('/history'); }}>
            View All History
          </button>
        </div>

        {/* Wellness/Health Snapshot Widget (example, can be customized) */}
        <div className="profile-widget-card">
            <h3>MedWeLL Score</h3>
            <p>Your current wellness score:</p>
            {/* This could be a dynamic circle chart or progress bar */}
            <div className="wellness-score-display" style={{ textAlign: 'center', margin: '15px 0' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#20a8d8', /* Primary blue */
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '2em',
                    fontWeight: 'bold',
                    margin: '0 auto',
                    boxShadow: '0 2px 8px rgba(32, 168, 216, 0.4)'
                }}>
                    {profile.overallWellnessScore}
                </div>
                <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#6c757d' }}>Based on profile completion and activity.</p>
            </div>
            <button className="widget-link-btn" onClick={(e) => { e.stopPropagation(); navigate('/health-insights'); }}>
                Improve My Score
            </button>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;