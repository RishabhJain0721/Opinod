import axios from "axios";

export const selectCategories = async (username, categories) => {
  try {
    const response = await axios.post("/api/user/addCategories", {
      username,
      categories,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (formData) => {
  try {
    const response = await axios.post("/api/user/updateProfile", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
