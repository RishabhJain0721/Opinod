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

export const adminLogin = async (userData) => {
  try {
    const response = await axios.post("/api/auth/adminLogin", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotUsername = async (email) => {
  try {
    const response = await axios.post("/api/auth/forgot-username", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post("/api/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (email) => {
  try {
    const response = await axios.post("/api/auth/delete-user", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
