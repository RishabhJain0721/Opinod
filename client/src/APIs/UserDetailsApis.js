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

export const joinCommunity = async (username, communityId) => {
  try {
    const response = await axios.post("/api/user/joinCommunity", {
      username,
      communityId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const leaveCommunity = async (username, communityId) => {
  try {
    const response = await axios.post("/api/user/leaveCommunity", {
      username,
      communityId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const calculateAchievements = async (username) => {
  try {
    const response = await axios.post("/api/user/achievements", { username });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const calculateLevel = async (username) => {
  try {
    const response = await axios.post("/api/user/level", { username });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const calculateUpgrade = async (username, points) => {
  try {
    const response = await axios.post("/api/user/upgrade", {
      username,
      points,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecent = async (username) => {
  try {
    const response = await axios.post("/api/user/recent", { username });
    return response.data;
  } catch (error) {
    throw error;
  }
};
