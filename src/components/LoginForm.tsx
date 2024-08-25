import React from 'react';
import TextInput from './TextInput';

const LoginForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Login successful!');
  };

  return (
   <div className="flex items-center justify-center w-full">
      <div className="rounded-lg shadow-lg px-4 py-8 w-full bg-white">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-16">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <TextInput label="Phone Number" name="phoneNumber" type="tel" required placeholder="Enter your phone number" />
          
          <div className="flex justify-center mt-10">
            <button type="submit" className="bg-[#98D5EC] text-white px-6 py-2 rounded-md w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
