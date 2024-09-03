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

export const getRecent = async (username, number) => {
  try {
    const response = await axios.post("/api/user/recent", { username, number });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (name) => {
  try {
    const response = await axios.post("/api/user/getDetails", { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (name) => {
  try {
    const response = await axios.post("/api/user/getPosts", { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserComments = async (name) => {
  try {
    const response = await axios.post("/api/user/getComments", { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const followUser = async (username, name) => {
  try {
    const response = await axios.post("/api/user/followUser", {
      username,
      name,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unfollowUser = async (username, name) => {
  try {
    const response = await axios.post("/api/user/unfollowUser", {
      username,
      name,
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

export const getBadges = async (username) => {
  try {
    const response = await axios.post("/api/user/badges", { username });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAchievements = async (achievements, username) => {
  try {
    const response = await axios.post("/api/user/updateBadges", {
      achievements,
      username,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPeopleWithBadges = async () => {
  try {
    const response = await axios.get("/api/user/peopleWithBadges");
    return response.data;
  } catch (error) {
    throw error;
  }
};
