import React, { useEffect, useState } from "react";
import Opinod from "../Assets/opinodLogo.png";
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
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faBarsProgress,
  faLayerGroup,
  faUsers,
  faPencil,
  faGear,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  let categories = useSelector((state) => state.user.categories);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleCommunity, setToggleCommunity] = useState(false);
  const [toggleSettings, setToggleSettings] = useState(false);

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

  const handleToggleCategory = () => {
    setToggleCategory(!toggleCategory);
  };

  const handleToggleCommunity = () => {
    setToggleCommunity(!toggleCommunity);
  };

  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50  bg-white border-b-2 border-gray-300 p-2.5 shadow-sm">
      <div className="flex items-center justify-between ">
        <div className="flex items-center justify-start">
          <img
            src={Opinod}
            alt="Logo"
            className="w-11 h-11 mr-4 rounded-sm bg-blue-500"
            onClick={() => {
              navigate("/");
              dispatch(selectCategory(null));
            }}
          />
          <h1 className="text-gray-800 font-League text-center mr-10 flex flex-col">
            <div className="text-2xl font-semibold">Opinod</div>
            <div className="text-xs text-gray-500">Share Learn Grow</div>
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
              <div>
                <div className="absolute right-0 top-0 h-screen w-64 overflow-auto font-League bg-blue-500 border-l-2 border-gray-300 p-2.5 shadow-sm">
                  {/* Closing menu button */}
                  <div
                    onClick={toggleMenu}
                    className="text-right text-white cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>

                  {/* Home */}
                  <h2 className="text-2xl font-semibold mb-2 text-white mt-5">
                    <div className="flex justify-between items-center mr-4">
                      <div>
                        <FontAwesomeIcon icon={faHouse} className="mr-2" /> Home
                      </div>
                    </div>
                  </h2>

                  {/* Categories */}
                  <h2
                    className="text-lg mb-2 ml-5 text-white mt-5"
                    onClick={handleToggleCategory}
                  >
                    <div className="flex justify-between items-center mr-4">
                      <div>
                        <FontAwesomeIcon icon={faLayerGroup} className="mr-1" />{" "}
                        New Categories
                      </div>
                      <FontAwesomeIcon
                        icon={toggleCategory ? faChevronDown : faChevronRight}
                        className="text-xs ml-3"
                      />
                    </div>
                  </h2>
                  {toggleCategory && (
                    <div>
                      {Object.values(categories).map((cat) => (
                        <div key={cat}>
                          <button
                            className={`flex items-center p-1 px-8 my-0 focus:outline-none ${
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
                      <button
                        className="block w-40  mt-4 py-1 mx-7 text-gray-800 rounded-lg bg-white"
                        onClick={handleAddCategory}
                      >
                        Add Category
                      </button>
                    </div>
                  )}

                  {/* Communities */}
                  <h2
                    className="text-lg mb-2 ml-5 text-white mt-5"
                    onClick={handleToggleCommunity}
                  >
                    <div className="flex justify-between items-center mr-4">
                      <div>
                        <FontAwesomeIcon icon={faUsers} className="mr-1" />{" "}
                        Community
                      </div>
                      <FontAwesomeIcon
                        icon={toggleCommunity ? faChevronDown : faChevronRight}
                        className="text-xs ml-3"
                      />
                    </div>
                  </h2>

                  {/* Quizzes and Challenges */}
                  <h2 className="text-lg mb-2 ml-5 text-white mt-5">
                    <div className="flex justify-between items-center mr-4">
                      <div>
                        <FontAwesomeIcon icon={faPencil} className="mr-1" />{" "}
                        Quiz / Challenges
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-xs ml-3"
                      />
                    </div>
                  </h2>

                  {/* Settings */}
                  <h2
                    className="text-lg mb-2 ml-5 text-white mt-5"
                    onClick={handleToggleSettings}
                  >
                    <div className="flex justify-between items-center mr-4">
                      <div>
                        <FontAwesomeIcon icon={faGear} className="mr-1" />{" "}
                        Settings{" "}
                      </div>
                      <FontAwesomeIcon
                        icon={toggleSettings ? faChevronDown : faChevronRight}
                        className="text-xs ml-3"
                      />
                    </div>
                  </h2>
                  {toggleSettings && (
                    <>
                      <button
                        className="flex items-center p-1 px-8 my-0 focus:outline-none text-white"
                        onClick={() => {}}
                      >
                        <FontAwesomeIcon
                          icon={faBarsProgress}
                          className="mr-2"
                        />
                        Manage preferences
                      </button>
                      <button
                        className="flex items-center p-1 px-8 my-0 focus:outline-none text-white"
                        onClick={() => {}}
                      >
                        <FontAwesomeIcon
                          icon={faCircleQuestion}
                          className="mr-2"
                        />
                        Help
                      </button>
                    </>
                  )}

                  {/* Profile */}
                  <h2 className="text-lg mb-2 ml-5 text-white mt-5">
                    <div className="flex justify-between items-center mr-4">
                      <div>
                        <FontAwesomeIcon icon={faUser} className="mr-1" />{" "}
                        Profile{" "}
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-xs ml-3"
                      />
                    </div>
                  </h2>

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
