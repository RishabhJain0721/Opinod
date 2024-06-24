import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faReddit,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "../Actions/actions";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const base64Image = user.profilePicture.buffer;
  const imageType = user.profilePicture.mimetype;
  const src = `data:${imageType};base64,${base64Image}`;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Topbar />
      {!isMobile && <Navbar />}
      <div className="flex mt-16">
        <div className="md:ml-60 mt-11 md:mt-0 p-4 w-full">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-4 md:m-4 h-fit border md:border-blue-400">
            {/* First Row: Profile pic, Followers, Following, Category */}
            <div className="flex items-center justify-start mb-2 md:mb-4">
              <img
                src={src}
                alt="Profile"
                className="w-16 h-16 md:w-24 md:h-24 rounded-full mr-4"
              />
              <div className="flex flex-col text-center ml-2 md:ml-5">
                <span className="text-base md:text-xl">{308}</span>
                <span className="text-sm md:text-lg font-semibold text-blue-600">
                  Followers
                </span>
              </div>
              <div className="flex flex-col text-center ml-5">
                <span className="text-base md:text-xl">{100}</span>
                <span className="text-sm md:text-lg font-semibold text-blue-600">
                  Following
                </span>
              </div>
              <div className="flex flex-col text-center ml-5">
                <span className="text-base md:text-xl">
                  {user.categories.length}
                </span>
                <span className="text-sm md:text-lg font-semibold text-blue-600">
                  Categories
                </span>
              </div>
            </div>

            {/* Second Row: Name */}
            <div className="text-2xl font-semibold text-blue-600 mb-1 md:mb-3">
              {user.username}
            </div>

            {/* Third Row: Email */}
            <div className=" text-sm md:text-lg text-gray-700 mb-4">
              {user.email}
            </div>

            {/* Fourth Row: Description */}
            <div className="text-gray-700 text-xs md:text-base mb-6">
              {user.description}
            </div>

            {/* Social Media Links */}
            <div className="flex justify-start mb-6">
              <a href={user.instagram} className="mx-2 text-blue-600">
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              </a>
              <a href={user.reddit} className="mx-2 text-blue-600">
                <FontAwesomeIcon icon={faReddit} className="text-2xl" />
              </a>
              <a href={user.linkedin} className="mx-2 text-blue-600">
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
              </a>
              <a href={user.twitter} className="mx-2 text-blue-600">
                <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
              </a>
            </div>

            {/* Edit Profile and Logout Buttons */}
            <div className="flex justify-start space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 duration-100"
                onClick={() => navigate("/updateProfile")}
              >
                Edit Profile
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 duration-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
