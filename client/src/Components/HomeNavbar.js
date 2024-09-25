import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Opinod from "../Assets/opinodLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectCategory, logout } from "../Actions/actions";
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
  faChevronRight,
  faBarsProgress,
  faLayerGroup,
  faUsers,
  faPencil,
  faGear,
  faHouse,
  faChevronUp,
  faRankingStar,
  faLightbulb,
  faBrain,
  faBook,
  faUserGraduate,
  faPencilRuler,
  faScaleBalanced,
  faCross,
} from "@fortawesome/free-solid-svg-icons";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";
import MobileSearch from "./MobileSearch";
import { toast } from "react-toastify";

const HomeNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  let categories = [
    "General",
    "Entertainment",
    "Technology",
    "Science",
    "Health",
    "Business",
    "Sports",
    "World",
  ];
  const [isHome, setIsHome] = useState(
    location.pathname === "/" ? true : false
  );
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtTopPc, setIsAtTopPc] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleCommunity, setToggleCommunity] = useState(false);
  // const [toggleSettings, setToggleSettings] = useState(false);
  const [showMainTopics, setShowMainTopics] = useState(false);
  const [showSpecialInterestGroups, setShowSpecialInterestGroups] =
    useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    const handleScroll = async () => {
      if (window.scrollY > 75) setIsAtTop(false);
      else setIsAtTop(true);
      if (window.scrollY > 150) setIsAtTopPc(false);
      else setIsAtTopPc(true);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setIsSearch(!isSearch);
  };

  const mainTopics = [
    { "World News": "6687e1617a839bf9ff5c6553" },
    { Politics: "6687e1617a839bf9ff5c6554" },
    { Business: "6687e1617a839bf9ff5c6555" },
    { Technology: "6687e1617a839bf9ff5c6556" },
    { Science: "6687e1617a839bf9ff5c6557" },
    { Health: "6687e1617a839bf9ff5c6558" },
    { Environment: "6687e1617a839bf9ff5c6559" },
    { Sports: "6687e1617a839bf9ff5c655a" },
    { Entertainment: "6687e1617a839bf9ff5c655b" },
  ];

  const specialIntrestGroups = [
    { "Expert Opinions": "66858c5444d20fd45e533bbe" },
    { "Educational Resources": "66858c5444d20fd45e533bbf" },
    { "Book & Article Reviews": "66858c5444d20fd45e533bc0" },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    dispatch(selectCategory(category));
    navigate(`/category/${category}`);
    window.location.reload();
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
      case "Expert Opinions":
        return faBrain;
      case "Educational Resources":
        return faUserGraduate;
      case "Book and Article Reviews":
        return faBook;
      case "World News":
        return faEarthAmericas;
      case "Politics":
        return faScaleBalanced;
      case "Environment":
        return faPagelines;

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

  // const handleToggleSettings = () => {
  //   setToggleSettings(!toggleSettings);
  // };

  const toggleMainTopics = () => {
    setShowMainTopics(!showMainTopics);
  };

  const toggleSpecialInterestGroups = () => {
    setShowSpecialInterestGroups(!showSpecialInterestGroups);
  };

  const handleSearch = async () => {
    if (!searchText) {
      toast.error("Please enter something");
      return;
    }
    navigate(`/search/${searchText}`);
  };

  const handleSettings = () => {
    toast.info(<DropDown />, {
      autoClose: false,
      closeOnClick: true,
      draggable: true,
      icon: false,
    });
  };

  const DropDown = () => {
    return (
      <div className="w-64 rounded-md ">
        <ul className="list-none p-0 m-0">
          <li
            className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/updateProfile")}
          >
            Edit Profile
          </li>
          <li
            className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            onClick={() => navigate("/selectCategories")}
          >
            Change Categories
          </li>
          <li
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => {
              toast.info("Please mail us at abs@gmail.com");
            }}
          >
            Help and Support
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50  bg-white border-b-2 border-gray-300 p-2.5 shadow-sm">
      {isAtTopPc && (
        <>
          <div className="text-6xl m-3 flex items-center justify-center w-full">
            {/* <div className="flex items-center justify-between "> */}
            <img
              src={Opinod}
              alt="Logo"
              className="w-14 h-14 lg:w-16 lg:h-16 absolute left-0 top-0 mt-6 ml-4 rounded-md bg-gray-900"
              onClick={() => {
                navigate("/");
                dispatch(selectCategory(null));
              }}
            />
            <span className="font-Playfair font-medium">OPINOD</span>
            {/* </div> */}
          </div>
          <div className="text-center text-sm m-3 flex justify-center gap-x-32 lg:gap-x-48 mt-10">
            <div>
              <span className="text-2xl font-Flower font-bold">ENGAGE</span>{" "}
              <br />
              Share opinions
            </div>
            <div>
              <span className="text-2xl font-Flower font-bold">LEARN</span>{" "}
              <br />
              Gain Insights
            </div>
            <div>
              <span className="text-2xl font-Flower font-bold">GROW </span>
              <br />
              Build Influence
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-between ">
        {!isAtTopPc && (
          <>
            <img
              src={Opinod}
              alt="Logo"
              className="w-11 h-11 mr-4 rounded-sm bg-gray-900"
              onClick={() => {
                navigate("/");
                dispatch(selectCategory(null));
              }}
            />
            <h1 className="text-gray-800 font-League text-center mr-10 flex flex-col ml-16 md:ml-0">
              <div className="text-2xl font-semibold ml-3 md:ml-0">Opinod</div>
              <div className="text-xs text-gray-500 ml-3 md:ml-0 w-28">
                Engage Learn Grow
              </div>
            </h1>
          </>
        )}
        <div className="flex items-center justify-start w-full">
          {!isMobile && (
            <div className="flex flex-row ml-4 xl:ml-8 gap-x-5 xl:gap-x-8">
              {/* Home */}
              <h2
                className={`text-base  mb-2 text-gray-800 ${
                  isSearch ? "hidden lg:inline" : ""
                } mt-3 `}
                onClick={() => navigate("/")}
              >
                <div className="flex justify-center items-center cursor-pointer">
                  {/* <FontAwesomeIcon icon={faHouse} className="mr-2" />  */}
                  Home
                </div>
              </h2>
              <div className="relative">
                <h2
                  className={`text-base cursor-pointer text-gray-800 ${
                    isSearch ? "hidden lg:inline" : ""
                  }`}
                  onClick={handleToggleCategory}
                >
                  <div className="flex justify-center items-center mt-3">
                    <div className="flex items-center">
                      {/* <FontAwesomeIcon icon={faLayerGroup} className="mr-1" />{" "} */}
                      Categories
                    </div>
                    <FontAwesomeIcon
                      icon={toggleCategory ? faChevronUp : faChevronDown}
                      className="text-xs ml-2 w-3"
                    />
                  </div>
                </h2>

                {toggleCategory && (
                  <div className="absolute top-full mt-2 left-0 bg-white border rounded-md shadow-lg z-50">
                    {Object.values(categories).map((cat) => (
                      <div key={cat}>
                        <button
                          className={`flex text-sm items-center px-2 py-1 w-full focus:outline-none ${
                            selectedCategory === cat
                              ? "bg-blue-100 rounded-md text-gray-800"
                              : "text-gray-800"
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
                )}
              </div>
              {/* Communities */}
              <div className="relative">
                <h2
                  className={`text-base cursor-pointer text-gray-800 ${
                    isSearch ? "hidden lg:inline" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                      <span onClick={() => navigate("/communities")}>
                        Community
                      </span>
                    </div>
                    <FontAwesomeIcon
                      icon={toggleCommunity ? faChevronUp : faChevronDown}
                      className="text-xs ml-2 w-3"
                      onClick={handleToggleCommunity}
                    />
                  </div>
                </h2>

                {toggleCommunity && (
                  <div className="absolute top-full mt-2 left-0 bg-white border rounded-md shadow-lg z-50">
                    <div>
                      <button className="flex text-sm items-center px-2 py-1 focus:outline-none text-gray-800">
                        {/* <FontAwesomeIcon
                        icon={faRankingStar}
                        className="mr-2"
                        onClick={() => navigate("/communities/main")}
                      /> */}
                        <span onClick={() => navigate("/communities/main")}>
                          Main Topics
                        </span>
                        <FontAwesomeIcon
                          icon={showMainTopics ? faChevronUp : faChevronDown}
                          className="text-xs ml-3"
                          onClick={toggleMainTopics}
                        />
                      </button>

                      {showMainTopics && (
                        <ul className="ml-5 mb-3 mt-2 space-y-2 text-gray-800">
                          {mainTopics.map((topic, index) => {
                            const [name, communityId] =
                              Object.entries(topic)[0];

                            return (
                              <div key={communityId}>
                                <button
                                  onClick={() =>
                                    navigate(`/community/${communityId}`)
                                  }
                                  className="flex justify-start items-center text-sm"
                                >
                                  <FontAwesomeIcon
                                    icon={selectIcon(name)}
                                    className="mr-2"
                                  />
                                  {name}
                                </button>
                              </div>
                            );
                          })}
                        </ul>
                      )}
                    </div>

                    <div>
                      <button className="flex items-center px-2 py-1 w-40 text-sm focus:outline-none text-gray-800">
                        {/* <FontAwesomeIcon
                        icon={faLightbulb}
                        className="mr-2"
                        onClick={() => navigate("/communities/special")}
                      /> */}
                        <span onClick={() => navigate("/communities/special")}>
                          Special Interest
                        </span>
                        <FontAwesomeIcon
                          icon={
                            showSpecialInterestGroups
                              ? faChevronUp
                              : faChevronDown
                          }
                          className="text-xs ml-2"
                          onClick={toggleSpecialInterestGroups}
                        />
                      </button>

                      {showSpecialInterestGroups && (
                        <ul className="ml-5 w-48 mb-4 mt-2 space-y-2 text-gray-800">
                          {specialIntrestGroups.map((topic, index) => {
                            const [name, communityId] =
                              Object.entries(topic)[0];

                            return (
                              <div key={communityId}>
                                <button
                                  onClick={() =>
                                    navigate(`/community/${communityId}`)
                                  }
                                  className="flex justify-start items-center text-sm"
                                >
                                  <FontAwesomeIcon
                                    icon={selectIcon(name)}
                                    className="mr-2"
                                  />
                                  {name}
                                </button>
                              </div>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Profile */}
              <h2
                className={`text-base mb-2 text-gray-800 mt-3 ${
                  isSearch ? "hidden lg:inline" : ""
                }`}
              >
                <div
                  className="flex justify-between items-center mr-4 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <div>
                    {/* <FontAwesomeIcon icon={faUser} className="mr-1" />  */}
                    Profile{" "}
                  </div>
                  {/* <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-xs ml-3"
                /> */}
                </div>
              </h2>
              {/* {username ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
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
            )} */}
            </div>
          )}

          {!isMobile && isSearch && (
            <div className="flex w-2/3 lg:w-1/3 ml-auto">
              <input
                type="text"
                className=" w-full text-xs pl-3 pr-2 py-3 border border-gray-300 border-r-0 rounded-l-lg focus:outline-none focus:border-gray-800"
                placeholder="Search news/community posts"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="px-4 border border-gray-300 bg-gray-800 border-l-0  text-white"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <button
                className="px-2 border border-gray-300 bg-red-500 border-l-0 rounded-r-lg text-white"
                onClick={toggleSearch}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          )}
        </div>
        {username ? (
          <div className="flex items-center">
            <div className="flex items-center space-x-4 text-gray-800">
              <FontAwesomeIcon
                icon={faSearch}
                onClick={toggleSearch}
                className={`${isSearch ? "hidden" : "text-black"}`}
              />

              {location.pathname === "/profile" && (
                <button
                  className="text-xl sm:px-2 px-1 text-gray-800"
                  onClick={handleSettings}
                >
                  <FontAwesomeIcon icon={faGear} />{" "}
                </button>
              )}

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
                  icon={faSearch}
                  onClick={toggleSearch}
                  className={`${isSearch ? "hidden" : "text-black"}`}
                />
              </button>
              <button
                className="text-xl sm:px-2 px-1"
                onClick={() => {
                  navigate("/login");
                }}
              >
                LOGIN
                {/* <FontAwesomeIcon icon={faRightToBracket} /> */}
              </button>
              <button
                className="text-xl sm:px-2 px-1"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                SIGNUP
                {/* <FontAwesomeIcon icon={faUserPlus} /> */}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeNavbar;
