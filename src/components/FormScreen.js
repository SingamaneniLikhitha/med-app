import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormScreen.css';
import { checkPolicyEligibility } from '../api/mockApi';

const FormScreen = ({ formData, setFormData }) => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedGender, setSelectedGender] = useState(formData.gender || '');

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

  // Insurance providers list
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
    if (formData.policyNumber) {
      const isEligible = await checkPolicyEligibility(formData.policyNumber);
      if (isEligible) {
        alert('This policy number is eligible for reimbursement.');
      } else {
        alert('This policy number is not eligible for reimbursement.');
      }
    } else {
      alert('Please enter a policy number.');
    }
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    setFormData({ ...formData, gender: e.target.value });
  };

  // Validate form
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
      (field) => formData[field] && formData[field].trim() !== ''
    );

    const areSurgeriesValid = formData.surgeries.every(
      (surgery) => surgery.name && surgery.bill
    );

    return isAllFieldsFilled && areSurgeriesValid;
  }, [formData]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData, validateForm]);

  const handleSubmit = () => {
    if (isFormValid) {
      navigate('/payment');
    }
  };

  // Get the appropriate surgery list based on gender selection
  const getSurgeryOptions = () => {
    if (selectedGender === 'Female') {
      return femaleSurgeries;
    } else if (selectedGender === 'Male') {
      return maleSurgeries;
    }
    return [];
  };

  return (
    <div>
      <h2>Patient Information</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <label>
          Gender:
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleGenderChange}
          /> Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleGenderChange}
          /> Female
        </label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <h3>Surgery Details</h3>
        {formData.surgeries.map((surgery, index) => (
          <div key={index} className="surgeries-container">
            <select
              name="name"
              value={surgery.name}
              onChange={(e) => handleChange(e, index)}
            >
              <option value="">Select Surgery</option>
              {getSurgeryOptions().map((surgeryOption, i) => (
                <option key={i} value={surgeryOption}>
                  {surgeryOption}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="bill"
              placeholder="Surgery Bill"
              value={surgery.bill}
              onChange={(e) => handleChange(e, index)}
            />
            {formData.surgeries.length > 1 && (
              <button type="button" onClick={() => handleRemoveSurgery(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddSurgery}>
          Add Another Surgery
        </button>

        <h3>Insurance Information</h3>
        <div className="surgeries-container">
          <select
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleChange}
          >
            <option value="">Select Insurance Provider</option>
            {insuranceProviders.map((provider, i) => (
              <option key={i} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="policyNumber"
          placeholder="Policy Number"
          value={formData.policyNumber}
          onChange={handleChange}
        />
        <button type="button" onClick={handleCheckPolicy}>
          Check Policy
        </button>

        <h3>Emergency Contact Information</h3>
        <input
          type="text"
          name="emergencyContactName"
          placeholder="Full Name"
          value={formData.emergencyContactName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="emergencyContactPhone"
          placeholder="Phone Number"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="emergencyContactEmail"
          placeholder="Email"
          value={formData.emergencyContactEmail}
          onChange={handleChange}
        />

        <button type="button" onClick={handleSubmit} disabled={!isFormValid}>
          Next
        </button>
      </form>
    </div>
  );
};

export default FormScreen;
