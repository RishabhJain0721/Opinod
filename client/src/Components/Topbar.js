import React, { useEffect, useState } from "react";
import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { refreshNews } from "../Actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectCategory } from "../Actions/actions";
import {
  faBell,
  faUser,
  faSearch,
  faRightToBracket,
  faUserPlus,
  faBars,
  faIcons,
  faClapperboard,
  faMicrochip,
  faFlask,
  faNotesMedical,
  faBriefcase,
  faPersonRunning,
  faHeart,
  faComment,
  faCircleInfo,
  faCircleQuestion,
  faEarthAmericas,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  let categories = useSelector((state) => state.user.categories);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const alsoVisit = ["Most Reacted", "Most Commented", "Help", "About"];

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!username) {
    //Default categories before login
    categories = [
      "General",
      "Entertainment",
      "Technology",
      "Science",
      "Health",
      "Business",
      "Sports",
      "World",
    ];
  }

  const handleCategorySelect = (category) => {
    if (!username) {
      alert("Please login first to view more");
      return;
    }
    setSelectedCategory(category);
    dispatch(selectCategory(category));
    if (category === "Most Commented") {
      navigate("/category/MostCommented");
      return;
    }
    if (category === "Most Reacted") {
      navigate("/category/MostReacted");
      return;
    }
    navigate(`/category/${category}`);
  };

  const handleAddCategory = () => {
    if (!username) {
      alert("Please login first to add category");
      return;
    }
    navigate("/selectCategories");
  };

  const selectIcon = (category) => {
    switch (category) {
      case "General":
        return faIcons;
      case "Entertainment":
        return faClapperboard;
      case "Technology":
        return faMicrochip;
      case "Science":
        return faFlask;
      case "Health":
        return faNotesMedical;
      case "Business":
        return faBriefcase;
      case "Sports":
        return faPersonRunning;
      case "World":
        return faEarthAmericas;
      case "Most Reacted":
        return faHeart;
      case "Most Commented":
        return faComment;
      case "Help":
        return faCircleQuestion;
      case "About":
        return faCircleInfo;
      default:
        return faClapperboard;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50  bg-white border-b-2 border-gray-300 p-2.5 shadow-sm">
      <div className="flex items-center justify-between ">
        <div className="flex items-center justify-start">
          <img
            src={logo}
            alt="Logo"
            className="w-11 h-11 mr-4 rounded-sm"
            onClick={() => {
              navigate("/");
              dispatch(selectCategory(null));
            }}
          />
          <h1 className="text-gray-800 font-League text-center mr-10 flex flex-col">
            <div className="text-2xl font-semibold">Opinod</div>
            <div className="text-xs">Share Learn Grow</div>
          </h1>
          <div className="md:w-1/4 relative hidden md:flex">
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

        <div className="ml-auto mr-4">
          <button
            className="bg-blue-500 px-4 py-1 text-sm md:text-lg rounded-full text-white"
            onClick={() => {
              dispatch(refreshNews());
              window.location.reload();
            }}
          >
            Refresh news
          </button>
        </div>

        {isMobile ? (
          <div>
            <button className="md:hidden" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />{" "}
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-0 h-screen w-64 overflow-auto font-League bg-blue-500 border-l-2 border-gray-300 p-2.5 shadow-sm">
                <div
                  onClick={toggleMenu}
                  className="text-right text-white cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </div>
                {username && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-3 text-white mt-5">
                      <div>Navigate</div>
                    </h2>
                    <button
                      className="flex items-center p-1 px-2 my-1 focus:outline-none text-white"
                      onClick={() => navigate("/notifications")}
                    >
                      <FontAwesomeIcon icon={faBell} className="mr-2" />
                      Notifications
                    </button>
                    <button
                      className="flex items-center justify-center p-1 px-2 my-1 focus:outline-none text-white"
                      onClick={() => navigate("/profile")}
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      <div>Profile</div>
                    </button>
                  </div>
                )}
                <h2 className="text-2xl font-semibold mb-3 text-white mt-5">
                  <div>Categories</div>
                </h2>
                <div>
                  {Object.values(categories).map((cat) => (
                    <div key={cat}>
                      <button
                        className={`flex items-center p-1 px-2 my-1 focus:outline-none ${
                          selectedCategory === cat
                            ? "bg-blue-100 rounded-md text-gray-800"
                            : "text-white"
                        }`}
                        onClick={() => handleCategorySelect(cat)}
                      >
                        <FontAwesomeIcon
                          icon={selectIcon(cat)}
                          className="mr-2"
                        />
                        {cat}
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="block w-full mt-4 py-2 text-gray-800 rounded-lg bg-white"
                  onClick={handleAddCategory}
                >
                  Add Category
                </button>
                <h2 className="text-2xl font-semibold mt-7 mb-3 text-white">
                  See More
                </h2>
                <div>
                  {alsoVisit.map((category) => (
                    <div key={category}>
                      <button
                        className={`flex items-center p-1 px-2 my-1 focus:outline-none ${
                          selectedCategory === category
                            ? "bg-blue-100 rounded-md text-gray-800"
                            : "text-white"
                        }`}
                        onClick={() => handleCategorySelect(category)}
                      >
                        <FontAwesomeIcon
                          icon={selectIcon(category)}
                          className="mr-2"
                        />
                        {category}
                      </button>
                    </div>
                  ))}
                </div>
                {username ? (
                  <button
                    onClick={() => navigate("/logout")}
                    className="block w-full mt-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 mb-20"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="block w-full mt-4 py-2 text-gray-800 rounded-lg bg-white mb-20"
                  >
                    LOGIN
                  </button>
                )}
              </div>
            )}
          </div>
        ) : username ? (
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
