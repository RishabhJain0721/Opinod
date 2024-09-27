import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Opinod from "../Assets/opinodLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectCategory, logout } from "../Actions/actions";
import {
  faUser,
  faSearch,
  faIcons,
  faClapperboard,
  faMicrochip,
  faFlask,
  faNotesMedical,
  faBriefcase,
  faBars,
  faPersonRunning,
  faHeart,
  faComment,
  faCircleInfo,
  faCircleQuestion,
  faEarthAmericas,
  faXmark,
  faChevronDown,
  faGear,
  faChevronUp,
  faLightbulb,
  faBrain,
  faBook,
  faUserGraduate,
  faPencilRuler,
  faHouse,
  faLayerGroup,
  faChevronRight,
  faUsers,
  faRankingStar,
  faScaleBalanced,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";
import MobileSearch from "./MobileSearch";
import { toast } from "react-toastify";
import { forgotPassword } from "../APIs/AuthApis";

const Topbar = () => {
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
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    const handleScroll = async () => {
      if (window.scrollY > 75) setIsAtTop(false);
      else setIsAtTop(true);
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
    { "Poetry/Storytelling": "66f68b5f5d137e724b48d5b1" },
    { Motivational: "66f68ba55d137e724b48d5b3" },
    { Interviews: "66f68d4d5d137e724b48d5b4" },
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
      case "Poetry/Storytelling":
        return faPencilRuler;
      case "Motivational":
        return faLightbulb;
      case "Interviews":
        return faQuestion;
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
            className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
            onClick={async () => {
              try {
                await forgotPassword(email);
                toast.info("Password reset email sent.");
              } catch (error) {
                console.log(error);
              } finally {
                // setIsLoading(false);
              }
            }}
          >
            Change Password
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
    <div className=" fixed top-0 left-0 w-full z-50  bg-white border-b-2 border-gray-300 p-2.5 shadow-sm">
      <div className="flex items-center justify-between ">
        <div className="flex items-center justify-start w-full">
          <img
            src={Opinod}
            alt="Logo"
            className="w-11 h-11 mr-4 rounded-sm bg-gray-900"
            onClick={() => {
              navigate("/");
              dispatch(selectCategory(null));
            }}
          />
          {isHome && isAtTop && isMobile && (
            <h1 className="text-gray-800 font-League text-center mr-10 flex flex-col ml-16 md:ml-0">
              <div className="text-2xl font-semibold ml-3 md:ml-0">Opinod</div>
              <div className="text-xs text-gray-500 ml-3 md:ml-0">
                Engage Learn Grow
              </div>
            </h1>
          )}
          {!isMobile && (
            <h1 className="text-gray-800 font-League text-center mr-10 flex flex-col ml-16 md:ml-0">
              <div className="text-2xl font-semibold ml-3 md:ml-0">Opinod</div>
              <div className="text-xs text-gray-500 ml-3 md:ml-0">
                Engage Learn Grow
              </div>
            </h1>
          )}

          {isMobile && !isHome && (
            <div className="md:w-1/4 flex">
              <input
                type="text"
                className=" w-52 text-xs pl-3 py-2 border border-gray-300 border-r-0 rounded-l-full focus:outline-none focus:border-gray-800"
                placeholder="Search news/community posts"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="px-4 border border-gray-300 bg-gray-800 border-l-0 rounded-r-full text-white"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          )}

          {isMobile && isHome && !isAtTop && (
            <div className="md:w-1/4 flex">
              <input
                type="text"
                className="w-52 text-xs pl-3 py-2 border border-gray-300 border-r-0 rounded-l-full focus:outline-none focus:border-gray-800"
                placeholder="Search news/community posts"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="px-4 border border-gray-300 bg-gray-800 border-l-0 rounded-r-full text-white"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          )}

          {!isMobile && (
            <div className="flex flex-row ml-4 xl:ml-8 gap-x-5 xl:gap-x-8">
              {/* Home */}
              <h2
                className={`text-base  mb-2 text-gray-700 ${
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
                  className={`text-base cursor-pointer text-gray-700 ${
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
                  className={`text-base cursor-pointer text-gray-700 ${
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
                className={`text-base mb-2 text-gray-700 mt-3 ${
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

        {isMobile ? (
          <div>
            {location.pathname === "/profile" ? (
              <button
                className="md:hidden text-gray-800"
                onClick={handleSettings}
              >
                <FontAwesomeIcon icon={faGear} />{" "}
              </button>
            ) : (
              <button className="md:hidden" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />{" "}
              </button>
            )}

            {menuOpen && (
              <div>
                <div className="absolute right-0 top-0 h-screen w-64 overflow-auto font-League bg-gray-800 border-l-2 border-gray-300 p-2.5 shadow-sm">
                  {/* Closing menu button */}
                  <div
                    onClick={toggleMenu}
                    className="text-right text-white cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </div>

                  {/* Home */}
                  <h2
                    className="text-2xl font-semibold mb-2 text-white mt-5"
                    onClick={() => navigate("/")}
                  >
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
                        News Categories
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
                      {/* <button
                        className="block w-40  mt-4 py-1 mx-7 text-gray-800 rounded-lg bg-white"
                        onClick={handleAddCategory}
                      >
                        Add Category
                      </button> */}
                    </div>
                  )}

                  {/* Communities */}
                  <h2 className="text-lg mb-2 ml-5 text-white mt-5">
                    <div className="flex justify-between items-center mr-4">
                      <div>
                        <FontAwesomeIcon
                          icon={faUsers}
                          className="mr-1"
                          onClick={() => navigate("/communities")}
                        />
                        <span onClick={() => navigate("/communities")}>
                          {" "}
                          Community
                        </span>
                      </div>
                      <FontAwesomeIcon
                        icon={toggleCommunity ? faChevronDown : faChevronRight}
                        className="text-xs ml-3"
                        onClick={handleToggleCommunity}
                      />
                    </div>
                  </h2>
                  {toggleCommunity && (
                    <div>
                      <div>
                        <button className="flex items-center px-8 p-1 focus:outline-none text-white">
                          <FontAwesomeIcon
                            icon={faRankingStar}
                            className="mr-2"
                            onClick={() => {
                              navigate("/communities/main");
                            }}
                          />
                          <span
                            onClick={() => {
                              navigate("/communities/main");
                            }}
                          >
                            Main Topics
                          </span>
                          <FontAwesomeIcon
                            icon={showMainTopics ? faChevronUp : faChevronDown}
                            className=" text-xs ml-3"
                            onClick={toggleMainTopics}
                          />
                        </button>
                        {showMainTopics && (
                          <ul className="ml-10 mt-2 space-y-2 text-white">
                            {mainTopics.map((topic, index) => {
                              const [name, communityId] =
                                Object.entries(topic)[0];

                              return (
                                <div key={communityId}>
                                  <button
                                    onClick={() => {
                                      navigate(`/community/${communityId}`);
                                    }}
                                    className="flex justify-start"
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
                        <button className="flex items-center px-8 my-2 focus:outline-none text-white">
                          <FontAwesomeIcon
                            icon={faLightbulb}
                            className="mr-2"
                            onClick={() => {
                              navigate("/communities/special");
                            }}
                          />
                          <span
                            onClick={() => {
                              navigate("/communities/special");
                            }}
                          >
                            Special Interest
                          </span>
                          <FontAwesomeIcon
                            icon={
                              showSpecialInterestGroups
                                ? faChevronUp
                                : faChevronDown
                            }
                            className=" text-xs   ml-2"
                            onClick={toggleSpecialInterestGroups}
                          />
                        </button>
                        {showSpecialInterestGroups && (
                          <ul className="ml-10 mt-2 space-y-2 text-white">
                            {specialIntrestGroups.map((topic, index) => {
                              const [name, communityId] =
                                Object.entries(topic)[0];

                              return (
                                <div key={name}>
                                  <button
                                    onClick={() => {
                                      navigate(`/community/${communityId}`);
                                    }}
                                    className="flex justify-start"
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

                  {/* Profile */}
                  <h2 className="text-lg mb-2 ml-5 text-white mt-5">
                    <div
                      className="flex justify-between items-center mr-4"
                      onClick={() => navigate("/profile")}
                    >
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
                  )}
                </div>
              </div>
            )}
          </div>
        ) : username ? (
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
                  className={`${isSearch ? "text-gray-300" : "text-black"}`}
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

export default Topbar;
