import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Search from "./Pages/Search";
import { useSelector } from "react-redux";
import AdminLogin from "./Pages/Admin/AdminLogin";
import VerifyPosts from "./Pages/Admin/VerifyPosts";
import Reports from "./Pages/Admin/Reports";
import Feedbacks from "./Pages/Admin/Feedbacks";
import Rewards from "./Pages/Admin/Rewards";
import PostDetails from "./Pages/Admin/PostDetails";
import FeedbackDetails from "./Pages/Admin/FeedbackDetails";
import ProfileOthers from "./Pages/ProfileOthers";
import ForgotUsername from "./Pages/ForgotUsername";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  const username = useSelector((state) => state.user.username);
  const admin = useSelector((state) => state.admin);
  const IsAdmin = ({ children }) => {
    return admin ? children : <Navigate to="/admin" />;
  };
  const RequireAuth = ({ children }) => {
    return username ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotUsername" element={<ForgotUsername />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/details/:id"
          element={
            <RequireAuth>
              <Details />
            </RequireAuth>
          }
        />
        <Route
          path="/category/:category"
          element={
            <RequireAuth>
              <CategoryNews />
            </RequireAuth>
          }
        />
        <Route
          path="/topOpinions"
          element={
            <RequireAuth>
              <TopOpinions />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/details/:id/reply/:commentId"
          element={
            <RequireAuth>
              <Reply />
            </RequireAuth>
          }
        />
        <Route
          path="/updateProfile"
          element={
            <RequireAuth>
              <UpdateProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/achievements"
          element={
            <RequireAuth>
              <Achievements />
            </RequireAuth>
          }
        />
        <Route
          path="/selectCategories"
          element={
            <RequireAuth>
              <SelectCategories />
            </RequireAuth>
          }
        />
        <Route
          path="/recents"
          element={
            <RequireAuth>
              <Recents />
            </RequireAuth>
          }
        />
        <Route
          path="/communities"
          element={
            <RequireAuth>
              <Communities />
            </RequireAuth>
          }
        />
        <Route
          path="/communities/main"
          element={
            <RequireAuth>
              <CommunitiesMain />
            </RequireAuth>
          }
        />
        <Route
          path="/communities/special"
          element={
            <RequireAuth>
              <CommunitiesSpecial />
            </RequireAuth>
          }
        />
        <Route
          path="/communities/joined"
          element={
            <RequireAuth>
              <CommunitiesJoined />
            </RequireAuth>
          }
        />
        <Route
          path="/community/:id"
          element={
            <RequireAuth>
              <CommunitiesIndividual />
            </RequireAuth>
          }
        />
        <Route
          path="/community/:id/subcategories"
          element={
            <RequireAuth>
              <CommunitySubcategories />
            </RequireAuth>
          }
        />
        <Route
          path="/community/:id/posts"
          element={
            <RequireAuth>
              <CommunityPosts />
            </RequireAuth>
          }
        />
        <Route
          path="/subcategory/:subcategory"
          element={
            <RequireAuth>
              <SubcategoryIndividual />
            </RequireAuth>
          }
        />
        <Route
          path="/cpostdetails/:id"
          element={
            <RequireAuth>
              <CommunityPostDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/cpostdetails/:id/reply/:commentId"
          element={
            <RequireAuth>
              <CommunityReply />
            </RequireAuth>
          }
        />
        <Route
          path="/search/:searchText"
          element={
            <RequireAuth>
              <Search />
            </RequireAuth>
          }
        />
        <Route path="/profile/:id" element={<ProfileOthers />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <IsAdmin>
              <Routes>
                <Route path="verifyPosts" element={<VerifyPosts />} />
                <Route path="reports" element={<Reports />} />
                <Route path="feedbacks" element={<Feedbacks />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="post/:id" element={<PostDetails />} />
                <Route path="feedback/:id" element={<FeedbackDetails />} />
              </Routes>
            </IsAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
