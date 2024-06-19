import axios from "axios";

// axios.defaults.baseURL = "http://192.168.189.181:3001"; // Replace with your API base URL

export const getNews = async (username) => {
  try {
    const response = await axios.post("/api/news/", { username });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await axios.post("/api/news/byId/", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsByCategory = async (category, username) => {
  try {
    const response = await axios.post("/api/news/byCategory", {
      category,
      username,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
