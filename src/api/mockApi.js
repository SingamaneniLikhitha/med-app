// src/api/mockApi.js

export const checkPolicyEligibility = async (policyNumber) => {
    // Simulate an API call to check policy eligibility
    const eligiblePolicies = ['POLICY123', 'POLICY456']; // Example of eligible policy numbers
  
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(eligiblePolicies.includes(policyNumber));
      }, 1000); // Simulate network delay
    });
  };
  