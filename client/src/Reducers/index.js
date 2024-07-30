import { combineReducers } from "redux";
import userReducer from "./src/userReducer";
import categoryReducer from "./src/categoryReducer";
import adminReducer from "./src/adminReducer";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  admin: adminReducer,
});

export default rootReducer;
