import React from "react";
import { useNavigate } from "react-router-dom";

const SubcategoryCard = ({ id, name, image }) => {
  const navigate = useNavigate();

  const handleGoToSubcategory = () => {
    navigate(`/community/${id}`);
  };

  return (
    <div className="bg-white flex-wrap w-1/3 md:rounded-lg md:border md:border-gray-300 md:shadow-sm mb-2 mt-2 cursor-pointer">
      {/* Profile photo and name */}
      <div className="flex flex-col items-center mb-2">
        <img
          src={image}
          alt="Profile"
          className=" h-16 w-16 rounded-full"
          onClick={handleGoToSubcategory}
        />
        <div className="w-full flex flex-col items-center justify-between">
          {/* Title */}
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
