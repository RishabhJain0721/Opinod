import axios from "axios";

export const getNews = async (categories) => {
  try {
    const response = await axios.post("/api/news/", { categories });
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

export const getNewsByCategory = async ({
  category,
  username,
  page,
  userCategories,
}) => {
  try {
    const response = await axios.post("/api/news/byCategory", {
      category,
      username,
      page,
      userCategories,
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

export const getNextArticle = async (type, time, cat) => {
  try {
    const response = await axios.post("/api/news/nextId", {
      type,
      time,
      cat,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
