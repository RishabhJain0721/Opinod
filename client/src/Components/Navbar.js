import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  // faXmark,
  faChevronDown,
  faChevronRight,
  faBarsProgress,
  faLayerGroup,
  faUsers,
  // faPencil,
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
} from "@fortawesome/free-solid-svg-icons";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

const Navbar = () => {
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
  const initialSelectedCategory = useSelector(
    (state) => state.category.category
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory
  );
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleCommunity, setToggleCommunity] = useState(false);
  const [toggleSettings, setToggleSettings] = useState(false);
  const [showMainTopics, setShowMainTopics] = useState(false);
  const [showSpecialInterestGroups, setShowSpecialInterestGroups] =
    useState(false);

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
    { "Quiz Discussions": "66858c5444d20fd45e533bc1" },
  ];

  const handleCategorySelect = (category) => {
    // if (!username) {
    //   alert("Please login first to view more");
    //   return;
    // }
    console.log(category);
    if (category === selectedCategory) {
      setSelectedCategory(null);
      dispatch(selectCategory(null));
      navigate("/");
      return;
    }
    setSelectedCategory(category);
    dispatch(selectCategory(category));
    // if (category === "Most Commented") {
    //   navigate("/category/MostCommented");
    //   return;
    // }
    // if (category === "Most Reacted") {
    //   navigate("/category/MostReacted");
    //   return;
    // }
    navigate(`/category/${category}`);
    // window.location.reload();
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
      case "Book & Article Reviews":
        return faBook;
      case "Quiz Discussions":
        return faPencilRuler;
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

  // const handleAddCategory = () => {
  //   if (!username) {
  //     alert("Please login first to add category");
  //     return;
  //   }
  //   navigate("/selectCategories");
  // };

  const handleToggleCategory = () => {
    setToggleCategory(!toggleCategory);
  };

  const handleToggleCommunity = () => {
    setToggleCommunity(!toggleCommunity);
  };

  const handleToggleSettings = () => {
    setToggleSettings(!toggleSettings);
  };

  const toggleMainTopics = () => {
    setShowMainTopics(!showMainTopics);
  };

  const toggleSpecialInterestGroups = () => {
    setShowSpecialInterestGroups(!showSpecialInterestGroups);
  };

  return (
    <div>
      <div className="fixed left-0 top-16 h-screen w-60 overflow-auto font-League bg-blue-600 border-r-2 border-gray-300 p-2.5 shadow-sm no-scrollbar">
        {/* Home */}
        <h2 className="text-2xl font-semibold mb-2 text-white mt-5">
          <div
            className="flex justify-between items-center mr-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
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
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faLayerGroup} className="mr-1" /> News
              Categories
            </div>
            <FontAwesomeIcon
              icon={toggleCategory ? faChevronDown : faChevronRight}
              className="text-xs ml-3 cursor-pointer"
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
                  <FontAwesomeIcon icon={selectIcon(cat)} className="mr-2" />
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
            <div className="cursor-pointer">
              <FontAwesomeIcon
                icon={faUsers}
                className="mr-1"
                onClick={() => navigate("/communities")}
              />
              <span onClick={() => navigate("/communities")}> Community</span>
            </div>
            <FontAwesomeIcon
              icon={toggleCommunity ? faChevronDown : faChevronRight}
              className="text-xs ml-3 cursor-pointer"
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
                    const [name, communityId] = Object.entries(topic)[0];

                    return (
                      <div key={name}>
                        <button
                          onClick={() => {
                            navigate(`/community/${communityId}/posts`);
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
                  icon={showSpecialInterestGroups ? faChevronUp : faChevronDown}
                  className=" text-xs   ml-2"
                  onClick={toggleSpecialInterestGroups}
                />
              </button>
              {showSpecialInterestGroups && (
                <ul className="ml-10 mt-2 space-y-2 text-white">
                  {specialIntrestGroups.map((topic, index) => {
                    const [name, communityId] = Object.entries(topic)[0];

                    return (
                      <div key={name}>
                        <button
                          onClick={() => {
                            navigate(`/community/${communityId}/posts`);
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

        {/* Quizzes and Challenges
        <h2 className="text-lg mb-2 ml-5 text-white mt-5">
          <div className="flex justify-between items-center mr-4">
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faPencil} className="mr-1" /> Quiz /
              Challenges
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-xs ml-3 cursor-pointer"
            />
          </div>
        </h2> */}

        {/* Settings */}
        <h2
          className="text-lg mb-2 ml-5 text-white mt-5"
          onClick={handleToggleSettings}
        >
          <div className="flex justify-between items-center mr-4">
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faGear} className="mr-1" /> Settings{" "}
            </div>
            <FontAwesomeIcon
              icon={toggleSettings ? faChevronDown : faChevronRight}
              className="text-xs ml-3 cursor-pointer"
            />
          </div>
        </h2>
        {toggleSettings && (
          <>
            <button
              className="flex items-center p-1 px-8 my-0 focus:outline-none text-white"
              onClick={() => {}}
            >
              <FontAwesomeIcon icon={faBarsProgress} className="mr-2" />
              Manage
            </button>
            <button
              className="flex items-center p-1 px-8 my-0 focus:outline-none text-white"
              onClick={() => {}}
            >
              <FontAwesomeIcon icon={faCircleQuestion} className="mr-2" />
              Help
            </button>
          </>
        )}

        {/* Profile */}
        <h2 className="text-lg mb-2 ml-5 text-white mt-5">
          <div
            className="flex justify-between items-center mr-4"
            onClick={() => navigate("/profile")}
          >
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faUser} className="mr-1" /> Profile{" "}
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-xs ml-3 cursor-pointer"
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

      {/* <div className="border-t border-gray-300 mt-4"></div>
        <div className="text-xl font-semibold mb-4 mt-4 pl-6">ALSO VISIT</div>
        <div className="pl-6">
          {alsoVisit.map((category) => (
            <div key={category}>
              <button
                className={`flex items-center p-1 px-2 focus:outline-none ${
                  selectedCategory === category
                    ? "bg-blue-100 rounded-md text-gray-800"
                    : "text-white"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <FontAwesomeIcon icon={selectIcon(category)} className="mr-2" />
                {category}
              </button>
            </div>
          ))}
        </div> */}
    </div>
  );
};

export default Navbar;
