// src/api/apiService.ts

export const loginUser = async (msisdn: string) => {
    try {
      const response = await fetch('https://api.40fabulous.com/api/v1/auth-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ msisdn }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.msg || 'Login failed. Please try again.');
      }
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred. Please try again.');
    }
  };
  
  export const addUser = async (formData: any, token: string) => {
    try {
      const response = await fetch('https://api.40fabulous.com/api/v1/users/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data)

      if (response.ok) {
        return data;
      } else if (response.status === 400) {
        throw new Error('Your details have already been submitted.');
      } else {
        throw new Error(data.msg || 'Form submission failed. Please try again.');
      }
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred. Please try again.');
    }
  };
