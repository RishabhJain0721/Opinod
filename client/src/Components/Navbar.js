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
} from "@fortawesome/free-solid-svg-icons";
import { selectCategory } from "../Actions/actions";

const Navbar = () => {
  const username = useSelector((state) => state.user.username);
  let categories = useSelector((state) => state.user.categories);
  const initialSelectedCategory = useSelector(
    (state) => state.category.category
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory
  );

  const alsoVisit = ["Most Reacted", "Most Commented", "Help", "About"];

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
    if (category === selectedCategory) {
      setSelectedCategory(null);
      dispatch(selectCategory(null));
      navigate("/");
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

  const handleAddCategory = () => {
    if (!username) {
      alert("Please login first to add category");
      return;
    }
    navigate("/selectCategories");
  };

  return (
    <div className="relative ">
      <div className="min-h-screen h-max w-60 pt-10 mt-1 bg-blue-600 text-white fixed left-0 z-50 overflow-y-auto border-gray-300 border-r-2 border-t shadow-md">
        <div className="text-xl font-semibold mb-4 pl-6">CATEGORIES</div>
        <div className="pl-6">
          {Object.values(categories).map((cat) => (
            <div key={cat}>
              <button
                className={`flex items-center p-1 px-2 focus:outline-none ${
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
        </div>
        <button
          className="block w-48 ml-5 mt-4 py-2 text-gray-800 rounded-lg bg-white"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
        <div className="border-t border-gray-300 mt-4"></div>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
