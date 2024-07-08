import axios from "axios";

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

export const addCommunityPost = async (data) => {
  try {
    const response = await axios.post("/api/community/post", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
