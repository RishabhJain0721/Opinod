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
  profilePicture,
  description,
  likedPosts,
  dislikedPosts,
  likedComments,
  dislikedComments,
  instagram,
  reddit,
  linkedin,
  twitter
) => {
  return {
    type: "LOGIN",
    payload: {
      token: token,
      username: username,
      email: email,
      categories: categories,
      profilePicture: profilePicture,
      description: description,
      likedPosts: likedPosts,
      dislikedPosts: dislikedPosts,
      likedComments: likedComments,
      dislikedComments: dislikedComments,
      instagram: instagram,
      reddit: reddit,
      linkedin: linkedin,
      twitter: twitter,
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

export const saveNews = (articlesArray, category) => {
  return {
    type: "SAVE_ARTICLES",
    payload: { articlesArray, category },
  };
};

export const refreshNews = () => {
  return {
    type: "REFRESH_NEWS",
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

export const updateNewsInStore = (article, category) => {
  return {
    type: "UPDATE_NEWS",
    payload: { article, category },
  };
};
