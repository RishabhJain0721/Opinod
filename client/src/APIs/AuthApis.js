import axios from "axios";

// axios.defaults.baseURL = "http://192.168.189.181:3001"; // Replace with your API base URL

// Define functions to make API requests
export const signup = async (userData) => {
  try {
    const response = await axios.post("/api/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`/api/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post("/api/auth/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
