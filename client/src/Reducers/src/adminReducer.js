const initialState = {
  admin: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return { ...state, admin: action.payload };
    case "ADMIN_LOGOUT":
      return { admin: null };
    default:
      return state;
  }
};

export default adminReducer;
