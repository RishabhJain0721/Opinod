const initialState = {
  category: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
