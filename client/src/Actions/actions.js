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
