import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Image from "../Assets/im.jpg";
import { selectCategories } from "../APIs/UserDetailsApis";
import { useSelector, useDispatch } from "react-redux";
import { updateCategories } from "../Actions/actions";

const SelectCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const oldCategories = useSelector((state) => state.user.categories);

  // Initialize the categories state with the old categories
  const [categories, setCategories] = useState({
    General: oldCategories.includes("General"),
    Business: oldCategories.includes("Business"),
    Entertainment: oldCategories.includes("Entertainment"),
    Health: oldCategories.includes("Health"),
    Science: oldCategories.includes("Science"),
    Sports: oldCategories.includes("Sports"),
    Technology: oldCategories.includes("Technology"),
    World: oldCategories.includes("World"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(categories).every((val) => val === false)) {
      alert("Please select at least one category.");
      return;
    }

    try {
      const res = await selectCategories(username, categories);
      console.log("Response : ", res);

      // Update the categories in the Redux store after converting the object to an array
      const categoriesArray = Object.keys(categories).filter(
        (category) => categories[category] === true
      );
      dispatch(updateCategories(categoriesArray));

      navigate("/updateProfile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleSelection = (category) => {
    console.log("Category : ", categories);
    setCategories({
      ...categories,
      [category]: !categories[category],
    });
  };

  const cat = [
    "General",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sports",
    "Technology",
    "World",
  ];

  return (
    <div>
      <Topbar />
      <div className="flex flex-col lg:flex-row px-5 sm:ml-10 mx-auto mt-24 items-center justify-center">
        <div className="h-2/4 md:w-1/2">
          <div className="text-3xl mt-14 mb-14 text-blue-500 font-medium">
            SELECT CATEGORIES
          </div>
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            {cat.map((category) => (
              <div
                className={`border ${
                  categories[category]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 border-gray-400"
                } px-3 py-2 mr-2 my-2 rounded-3xl text-base w-fit cursor-pointer`}
                onClick={() => toggleSelection(category)}
                id={category}
                key={category}
              >
                {category}
              </div>
            ))}
          </form>
          <div>
            <button
              className="bg-blue-500 text-white text-xl px-3 py-2 w-full rounded-lg mt-14"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className=" h-96">
          <img
            src={Image}
            alt="Failed to load"
            className="h-1/2 sm:h-2/3 lg:h-full mt-10 ml-0 lg:ml-10"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectCategories;
