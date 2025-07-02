import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormScreen.css';
import { checkPolicyEligibility } from '../api/mockApi'; // Assuming this is correct

const FormScreen = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedGender, setSelectedGender] = useState(formData.gender || '');
  // State for policy check message, now includes type for styling
  const [policyCheckMessage, setPolicyCheckMessage] = useState({ text: '', type: '' });

  // Surgery options based on gender
  const femaleSurgeries = [
    'Cesarean Section (C-Section)',
    'Hysterectomy',
    'Mastectomy',
    'Lumpectomy',
    'Ovarian Cystectomy',
    'Tubal Ligation',
    'Endometriosis Surgery',
    'Breast Reconstruction Surgery',
    'Dilation and Curettage (D&C)',
    'Myomectomy',
    'Pelvic Organ Prolapse Surgery',
  ];

  const maleSurgeries = [
    'Hernia Repair Surgery',
    'Prostate Surgery',
    'Circumcision',
    'Vasectomy',
    'Testicular Surgery',
    'Penile Prosthesis Surgery',
    'Varicocele Repair',
    'Orchiectomy',
  ];

  // INSURANCE PROVIDERS - Declared inside the component
  const insuranceProviders = [
    'UnitedHealthcare',
    'Aetna',
    'Blue Cross Blue Shield',
    'Cigna',
    'Kaiser Permanente',
    'Humana',
    'Allianz',
    'MetLife',
    'Liberty Mutual',
    'State Farm',
    'AXA',
  ];

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null && (name === 'name' || name === 'bill')) {
      const updatedSurgeries = [...formData.surgeries];
      updatedSurgeries[index][name] = value;
      setFormData({ ...formData, surgeries: updatedSurgeries });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear policy check message on any form change
    setPolicyCheckMessage({ text: '', type: '' });
  };

  const handleAddSurgery = () => {
    setFormData({
      ...formData,
      surgeries: [...formData.surgeries, { name: '', bill: '' }]
    });
  };

  const handleRemoveSurgery = (index) => {
    const updatedSurgeries = formData.surgeries.filter((_, i) => i !== index);
    setFormData({ ...formData, surgeries: updatedSurgeries });
  };

  const handleCheckPolicy = async () => {
    if (formData.policyNumber && formData.policyNumber.trim() !== '') {
      const isEligible = await checkPolicyEligibility(formData.policyNumber);
      if (isEligible) {
        setPolicyCheckMessage({ text: 'This policy number is eligible for reimbursement. ✅', type: 'success' });
      } else {
        setPolicyCheckMessage({ text: 'This policy number is not eligible for reimbursement. ❌', type: 'error' });
      }
    } else {
      setPolicyCheckMessage({ text: 'Please enter a policy number to check. ℹ️', type: 'info' });
    }
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    setFormData({ ...formData, gender: e.target.value });
  };

  const validateForm = useCallback(() => {
    const requiredFields = [
      'name',
      'dateOfBirth',
      'gender',
      'phone',
      'insuranceProvider',
      'policyNumber',
      'emergencyContactName',
      'emergencyContactPhone'
    ];

    const isAllFieldsFilled = requiredFields.every(
      (field) => formData[field] && String(formData[field]).trim() !== ''
    );

    const areSurgeriesValid = formData.surgeries.length > 0 && formData.surgeries.every(
      (surgery) => surgery.name && surgery.bill && String(surgery.bill).trim() !== ''
    );

    return isAllFieldsFilled && areSurgeriesValid;
  }, [formData]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData, validateForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/payment');
    } else {
      // Set a general error message if form is not valid on submission
      setPolicyCheckMessage({ text: 'Please fill in all required fields correctly.', type: 'error' });
    }
  };

  const getSurgeryOptions = () => {
    if (selectedGender === 'Female') {
      return femaleSurgeries;
    } else if (selectedGender === 'Male') {
      return maleSurgeries;
    }
    return [];
  };

  return (
    <div className="form-screen-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Patient Information</h2>

        {/* Patient Personal Info Section */}
        <div className="form-section">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            name="name"
            placeholder="e.g., John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />

          <div className="gender-group">
            <label>Gender:</label>
            <label htmlFor="genderMale">
              <input
                id="genderMale"
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleGenderChange}
                required
              /> Male
            </label>
            <label htmlFor="genderFemale">
              <input
                id="genderFemale"
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleGenderChange}
                required
              /> Female
            </label>
          </div>

          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Street, City, State"
            value={formData.address}
            onChange={handleChange}
          />
          
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="text"
            name="zipCode"
            placeholder="e.g., 12345"
            value={formData.zipCode}
            onChange={handleChange}
          />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            name="phone"
            placeholder="e.g., (123) 456-7890"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="emailAddress">Email</label>
          <input
            id="emailAddress"
            type="email"
            name="email"
            placeholder="e.g., john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <h3>Surgery Details</h3>
        <div className="form-section">
          {formData.surgeries.length === 0 && (
            <p className="no-surgeries-message">Click "Add Surgery" to enter details.</p>
          )}
          {formData.surgeries.map((surgery, index) => (
            <div key={index} className="surgeries-container">
              <label htmlFor={`surgeryName-${index}`} className="sr-only">Surgery Name {index + 1}</label>
              <select
                id={`surgeryName-${index}`}
                name="name"
                value={surgery.name}
                onChange={(e) => handleChange(e, index)}
                required
              >
                <option value="">Select Surgery</option>
                {getSurgeryOptions().map((surgeryOption, i) => (
                  <option key={i} value={surgeryOption}>
                    {surgeryOption}
                  </option>
                ))}
              </select>
              <label htmlFor={`surgeryBill-${index}`} className="sr-only">Surgery Bill {index + 1}</label>
              <input
                id={`surgeryBill-${index}`}
                type="number"
                name="bill"
                placeholder="Surgery Bill Amount"
                value={surgery.bill}
                onChange={(e) => handleChange(e, index)}
                required
                min="0"
              />
              {formData.surgeries.length > 0 && (
                <button type="button" onClick={() => handleRemoveSurgery(index)} className="remove-button">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddSurgery} className="secondary">
            Add Another Surgery
          </button>
        </div>

        <h3>Insurance Information</h3>
        <div className="form-section">
          <label htmlFor="insuranceProvider">Insurance Provider</label>
          <select
            id="insuranceProvider"
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleChange}
            required
          >
            <option value="">Select Insurance Provider</option>
            {insuranceProviders.map((provider, i) => (
              <option key={i} value={provider}>
                {provider}
              </option>
            ))}
          </select>

          <label htmlFor="policyNumber">Policy Number</label>
          <input
            id="policyNumber"
            type="text"
            name="policyNumber"
            placeholder="e.g., ABC1234567"
            value={formData.policyNumber}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleCheckPolicy} className="secondary">
            Check Policy
          </button>
          {policyCheckMessage.text && ( // Only render if there's a message
            <p className={`policy-message ${policyCheckMessage.type}`}>
              {policyCheckMessage.text}
            </p>
          )}
        </div>

        <h3>Emergency Contact Information</h3>
        <div className="form-section">
          <label htmlFor="emergencyContactName">Full Name</label>
          <input
            id="emergencyContactName"
            type="text"
            name="emergencyContactName"
            placeholder="Emergency Contact Name"
            value={formData.emergencyContactName}
            onChange={handleChange}
            required
          />
          <label htmlFor="emergencyContactPhone">Phone Number</label>
          <input
            id="emergencyContactPhone"
            type="tel"
            name="emergencyContactPhone"
            placeholder="Emergency Contact Phone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
            required
          />
          <label htmlFor="emergencyContactEmail">Email</label>
          <input
            id="emergencyContactEmail"
            type="email"
            name="emergencyContactEmail"
            placeholder="Emergency Contact Email (Optional)"
            value={formData.emergencyContactEmail}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={!isFormValid}>
          Next
        </button>
      </form>
    </div>
  );
};

export default FormScreen;