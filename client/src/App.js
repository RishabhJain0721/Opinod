import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import Details from "./Pages/Details";
import Notifications from "./Pages/Notifications";
import SelectCategories from "./Pages/SelectCategories";
import CategoryNews from "./Pages/CategoryNews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/category/:category" element={<CategoryNews />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/selectCategories" element={<SelectCategories />} />
      </Routes>
    </Router>
  );
}

export default App;
