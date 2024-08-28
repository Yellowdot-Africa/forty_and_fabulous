/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import { addUser, getUserDetails } from '../api/apiService';

const Popup: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded animate-pulse">
      {message}
    </div>
  );
};

const Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
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
    medicalConditionsReason: '',
    fitnessDietRoutine: '',
    tvExperience: '',
    mediaConsent: '',
    declaration: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const phoneNumber = localStorage.getItem('msisdn');
    const authToken = localStorage.getItem('authToken');

    if (phoneNumber && authToken) {
      setFormData((prevData) => ({ ...prevData, phoneNumber }));

      const fetchUserDetails = async () => {
        try {
          const userDetails = await getUserDetails(phoneNumber, authToken);
          setFormData((prevData) => ({ ...prevData, ...userDetails }));
        } catch (error: any) {
          console.error('Error fetching user details:', error.message);
          setError(error.message);
        }
      };

      fetchUserDetails();
    }
  }, []);

  const nextStep = () => {
    if (validateCurrentStep()) {
      setError(null);
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } else {
      setError('Please complete all required fields.');
    }
  };

  const previousStep = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
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
        return (
          formData.medicalConditions &&
          (formData.medicalConditions === 'No' ||
            (formData.medicalConditionsReason && formData.fitnessDietRoutine))
        );
      case 4:
        return formData.tvExperience && formData.mediaConsent && formData.declaration;
      default:
        return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'medicalConditions' && value === 'No') {
      setFormData({
        ...formData,
        medicalConditions: 'No',
        medicalConditionsReason: 'None',
        fitnessDietRoutine: 'None',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('You must be logged in to submit the form.');
      setLoading(false);
      return;
    }

    try {
      const data = await addUser(formData, authToken);

      if (data.status === 201) {
        setPopupMessage(data.msg);
        setShowPopup(true);
      }
    } catch (error: any) {
      console.error('Error:', error.message);

      if (error.message === 'Unauthorized') {
        localStorage.clear();
        window.location.href = '/login';
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex items-center justify-center w-full">
      <div className="rounded-lg shadow-lg px-4 py-8 w-full bg-white">
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
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
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Single"
                      required
                      checked={formData.maritalStatus === 'Single'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> Single
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Married"
                      checked={formData.maritalStatus === 'Married'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> Married
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Widowed"
                      checked={formData.maritalStatus === 'Widowed'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> Widowed
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Divorced"
                      checked={formData.maritalStatus === 'Divorced'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> Divorced
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="Separated"
                      checked={formData.maritalStatus === 'Separated'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> Separated
                  </label>
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
              <TextInput 
                label="Phone Number" 
                name="phoneNumber" 
                type="tel"
                required
                value={formData.phoneNumber} 
                onChange={handleInputChange} 
                readOnly
              />
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
                  <label>
                    <input
                      type="radio"
                      name="medicalConditions"
                      value="Yes"
                      required
                      checked={formData.medicalConditions === 'Yes'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="medicalConditions"
                      value="No"
                      checked={formData.medicalConditions === 'No'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> No
                  </label>
                </div>
              </div>

              {formData.medicalConditions === 'Yes' && (
                <>
                  <TextInput label="If yes, please elaborate" name="medicalConditionsReason" value={formData.medicalConditionsReason} onChange={handleInputChange} />
                  <TextInput label="Do you have any fitness or diet routine?" name="fitnessDietRoutine" value={formData.fitnessDietRoutine} onChange={handleInputChange} />
                </>
              )}
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
              <h3 className="text-xl font-semibold mb-4">Reality TV Experience and Media Consent</h3>
              <TextInput label="Previous reality TV experience (if any)" name="tvExperience" value={formData.tvExperience} onChange={handleInputChange} />
              <div className="mb-10">
                <label className="block text-sm font-bold mb-2">Do you consent to being filmed and broadcasted?<span className="text-red-500"> *</span></label>
                <div className="flex flex-col space-y-2">
                  <label>
                    <input
                      type="radio"
                      name="mediaConsent"
                      value="Yes"
                      required
                      checked={formData.mediaConsent === 'Yes'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mediaConsent"
                      value="No"
                      checked={formData.mediaConsent === 'No'}
                      onChange={handleRadioChange}
                      className='mr-1'
                    /> No
                  </label>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Declaration</h3>
              <TextInput label="I confirm that the information provided is accurate. (Enter your full name and submit form)" name="declaration" required value={formData.declaration} onChange={handleInputChange} />

              <div className="flex justify-between">
                <button type="button" onClick={previousStep} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Back
                </button>
                <button type="submit" className="bg-red-700 text-white px-4 py-2 rounded-md">
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          )}
        </form>
        {showPopup && (
          <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
        )}
      </div>
    </div>
  );
};

export default Form;
