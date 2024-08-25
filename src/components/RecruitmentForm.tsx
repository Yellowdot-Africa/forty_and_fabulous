import React, { useState } from 'react';
import TextInput from './TextInput';

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const previousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Form submitted successfully!');
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="rounded-lg shadow-lg px-4 py-8 w-full bg-white">

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
              <TextInput label="Full Name" name="fullName" required />
              <TextInput label="Date of Birth" name="dob" type="date" required />
              <TextInput label="Occupation" name="occupation" required />

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Marital Status<span className="text-red-500"> *</span></label>
                <div className="flex flex-col space-y-2">
                  <label><input type="radio" name="maritalStatus" value="Single" required /> Single</label>
                  <label><input type="radio" name="maritalStatus" value="Married" /> Married</label>
                  <label><input type="radio" name="maritalStatus" value="Widowed" /> Widowed</label>
                  <label><input type="radio" name="maritalStatus" value="Divorced" /> Divorced</label>
                  <label><input type="radio" name="maritalStatus" value="Separated" /> Separated</label>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" onClick={nextStep} className="bg-red-700 text-white px-4 py-2 rounded-md">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <TextInput label="Phone Number" name="phoneNumber" type="tel" required />
              <TextInput label="Email Address" name="email" type="email" required />
              <TextInput label="City/State" name="city" required />
              <TextInput label="Social Media Handles" name="socialMedia" required />

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

          {/* Step 3: Health, Experience, and Declaration */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold  mb-4">Health and Lifestyle</h3>
              <div className="mb-10">
                <label className="block text-sm font-bold mb-2">Any medical conditions?<span className="text-red-500"> *</span></label>
                <div className="flex flex-col space-y-2">
                  <label><input type="radio" name="medicalConditions" value="Yes" required /> Yes</label>
                  <label><input type="radio" name="medicalConditions" value="No" /> No</label>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Reality TV Experience</h3>
              <TextInput label="Previous reality TV experience (if any)" name="realityTVExperience" />
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
            {/* Step 4: Media and Declaration */}
              {currentStep === 4 && (
                <div>
              <h3 className="text-xl font-semibold mb-4">Media Consent</h3>
              <div className="mb-10">
                <label className="block text-sm font-bold mb-2">Do you consent to being filmed and broadcasted?<span className="text-red-500"> *</span></label>
                <div className="flex flex-col space-y-2">
                  <label><input type="radio" name="mediaConsent" value="Yes" required /> Yes</label>
                  <label><input type="radio" name="mediaConsent" value="No" /> No</label>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Declaration</h3>
              <TextInput label="I confirm that the information provided is accurate. (Enter your full name and submit form)" name="declaration" required />

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
