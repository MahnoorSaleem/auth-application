import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user/create`, { email, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    // Axios-specific error handling
    console.error('Axios error:', error.response?.data || error.message);
  } else {
    // General error handling
    console.error('General error:', error);
  }
  // Optionally, you can throw the error to handle it further up the chain
  throw error;
};
