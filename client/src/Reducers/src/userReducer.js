const initialState = {
  token: null,
  username: null,
  email: null,
  categories: [],
  profilePicture: null,
  description: null,
  instagram: null,
  reddit: null,
  linkedin: null,
  twitter: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        email: action.payload.email,
        categories: action.payload.categories,
        profilePicture: action.payload.profilePicture,
        description: action.payload.description,
        instagram: action.payload.instagram,
        reddit: action.payload.reddit,
        linkedin: action.payload.linkedin,
        twitter: action.payload.twitter,
      };
    case "LOGOUT":
      return {
        token: null,
        username: null,
        email: null,
        categories: [],
        profilePicture: null,
        description: null,
      };
    case "UPDATE_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
