import axios from "axios";

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
