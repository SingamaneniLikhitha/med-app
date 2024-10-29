import React from 'react';
import './UserProfile.css';

function UserProfile() {
    return (
        <div className="user-profile">
            <div className="profile-overview">
                <img className="profile-pic" src="profile-pic-placeholder.png" alt="Profile Picture" />
                <h1>John Doe</h1>
                <p>Email: john.doe@example.com</p>
                <p>Contact: +1234567890</p>
                <button>Edit Profile</button>
            </div>

            <div className="insurance-info">
                <h2>Insurance Information</h2>
                <p>Provider: ABC Insurance</p>
                <p>Policy Number: 123456789</p>
            </div>
        </div>
    );
}

export default UserProfile;
