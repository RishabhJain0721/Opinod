import axios from "axios";

export const likePost = async (username, postId) => {
  try {
    const response = await axios.post("/api/like/add", { username, postId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dislikePost = async (username, postId) => {
  try {
    const response = await axios.post("/api/dislike/add", { username, postId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeLike = async (username, postId) => {
  try {
    const response = await axios.post("/api/like/remove", { username, postId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const removeDislike = async (username, postId) => {
  try {
    const response = await axios.post("/api/dislike/remove", {
      username,
      postId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
