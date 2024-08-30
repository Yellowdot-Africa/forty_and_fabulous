/* eslint-disable @typescript-eslint/no-explicit-any */
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
        throw new Error(data.msg);
      } else {
        throw new Error(data.msg || 'Form submission failed. Please try again.');
      }
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred. Please try again.');
    }
  };

  const formatToInputDate = (dateString: string) => {
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    }
    if (dateString.includes('-')) {
      return dateString;
    }
    return '';
  };
  
  export const getUserDetails = async (phoneNumber:string, token:string) => {
    try {
      const response = await fetch(`https://api.40fabulous.com/api/v1/users/${phoneNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const userDetails = data?.doc?.UserDetails;

        if (userDetails) {
          if (userDetails.dateOfBirth && typeof userDetails.dateOfBirth === 'string') {
            userDetails.dateOfBirth = formatToInputDate(userDetails.dateOfBirth);
          }

          return userDetails;
        }

        return null;
      } else if (response.status === 400) {
        throw new Error(data.msg);
      } else {
        throw new Error(data.msg || 'Failed to retrieve user details. Please try again.');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const updateUserDetails = async (phoneNumber: string, formData: any, token: string) => {
    try {
      const response = await fetch(`https://api.40fabulous.com/api/v1/users/${phoneNumber}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else if (response.status === 400) {
        throw new Error(data.msg);
      } else {
        throw new Error(data.msg || 'Failed to update user details. Please try again.');
      }
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred. Please try again.');
    }
  };
