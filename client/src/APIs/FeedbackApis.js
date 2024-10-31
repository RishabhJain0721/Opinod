import axios from "axios";

export const getFeedbacks = async () => {
  try {
    const response = await axios.get("/api/feedbacks");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addFeedback = async (feedbackData) => {
  try {
    const response = await axios.post("/api/feedbacks/add", feedbackData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleFeedback = async (id) => {
  try {
    const response = await axios.post("/api/feedbacks/getOne", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const support = async (formData) => {
  try {
    const response = await axios.post("/api/feedbacks/support", {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
