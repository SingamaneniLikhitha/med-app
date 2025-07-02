import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();

  const defaultProfileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    contact: "+1234567890",
    profilePicture: "https://via.placeholder.com/120/e0e2e7/3f4a59?text=JD",
    insuranceProvider: "ABC Insurance",
    policyNumber: "123456789",
    upcomingAppointment: "2025-07-15, 10:00 AM (Dr. Smith)",
    recentReimbursements: [
      { id: 'R001', amount: '$500', date: '2025-06-28' },
      { id: 'R002', amount: '$120', date: '2025-06-15' },
    ],
    overallWellnessScore: 85,
  };

  const [profile, setProfile] = useState(() => {
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : defaultProfileData;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState(profile);

  useEffect(() => {
    if (isEditing) {
      setEditableProfile(profile);
    }
  }, [isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setEditableProfile(prev => ({ ...prev, profilePicture: imageURL }));
    }
  };

  const handleSaveClick = () => {
    setProfile(editableProfile);
    localStorage.setItem('userProfile', JSON.stringify(editableProfile));
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-screen-wrapper">
      <div className="main-profile-card">
        <div className="profile-picture-container">
          <img src={isEditing ? editableProfile.profilePicture : profile.profilePicture} alt="Profile" />
          {isEditing && (
            <div className="upload-picture-area">
              <label htmlFor="uploadImage">Upload New Picture</label>
              <input
                id="uploadImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <input
                type="text"
                name="profilePicture"
                value={editableProfile.profilePicture}
                onChange={handleChange}
                placeholder="or paste image URL"
                className="editable-input-sm"
              />
            </div>
          )}
        </div>

        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editableProfile.name}
              onChange={handleChange}
              className="editable-input"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={editableProfile.email}
              onChange={handleChange}
              className="editable-input"
              placeholder="Email"
            />
            <input
              type="tel"
              name="contact"
              value={editableProfile.contact}
              onChange={handleChange}
              className="editable-input"
              placeholder="Contact"
            />
          </>
        ) : (
          <>
            <h2>{profile.name}</h2>
            <p>Email: {profile.email}</p>
            <p>Contact: {profile.contact}</p>
          </>
        )}

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick} className="edit-profile-btn save-btn">Save</button>
              <button onClick={handleCancelClick} className="edit-profile-btn cancel-btn">Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="edit-profile-btn">Edit Profile</button>
          )}
        </div>
      </div>

      <div className="profile-widgets-grid">
        {/* Insurance Widget */}
        <div className="profile-widget-card">
          <h3>Insurance Information</h3>
          {isEditing ? (
            <>
              <input
                type="text"
                name="insuranceProvider"
                value={editableProfile.insuranceProvider}
                onChange={handleChange}
                className="editable-input-sm"
                placeholder="Insurance Provider"
              />
              <input
                type="text"
                name="policyNumber"
                value={editableProfile.policyNumber}
                onChange={handleChange}
                className="editable-input-sm"
                placeholder="Policy Number"
              />
            </>
          ) : (
            <>
              <p>Provider: {profile.insuranceProvider}</p>
              <p>Policy Number: {profile.policyNumber}</p>
            </>
          )}
          <button className="widget-link-btn" onClick={() => navigate('/settings')}>
            Manage Insurance
          </button>
        </div>

        {/* Appointments */}
        <div className="profile-widget-card" onClick={() => navigate('/appointment')}>
          <h3>Upcoming Appointment</h3>
          <p>{profile.upcomingAppointment || "No upcoming appointments"}</p>
          <button
            className="widget-link-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/appointment');
            }}
          >
            View All Appointments
          </button>
        </div>

        {/* Reimbursements */}
        <div className="profile-widget-card" onClick={() => navigate('/history')}>
          <h3>Recent Reimbursements</h3>
          {profile.recentReimbursements?.length > 0 ? (
            <ul>
              {profile.recentReimbursements.map((r) => (
                <li key={r.id}>
                  {r.date}: <strong>{r.amount}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent reimbursements.</p>
          )}
          <button
            className="widget-link-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/history');
            }}
          >
            View All History
          </button>
        </div>

        {/* Wellness Score */}
        <div className="profile-widget-card">
          <h3>MedWeLL Score</h3>
          <p>Your current wellness score:</p>
          <div className="wellness-score-display">
            <div className="score-circle">{profile.overallWellnessScore}</div>
            <p className="score-desc">Based on profile completion and activity.</p>
          </div>
          <button className="widget-link-btn" onClick={() => navigate('/health-insights')}>
            Improve My Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
