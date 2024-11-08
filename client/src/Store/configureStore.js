import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { badgeAnim } from "../Assets/functions/badgeAnim.js";
import { getBadges, updateAchievements } from "../APIs/UserDetailsApis";

// Middleware to listen for changes in points
const pointsMiddleware = (store) => (next) => (action) => {
  const result = next(action); // Pass action to next middleware/reducer

  const state = store.getState();
  const prevUser =
    JSON.parse(localStorage.getItem("persist:a")) === null
      ? {}
      : JSON.parse(localStorage.getItem("persist:a"));
  const prevPoints =
    prevUser === null || Object.keys(prevUser).length === 0
      ? 0
      : prevUser?.user?.points;

  // Assuming points is nested under user in state
  const currentPoints = state.user.points;

  if (
    Math.floor(prevPoints / 60) !== Math.floor(currentPoints / 60) &&
    currentPoints &&
    currentPoints > prevPoints
  ) {
    // Run your function here when crossing multiples of 60

    if (action.type.slice(0, 3) === "ADD") {
      (async function checkAndRun() {
        try {
          const res = await getBadges(state.user.username);
          res.forEach((achi) => {
            if (achi.unlocked === true && achi.displayed === false) {
              badgeAnim(achi.name);
              achi.displayed = true;
            }
          });
          await updateAchievements(res, state.user.username);
        } catch (error) {
          console.log(error);
        }
      })();
    }

    // Your custom function here
  }

  localStorage.setItem(
    "persist:a",
    JSON.stringify({ ...prevUser, points: currentPoints })
  ); // Update user object in localStorage with current points

  return result;
};

const persistConfig = {
  key: "a", // key for the localStorage object
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(pointsMiddleware))
);

export const persistor = persistStore(store);

export default store;
