import axios from "axios";
import { eachHourOfInterval } from "date-fns";

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

export const getRecent = async (username) => {
  try {
    const response = await axios.post("/api/user/recent", { username });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (id) => {
  try {
    const response = await axios.post("/api/user/getDetails", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (id) => {
  try {
    const response = await axios.post("/api/user/getPosts", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserComments = async (id) => {
  try {
    const response = await axios.post("/api/user/getComments", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followUser = async (username, followId) => {
  try {
    const response = await axios.post("/api/user/followUser", {
      username,
      followId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = async (username, followId) => {
  try {
    const response = await axios.post("/api/user/unfollowUser", {
      username,
      followId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const test = async (formData) => {
  try {
    const response = await axios.post("/api/user/test", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
