import axios from "axios";
import store from "../Store/configureStore";
import { addPoints } from "../Actions/actions";
import { checkUpgrade } from "../Assets/functions/checkUpgrade";

export const likePost = async (username, postId) => {
  try {
    const response = await axios.post("/api/like/add", { username, postId });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(5));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dislikePost = async (username, postId) => {
  try {
    const response = await axios.post("/api/dislike/add", { username, postId });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(5));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeLike = async (username, postId) => {
  try {
    const response = await axios.post("/api/like/remove", { username, postId });
    store.dispatch(addPoints(-5));
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
    store.dispatch(addPoints(-5));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeComment = async (username, commentId) => {
  try {
    const response = await axios.post("/api/like/comment/add", {
      username,
      commentId,
    });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(5));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dislikeComment = async (username, commentId) => {
  try {
    const response = await axios.post("/api/dislike/comment/add", {
      username,
      commentId,
    });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(5));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCommentLike = async (username, commentId) => {
  try {
    const response = await axios.post("/api/like/comment/remove", {
      username,
      commentId,
    });
    store.dispatch(addPoints(-5));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCommentDislike = async (username, commentId) => {
  try {
    const response = await axios.post("/api/dislike/comment/remove", {
      username,
      commentId,
    });
    store.dispatch(addPoints(-5));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCommunityPostLike = async (username, postId) => {
  try {
    const response = await axios.post("/api/like/communityPost/add", {
      username,
      postId,
    });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(5));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCommunityPostLike = async (username, postId) => {
  try {
    const response = await axios.post("/api/like/communityPost/remove", {
      username,
      postId,
    });
    store.dispatch(addPoints(-5));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCommunityPostDislike = async (username, postId) => {
  try {
    const response = await axios.post("/api/dislike/communityPost/add", {
      username,
      postId,
    });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(5));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeCommunityPostDislike = async (username, postId) => {
  try {
    const response = await axios.post("/api/dislike/communityPost/remove", {
      username,
      postId,
    });
    store.dispatch(addPoints(-5));
    return response.data;
  } catch (error) {
    throw error;
  }
};
