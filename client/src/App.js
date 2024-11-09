import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import Home from "./Pages/Home";
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
import PrivacyPolicy from "./Pages/PrivatePolicy";
import Terms from "./Pages/Terms";
import Contact from "./Pages/Contact";
import Support from "./Pages/Support";
import SupportMails from "./Pages/Admin/SupportMails";
import SupportMailDetails from "./Pages/Admin/SupportMailDetails";
import Layout from "./Components/Layout";

const CategoryNewsWrapper = () => {
  const { category } = useParams();
  return <CategoryNews key={category} category={category} />;
};

const CommunityPostsWrapper = () => {
  const { id } = useParams();
  return <CommunityPosts key={id} />;
};

const CommunitiesIndividualWrapper = () => {
  const { id } = useParams();
  return <CommunitiesIndividual key={id} />;
};

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgotUsername" element={<ForgotUsername />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route
            path="/details/:id"
            element={
              <RequireAuth>
                <Details />
              </RequireAuth>
            }
          />
          <Route path="/category/:category" element={<CategoryNewsWrapper />} />
          <Route path="/topOpinions" element={<TopOpinions />} />
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
          <Route path="/communities" element={<Communities />} />
          <Route path="/communities/main" element={<CommunitiesMain />} />
          <Route path="/communities/special" element={<CommunitiesSpecial />} />
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
            element={<CommunitiesIndividualWrapper />}
          />
          <Route
            path="/community/:id/subcategories"
            element={<CommunitySubcategories />}
          />
          <Route
            path="/community/:id/posts"
            element={<CommunityPostsWrapper />}
          />
          <Route
            path="/subcategory/:subcategory"
            element={<SubcategoryIndividual />}
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
          <Route path="/search/:searchText" element={<Search />} />
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
                  <Route path="support" element={<SupportMails />} />
                  <Route path="support/:id" element={<SupportMailDetails />} />
                </Routes>
              </IsAdmin>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
