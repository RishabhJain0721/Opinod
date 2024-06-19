import React from "react";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshNews } from "../Actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faSearch,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b-2 border-gray-300 p-2.5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <img
            src={logo}
            alt="Logo"
            className="w-11 h-11 mr-4 rounded-sm"
            onClick={() => navigate("/")}
          />
          <h1 className="text-2xl text-gray-800 font-semibold font-League mr-10 hidden md:block">
            Brand Name
          </h1>
          <div className="md:w-1/4 flex relative">
            <input
              type="text"
              className="w-32 sm:w-auto px-3 sm:px-4 py-1 sm:py-1.5 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
              placeholder="Search news"
            />
            <button className="px-4 bg-blue-500 rounded-r-full text-white">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        {/* <div>
          <button
            className="bg-blue-500 px-4 py-1 text-sm md:text-lg rounded-full text-white"
            onClick={() => {
              dispatch(refreshNews());
            }}
          >
            Refresh news
          </button>
        </div> */}

        {username ? (
          <div className="flex items-center">
            <div className="flex items-center space-x-4 text-gray-800">
              <button className="text-xl sm:px-2 px-1">
                <FontAwesomeIcon
                  icon={faBell}
                  onClick={() => {
                    navigate("/notifications");
                  }}
                />
              </button>
              <button className="text-xl sm:px-2 px-1">
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="flex items-center space-x-4 text-gray-800">
              <button className="text-xl sm:px-2 px-1">
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  onClick={() => {
                    navigate("/login");
                  }}
                />
              </button>
              <button className="text-xl sm:px-2 px-1">
                <FontAwesomeIcon
                  icon={faUserPlus}
                  onClick={() => {
                    navigate("/signup");
                  }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
