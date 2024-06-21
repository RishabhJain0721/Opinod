import axios from "axios";

export const getNews = async () => {
  try {
    const response = await axios.get("/api/news/");
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
