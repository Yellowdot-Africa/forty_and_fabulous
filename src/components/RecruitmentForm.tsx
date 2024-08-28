import React, { useState } from 'react';
import TextInput from './TextInput';
import { addUser } from '../api/apiService';

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    occupation: '',
    maritalStatus: '',
    phoneNumber: '',
    email: '',
    city: '',
    socialMedia: '',
    medicalConditions: '',
    realityTVExperience:'',
    mediaConsent: '',
    declaration: '',
  });
  const [error, setError] = useState<string | null>(null);

  const nextStep = () => {
    // Validate the current step before moving to the next
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const previousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const validateCurrentStep = () => {
    // Validate fields based on the current step
    switch (currentStep) {
      case 1:
        return (
          formData.fullName &&
          formData.dateOfBirth &&
          formData.occupation &&
          formData.maritalStatus
        );
      case 2:
        return (
          formData.phoneNumber &&
          formData.email &&
          formData.city &&
          formData.socialMedia
        );
      case 3:
        return formData.medicalConditions && formData.realityTVExperience;
      case 4:
        return formData.mediaConsent && formData.declaration;
      default:
        return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('You must be logged in to submit the form.');
      return;
    }

    try {
      const data = await addUser(formData, authToken);

      if (data.status === 201) {
        alert('Form submitted successfully!');
      }
      console.log(data)
    } catch (error: any) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="rounded-lg shadow-lg px-4 py-8 w-full bg-white">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/** Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
              <TextInput label="Full Name" name="fullName" required value={formData.fullName} onChange={handleInputChange} />
              <TextInput label="Date of Birth" name="dateOfBirth" type="date" required value={formData.dateOfBirth} onChange={handleInputChange} />
              <TextInput label="Occupation" name="occupation" required value={formData.occupation} onChange={handleInputChange} />
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Marital Status<span className="text-red-500"> *</span></label>
                <div className="flex flex-col space-y-2">
                  <label><input type="radio" name="maritalStatus" value="Single" required onChange={handleInputChange} /> Single</label>
                  <label><input type="radio" name="maritalStatus" value="Married" onChange={handleInputChange} /> Married</label>
                  <label><input type="radio" name="maritalStatus" value="Widowed" onChange={handleInputChange} /> Widowed</label>
                  <label><input type="radio" name="maritalStatus" value="Divorced" onChange={handleInputChange} /> Divorced</label>
                  <label><input type="radio" name="maritalStatus" value="Separated" onChange={handleInputChange} /> Separated</label>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={nextStep} className="bg-red-700 text-white px-4 py-2 rounded-md">
                  Next
                </button>
              </div>
            </div>
          )}

          {/** Step 2: Contact Information */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <TextInput label="Phone Number" name="phoneNumber" type="tel" required value={formData.phoneNumber} onChange={handleInputChange} />
              <TextInput label="Email Address" name="email" type="email" required value={formData.email} onChange={handleInputChange} />
              <TextInput label="City/State" name="city" required value={formData.city} onChange={handleInputChange} />
              <TextInput label="Social Media Handles" name="socialMedia" required value={formData.socialMedia} onChange={handleInputChange} />
              <div className="flex justify-between">
                <button type="button" onClick={previousStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
                <button type="button" onClick={nextStep} className="bg-red-700 text-white px-4 py-2 rounded-md">
                  Next
                </button>
              </div>
            </div>
          )}

          {/** Step 3: Health, Experience, and Declaration */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Health and Lifestyle</h3>
              <div className="mb-10">
                <label className="block text-sm font-bold mb-2">Any medical conditions?<span className="text-red-500"> *</span></label>
                <div className="flex flex-col space-y-2">
                  <label><input type="radio" name="medicalConditions" value="Yes" required onChange={handleInputChange} /> Yes</label>
                  <label><input type="radio" name="medicalConditions" value="No" onChange={handleInputChange} /> No</label>
                </div>
              </div>
              <TextInput label="Previous reality TV experience (if any)" name="realityTVExperience" value={formData.realityTVExperience} onChange={handleInputChange} />
              <div className="flex justify-between">
                <button type="button" onClick={previousStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
                <button type="button" onClick={nextStep} className="bg-red-700 text-white px-4 py-2 rounded-md">
                  Next
                </button>
              </div>
            </div>
          )}

          {/** Step 4: Media Consent and Declaration */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Media Consent</h3>
              <div className="mb-10">
                <label className="block text-sm font-bold mb-2">Do you consent to being filmed and broadcasted?<span className="text-red-500"> *</span></label>
                <div className="flex flex-col space-y-2">
                  <label><input type="radio" name="mediaConsent" value="Yes" required onChange={handleInputChange} /> Yes</label>
                  <label><input type="radio" name="mediaConsent" value="No" onChange={handleInputChange} /> No</label>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Declaration</h3>
              <TextInput label="I confirm that the information provided is accurate. (Enter your full name and submit form)" name="declaration" required value={formData.declaration} onChange={handleInputChange} />

              <div className="flex justify-between">
                <button type="button" onClick={previousStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
                <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded-md">
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
