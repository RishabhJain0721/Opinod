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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await axios.post("/api/news/byId/", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsByCategory = async (category, username, page) => {
  try {
    const response = await axios.post("/api/news/byCategory", {
      category,
      username,
      page,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNews = async (postId) => {
  try {
    const response = await axios.post("/api/news/update", { postId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
