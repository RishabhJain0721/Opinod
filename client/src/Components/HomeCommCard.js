import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const HomeCommCard = ({
  id,
  name,
  image,
  subcategories,
  description,
  subscribers,
  posts,
  topPostTitle,
  topPostId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state) => state.user.username);
  const [loading, setLoading] = useState(false);

  const handleGoToCommunity = () => {
    navigate(`/community/${id}`);
  };

  return (
    <div
      className="max-w-sm rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
      onClick={handleGoToCommunity}
    >
      <div className="relative">
        {/* Background Image */}
        <img
          className="w-full h-32  md:h-48 object-cover"
          src={image}
          alt="Community"
        />

        {/* Title - Overlapping Text */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <h1 className="text-white text-xl lg:text-3xl text-center font-bold">
            {name}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="p-2 md:p-4 text-xs md:text-sm">
        {/* <p className="text-gray-700">{description}</p> */}

        <div className="mt-2 md:mt-4">
          {subcategories?.[0] && (
            <span className="text-gray-600">
              {subcategories?.[0]?.name}, {subcategories?.[1]?.name} and more
            </span>
          )}
        </div>
        <div className="mt-2 md:mt-4">
          <span className="text-gray-600 font-semibold">{subscribers}</span>{" "}
          Subscribers
        </div>
        <div className="mt-1 md:mt-2">
          <span className="text-gray-600 font-semibold">{posts}</span> Posts
        </div>
        {topPostTitle && (
          <div
            className="mt-2 md:mt-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cpostdetails/${topPostId}`);
            }}
          >
            <span className="text-blue-600">
              {topPostTitle.length > 30
                ? topPostTitle.slice(0, 30) + "..."
                : topPostTitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCommCard;
