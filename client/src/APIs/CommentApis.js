import axios from "axios";
import { addPoints } from "../Actions/actions";
import store from "../Store/configureStore";
import { checkUpgrade } from "../Assets/functions/checkUpgrade";

export const getComments = async (postId) => {
  try {
    const response = await axios.post("/api/comment/getComments", { postId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCommentAndReplies = async (commentId) => {
  try {
    const response = await axios.post("/api/comment/fetchCommentAndReplies", {
      commentId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTopComment = async (postId, text, author) => {
  try {
    const response = await axios.post("/api/comment/addTopComment", {
      postId,
      text,
      author,
    });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(20));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTopCommunityComment = async (postId, text, author) => {
  try {
    const response = await axios.post("/api/comment/addTopCommunityComment", {
      postId,
      text,
      author,
    });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(20));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addReply = async (parentId, postId, text, author) => {
  try {
    const response = await axios.post("/api/comment/addReply", {
      parentId,
      postId,
      text,
      author,
    });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(20));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCommunityReply = async (parentId, postId, text, author) => {
  try {
    const response = await axios.post("/api/comment/addCommunityReply", {
      parentId,
      postId,
      text,
      author,
    });
    const state = store.getState();
    const oldPoints = state.user.points;
    store.dispatch(addPoints(20));
    checkUpgrade(oldPoints, oldPoints + 5);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularOpinions = async (numberOfOpinions, page) => {
  try {
    const response = await axios.post("/api/comment/topComments", {
      numberOfOpinions,
      page,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const report = async (commentId) => {
  try {
    const response = await axios.post("/api/comment/report", { commentId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReportedComments = async () => {
  try {
    const response = await axios.get("/api/comment/reportedComments");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.post("/api/comment/delete", { commentId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
