import axios from "axios";

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
    return response.data;
  } catch (error) {
    throw error;
  }
};
