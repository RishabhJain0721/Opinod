import axios from "axios";
import store from "../Store/configureStore";
import { addPoints } from "../Actions/actions";

export const likePost = async (username, postId) => {
  try {
    store.dispatch(addPoints(5));
    const response = await axios.post("/api/like/add", { username, postId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dislikePost = async (username, postId) => {
  try {
    store.dispatch(addPoints(5));
    const response = await axios.post("/api/dislike/add", { username, postId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeLike = async (username, postId) => {
  try {
    store.dispatch(addPoints(-5));
    const response = await axios.post("/api/like/remove", { username, postId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const removeDislike = async (username, postId) => {
  try {
    store.dispatch(addPoints(-5));
    const response = await axios.post("/api/dislike/remove", {
      username,
      postId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeComment = async (username, commentId) => {
  try {
    store.dispatch(addPoints(5));
    const response = await axios.post("/api/like/comment/add", {
      username,
      commentId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dislikeComment = async (username, commentId) => {
  try {
    store.dispatch(addPoints(5));
    const response = await axios.post("/api/dislike/comment/add", {
      username,
      commentId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCommentLike = async (username, commentId) => {
  try {
    store.dispatch(addPoints(-5));
    const response = await axios.post("/api/like/comment/remove", {
      username,
      commentId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCommentDislike = async (username, commentId) => {
  try {
    store.dispatch(addPoints(-5));
    const response = await axios.post("/api/dislike/comment/remove", {
      username,
      commentId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCommunityPostLike = async (username, postId) => {
  try {
    store.dispatch(addPoints(5));
    const response = await axios.post("/api/like/communityPost/add", {
      username,
      postId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCommunityPostLike = async (username, postId) => {
  try {
    store.dispatch(addPoints(-5));
    const response = await axios.post("/api/like/communityPost/remove", {
      username,
      postId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCommunityPostDislike = async (username, postId) => {
  try {
    store.dispatch(addPoints(5));
    const response = await axios.post("/api/dislike/communityPost/add", {
      username,
      postId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCommunityPostDislike = async (username, postId) => {
  try {
    store.dispatch(addPoints(-5));
    const response = await axios.post("/api/dislike/communityPost/remove", {
      username,
      postId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
