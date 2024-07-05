import { combineReducers } from "redux";
import userReducer from "./src/userReducer";
import categoryReducer from "./src/categoryReducer";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
});

export default rootReducer;
