// reducers/index.js
import { combineReducers } from "redux";
import userReducer from "./src/userReducer";
import categoryReducer from "./src/categoryReducer";
import newsReducer from "./src/newsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  news: newsReducer,
});

export default rootReducer;
