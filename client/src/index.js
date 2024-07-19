import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./Store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App";
import axios from "axios";

// axios.defaults.baseURL = "https://opinod.onrender.com"; // Replace with your API base URL
axios.defaults.baseURL = "http://localhost:3001"; // Replace with your API base URL
// axios.defaults.baseURL = "http://192.168.77.181:3001";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <div className="font-League">
        <App />
      </div>
    </PersistGate>
  </Provider>
);
