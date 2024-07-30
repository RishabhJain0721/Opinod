import React from "react";
import logo from "../Assets/opinodLogo.png";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-xl font-bold flex items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className="w-11 h-11 mr-2 hidden md:block"
            onClick={() => {
              navigate("/admin/verifyPosts");
            }}
          />
          Admin Portal
        </h1>
        <nav className="space-x-4">
          <button
            onClick={() => navigate("/admin/verifyPosts")}
            className="hover:underline bg-transparent border-none text-white cursor-pointer focus:outline-none"
          >
            Verify Posts
          </button>
          <button
            onClick={() => navigate("/admin/reports")}
            className="hover:underline bg-transparent border-none text-white cursor-pointer focus:outline-none"
          >
            Reports
          </button>
          <button
            onClick={() => navigate("/admin/feedbacks")}
            className="hover:underline bg-transparent border-none text-white cursor-pointer focus:outline-none"
          >
            Feedbacks
          </button>
          <button
            onClick={() => navigate("/admin/rewards")}
            className="hover:underline bg-transparent border-none text-white cursor-pointer focus:outline-none"
          >
            Rewards
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminNav;
