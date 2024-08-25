export const selectCategory = (category) => {
  return {
    type: "SELECT_CATEGORY",
    payload: category,
  };
};

export const loginToStore = (
  token,
  username,
  email,
  categories,
  joinedCommunities,
  profilePicture,
  description,
  likedPosts,
  dislikedPosts,
  likedComments,
  dislikedComments,
  points,
  followers,
  following
) => {
  return {
    type: "LOGIN",
    payload: {
      token: token,
      username: username,
      email: email,
      categories: categories,
      joinedCommunities: joinedCommunities,
      profilePicture: profilePicture,
      description: description,
      likedPosts: likedPosts,
      dislikedPosts: dislikedPosts,
      likedComments: likedComments,
      dislikedComments: dislikedComments,
      points: points,
      followers: followers,
      following: following,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const updateCategories = (categories) => {
  return {
    type: "UPDATE_CATEGORIES",
    payload: categories,
  };
};

export const updateCommunities = (communityId) => {
  return {
    type: "UPDATE_COMMUNITIES",
    payload: communityId,
  };
};

export const updateRemoveCommunity = (communityId) => {
  return {
    type: "UPDATE_REMOVE_COMMUNITY",
    payload: communityId,
  };
};

export const like = (postId) => {
  return {
    type: "LIKE",
    payload: postId,
  };
};

export const dislike = (postId) => {
  return {
    type: "DISLIKE",
    payload: postId,
  };
};

export const likeRemove = (postId) => {
  return {
    type: "LIKE_REMOVE",
    payload: postId,
  };
};

export const dislikeRemove = (postId) => {
  return {
    type: "DISLIKE_REMOVE",
    payload: postId,
  };
};

export const likeCom = (commentId) => {
  return {
    type: "LIKE_COMMENT",
    payload: commentId,
  };
};

export const dislikeCom = (commentId) => {
  return {
    type: "DISLIKE_COMMENT",
    payload: commentId,
  };
};

export const likeComRemove = (commentId) => {
  return {
    type: "LIKE_COMMENT_REMOVE",
    payload: commentId,
  };
};

export const dislikeComRemove = (commentId) => {
  return {
    type: "DISLIKE_COMMENT_REMOVE",
    payload: commentId,
  };
};

export const addPoints = (points) => {
  return {
    type: "ADD_POINTS",
    payload: points,
  };
};

export const adminLoginToStore = (username) => {
  return {
    type: "ADMIN_LOGIN",
    payload: username,
  };
};

export const follow = (userId) => {
  return {
    type: "FOLLOW",
    payload: userId,
  };
};

export const unfollow = (userId) => {
  return {
    type: "UNFOLLOW",
    payload: userId,
  };
};
