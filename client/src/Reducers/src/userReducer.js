const initialState = {
  token: null,
  username: null,
  email: null,
  categories: [],
  profilePicture: null,
  description: null,
  joinedCommunities: [],
  likedPosts: null,
  dislikedPosts: null,
  likedComments: null,
  dislikedComments: null,
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
        joinedCommunities: action.payload.joinedCommunities,
        likedPosts: action.payload.likedPosts,
        dislikedPosts: action.payload.dislikedPosts,
        likedComments: action.payload.likedComments,
        dislikedComments: action.payload.dislikedComments,
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
        joinedCommunities: [],
        likedPosts: null,
        dislikedPosts: null,
        likedComments: null,
        dislikedComments: null,
        instagram: null,
        reddit: null,
        linkedin: null,
        twitter: null,
      };
    case "UPDATE_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "UPDATE_COMMUNITIES":
      return {
        ...state,
        joinedCommunities: [...state.joinedCommunities, action.payload],
      };
    case "UPDATE_REMOVE_COMMUNITY":
      console.log(state.joinedCommunities);
      return {
        ...state,
        joinedCommunities: state.joinedCommunities.filter(
          (communityId) => communityId !== action.payload
        ),
      };
    case "LIKE":
      return {
        ...state,
        likedPosts: [...state.likedPosts, action.payload],
      };

    case "DISLIKE":
      return {
        ...state,
        dislikedPosts: [...state.dislikedPosts, action.payload],
      };

    case "LIKE_REMOVE":
      return {
        ...state,
        likedPosts: state.likedPosts.filter(
          (postId) => postId !== action.payload
        ),
      };
    case "DISLIKE_REMOVE":
      return {
        ...state,
        dislikedPosts: state.dislikedPosts.filter(
          (postId) => postId !== action.payload
        ),
      };
    case "LIKE_COMMENT":
      return {
        ...state,
        likedComments: [...state.likedComments, action.payload],
      };
    case "DISLIKE_COMMENT":
      return {
        ...state,
        dislikedComments: [...state.dislikedComments, action.payload],
      };
    case "LIKE_COMMENT_REMOVE":
      return {
        ...state,
        likedComments: state.likedComments.filter(
          (commentId) => commentId !== action.payload
        ),
      };
    case "DISLIKE_COMMENT_REMOVE":
      return {
        ...state,
        dislikedComments: state.dislikedComments.filter(
          (commentId) => commentId !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default userReducer;
