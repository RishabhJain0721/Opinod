import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./Store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";
import axios from "axios";

// axios.defaults.baseURL = "http://192.168.43.156:3001"; // Replace with your API base URL
axios.defaults.baseURL = "http://localhost:3001"; // Replace with your API base URL

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
