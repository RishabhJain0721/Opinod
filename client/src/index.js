import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./Store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// axios.defaults.baseURL = "https://opinod.onrender.com";
axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "http://88.222.215.207:3001";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <div className="font-Poppins min-h-screen bg-white">
        <App />
        <ToastContainer
          style={{
            width: "auto",
            marginTop: "4rem",
            marginLeft: "2rem",
            marginRight: "2rem",
          }}
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </PersistGate>
  </Provider>
);
