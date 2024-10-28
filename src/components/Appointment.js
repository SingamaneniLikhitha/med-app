// Appointment.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Import the date picker
import hospitalData from './hospitalData';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles
import './Appointment.css';

const Appointment = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    phone: '',
    hospital: '',
    appointmentDate: null,
    appointmentTime: ''
  });
  
  const navigate = useNavigate(); // Initialize useNavigate

  // Filter hospitals based on city and treatment
  const filterHospitals = () => {
    const cityData = hospitalData.find(data => data.city === selectedCity);
    if (cityData) {
      const hospitals = cityData.hospitals.filter(hospital =>
        selectedTreatment ? hospital.treatments.includes(selectedTreatment) : true
      );
      setFilteredHospitals(hospitals);
    } else {
      setFilteredHospitals([]);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedTreatment(''); // Reset treatment when city changes
    setFilteredHospitals([]); // Clear hospital list until re-filtered
  };

  const handleTreatmentChange = (e) => {
    setSelectedTreatment(e.target.value);
    filterHospitals(); // Update hospitals based on new treatment
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      appointmentDate: date
    }));
  };

  const handleTimeChange = (e) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      appointmentTime: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Phone number validation
    if (appointmentData.phone.length > 10) {
      alert('Phone number should not exceed 10 digits.');
      return;
    }

    // Save appointment data to localStorage
    const newAppointment = {
      ...appointmentData,
      bookingId: `BID-${Date.now()}`,
      appointmentDate: appointmentData.appointmentDate?.toLocaleDateString(),
      appointmentTime: appointmentData.appointmentTime
    };
    const existingAppointments = JSON.parse(localStorage.getItem('appointmentHistory')) || [];
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem('appointmentHistory', JSON.stringify(updatedAppointments));

    // Navigate to success screen
    navigate('/success'); // Use navigate to go to the success screen

    // Reset form and hospital list
    setAppointmentData({ name: '', phone: '', hospital: '', appointmentDate: null, appointmentTime: '' });
    setFilteredHospitals([]);
    setSelectedCity('');
    setSelectedTreatment('');
  };

  return (
    <div className="appointment-container">
      <h2>Book a Medical Appointment</h2>
      
      {/* City Selection */}
      <div>
        <label>Select City:</label>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">--Select City--</option>
          {hospitalData.map(data => (
            <option key={data.city} value={data.city}>{data.city}</option>
          ))}
        </select>
      </div>

      {/* Treatment Selection */}
      {selectedCity && (
        <div>
          <label>Select Treatment:</label>
          <select value={selectedTreatment} onChange={handleTreatmentChange}>
            <option value="">--Select Treatment--</option>
            {[...new Set(hospitalData.find(data => data.city === selectedCity)?.hospitals.flatMap(h => h.treatments))].map(treatment => (
              <option key={treatment} value={treatment}>{treatment}</option>
            ))}
          </select>
        </div>
      )}

      {/* Hospital Selection */}
      {filteredHospitals.length > 0 && (
        <div>
          <label>Select Hospital:</label>
          <select
            name="hospital"
            value={appointmentData.hospital}
            onChange={handleChange}
            required
          >
            <option value="">--Select Hospital--</option>
            {filteredHospitals.map(hospital => (
              <option key={hospital.name} value={hospital.name}>{hospital.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Appointment Date and Time */}
      <div>
        <label>Appointment Date:</label>
        <DatePicker
          selected={appointmentData.appointmentDate}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          required
        />
      </div>

      <div>
        <label>Appointment Time:</label>
        <input
          type="time"
          name="appointmentTime"
          value={appointmentData.appointmentTime}
          onChange={handleTimeChange}
          required
        />
      </div>

      {/* User Information */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={appointmentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={appointmentData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={!appointmentData.hospital}>Book Appointment</button>
      </form>
    </div>
  );
};

export default Appointment;
