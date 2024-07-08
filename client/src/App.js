import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import VerifyEmail from "./Pages/VerifyEmail";
import Profile from "./Pages/Profile";
import Reply from "./Pages/Reply";
import UpdateProfile from "./Pages/UpdateProfile";
import Details from "./Pages/Details";
import TopOpinions from "./Pages/TopOpinions";
import Notifications from "./Pages/Notifications";
import SelectCategories from "./Pages/SelectCategories";
import CategoryNews from "./Pages/CategoryNews";
import Communities from "./Pages/Communities";
import {
  CommunitiesMain,
  CommunitiesSpecial,
} from "./Pages/CommunitiesMainAndSpecial";
import CommunitiesJoined from "./Pages/CommunitiesJoined";
import CommunitiesIndividual from "./Pages/CommunitiesIndividual";
import CommunitySubcategories from "./Pages/CommunitySubcategories";
import SubcategoryIndividual from "./Pages/SubcategoryIndividual";

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
        <Route path="/topOpinions" element={<TopOpinions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id/reply/:commentId" element={<Reply />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/selectCategories" element={<SelectCategories />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/communities/main" element={<CommunitiesMain />} />
        <Route path="/communities/special" element={<CommunitiesSpecial />} />
        <Route path="/communities/joined" element={<CommunitiesJoined />} />
        <Route path="/community/:id" element={<CommunitiesIndividual />} />
        <Route
          path="/community/:id/subcategories"
          element={<CommunitySubcategories />}
        />
        <Route
          path="/subcategory/:subcategory"
          element={<SubcategoryIndividual />}
        />
      </Routes>
    </Router>
  );
}

export default App;
