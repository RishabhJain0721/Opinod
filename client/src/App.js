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
import SelectCategories from "./Pages/SelectCategories";
import Achievements from "./Pages/Achievements";
import Recents from "./Pages/Recents";
import CategoryNews from "./Pages/CategoryNews";
import Communities from "./Pages/Communities";
import {
  CommunitiesMain,
  CommunitiesSpecial,
} from "./Pages/CommunitiesMainAndSpecial";
import CommunitiesJoined from "./Pages/CommunitiesJoined";
import CommunitiesIndividual from "./Pages/CommunitiesIndividual";
import CommunitySubcategories from "./Pages/CommunitySubcategories";
import CommunityPosts from "./Pages/CommunityPosts";
import SubcategoryIndividual from "./Pages/SubcategoryIndividual";
import CommunityPostDetails from "./Pages/CommunityPostDetails";
import CommunityReply from "./Pages/CommunityReply";

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
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/selectCategories" element={<SelectCategories />} />
        <Route path="/recents" element={<Recents />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/communities/main" element={<CommunitiesMain />} />
        <Route path="/communities/special" element={<CommunitiesSpecial />} />
        <Route path="/communities/joined" element={<CommunitiesJoined />} />
        <Route path="/community/:id" element={<CommunitiesIndividual />} />
        <Route
          path="/community/:id/subcategories"
          element={<CommunitySubcategories />}
        />
        <Route path="/community/:id/posts" element={<CommunityPosts />} />
        <Route
          path="/subcategory/:subcategory"
          element={<SubcategoryIndividual />}
        />
        <Route path="/cpostdetails/:id" element={<CommunityPostDetails />} />
        <Route
          path="/cpostdetails/:id/reply/:commentId"
          element={<CommunityReply />}
        />
      </Routes>
    </Router>
  );
}

export default App;
