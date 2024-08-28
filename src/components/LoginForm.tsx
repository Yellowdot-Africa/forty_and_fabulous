import React, { useState } from 'react';
import { loginUser } from '../api/apiService';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const LoginForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!phoneNumber || !isPossiblePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }
    console.log(phoneNumber)
    try {
      const data = await loginUser(phoneNumber);

      if (data.status === 200) {
        localStorage.setItem('authToken', data.token);
        alert('Login successful!');
        window.location.href = '/recruitment';
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="rounded-lg shadow-lg px-4 py-8 w-full bg-white max-w-md">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-16">
          Login
        </h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <PhoneInput
            international
            defaultCountry="NG"
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="custom-phone-input"
            inputComponent={PhoneNumberInput}
          />
          <div className="flex justify-center mt-10">
            <button type="submit" className="bg-[#98D5EC] text-white px-6 py-2 rounded-md w-full hover:bg-blue-500">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PhoneNumberInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <input {...props} ref={ref} className="w-full px-3 py-2 rounded-md" />
));

export default LoginForm;
