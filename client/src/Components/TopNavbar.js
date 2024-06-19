import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { selectCategory } from "../Actions/actions";

const TopNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const categories = useSelector((state) => state.user.categories);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);

  const handleCategorySelect = (category) => {
    if (!username) {
      alert("Please login first to view more");
      return;
    }
    dispatch(selectCategory(category));
    setIsCategoriesOpen(false);
    setIsSeeMoreOpen(false);
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

  const alsoVisit = ["Most Reacted", "Most Commented", "Help", "About"];

  return (
    <div className="fixed left-0 w-full z-50 bg-white border-b-2 border-gray-300 p-2.5 shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative group">
          <button
            className="flex items-center p-1 px-2 focus:outline-none text-gray-600 text-sm"
            onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          >
            Categories{" "}
            <FontAwesomeIcon
              icon={isCategoriesOpen ? faChevronUp : faChevronDown}
              className="ml-2"
            />
          </button>
          {isCategoriesOpen && (
            <div className="absolute bg-white border border-gray-200 shadow-md ">
              {Object.values(categories).map((category) => (
                <button
                  key={category}
                  className="flex items-center p-1 px-2 focus:outline-none text-gray-600 w-full text-left"
                  onClick={() => handleCategorySelect(category)}
                >
                  <FontAwesomeIcon
                    icon={selectIcon(category)}
                    className="mr-2"
                  />
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative group ml-4">
          <button
            className="flex items-center p-1 px-2 focus:outline-none text-gray-600 text-sm"
            onClick={() => setIsSeeMoreOpen(!isSeeMoreOpen)}
          >
            See More{" "}
            <FontAwesomeIcon
              icon={isSeeMoreOpen ? faChevronUp : faChevronDown}
              className="ml-2"
            />
          </button>
          {isSeeMoreOpen && (
            <div className="absolute bg-white border border-gray-200 shadow-md w-max">
              {alsoVisit.map((item) => (
                <button
                  key={item}
                  className="flex items-center p-1 px-2 focus:outline-none text-gray-600 w-full text-left"
                  onClick={() => handleCategorySelect(item)}
                >
                  <FontAwesomeIcon icon={selectIcon(item)} className="mr-2" />
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <div className="flex items-center">
        {username ? (
          <span className="mr-4 text-gray-600">Hello, {username}</span>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-full"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div> */}
    </div>
  );
};

export default TopNavbar;
