import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SubcategoryCard = ({ name, image }) => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const handleGoToSubcategory = () => {
    if (!username) {
      return toast.info("Please login to view more!");
    }
    navigate(`/subcategory/${name.replace(/\s/g, "-")}`);
  };

  return (
    <div className="bg-white flex-wrap w-1/3 md:w-1/5 py-4 mb-2 mt-2 cursor-pointer">
      <div className="flex flex-col items-center mb-2">
        <img
          src={image}
          alt="subcategory"
          className="h-16 w-16 rounded-full"
          onClick={handleGoToSubcategory}
        />
        <div className="w-full flex flex-col items-center justify-between">
          <div
            className="text-sm md:text-base text-center font-medium text-gray-700 mt-3 mb-1"
            onClick={handleGoToSubcategory}
          >
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCard;
