import axios from "axios";
import store from "../Store/configureStore";
import { addPoints } from "../Actions/actions";
import { checkUpgrade } from "../Assets/functions/checkUpgrade";

export const getCommunities = async () => {
  try {
    const response = await axios.get("/api/community/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommunityData = async (id) => {
  try {
    const response = await axios.post("/api/community/individual", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubcategoryPosts = async (subcategory, page) => {
  try {
    const response = await axios.post("/api/community/subcategory", {
      subcategory,
      page,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommunityPosts = async (id, page) => {
  try {
    const response = await axios.post("/api/community/communityPosts", {
      id,
      page,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommunityPostDetails = async (id) => {
  try {
    const response = await axios.post("/api/community/postDetails", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommunityPostComments = async (id) => {
  try {
    const response = await axios.post("/api/community/postComments", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCommunityPost = async (data) => {
  try {
    const response = await axios.post("/api/community/post", data);
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(50));
    checkUpgrade(oldPoints, oldPoints + 50);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUnverifiedPosts = async () => {
  try {
    const response = await axios.get("/api/community/unverifiedPosts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUnverifiedPostDetails = async (id) => {
  try {
    const response = await axios.post("/api/community/unverifiedPostDetails", {
      id,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const verifyPost = async (id) => {
  try {
    const response = await axios.post("/api/community/verifyPost", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const discardPost = async (id) => {
  try {
    const response = await axios.post("/api/community/discardPost", { id });
    return response.data;
  } catch (error) {
    throw error;
  }
};
