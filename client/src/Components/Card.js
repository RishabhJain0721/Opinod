import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowRight,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Card = ({
  id,
  profilePhoto,
  name,
  datePosted,
  title,
  upvotes,
  downvotes,
  opinion,
  opinionAuthorPhoto,
  opinionAuthorName,
  opinionDate,
  opinionUpvotes,
  opinionDownvotes,
}) => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const handleClick = () => {
    if (!username) {
      alert("Please login to view details of this article.");
      return;
    }
    navigate(`/details/${id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 mb-4 w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md duration-150 m-4 h-fit border border-gray-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Profile photo and name */}
      <div className="flex items-center mb-2">
        <img
          src={profilePhoto}
          alt="Profile"
          className="h-20 w-20 rounded-lg mr-2"
        />
        <div className=" w-full justify-between">
          <div className="text-sm flex justify-between text-gray-700 ">
            {name.length > 15 ? name.slice(0, 15) + "..." : name}
            <div className="text-xs text-gray-500">{datePosted}</div>
          </div>
          {/* Title */}
          <div className="text-sm md:text-base font-medium mb-2 text-blue-600">
            {title.length > 70 ? title.slice(0, 70) + "..." : title}
          </div>
        </div>
      </div>

      {/* Likes and Dislikes */}
      <div className="flex justify-between items-center w-full mb-2">
        <button className="text-xs text-gray-500 flex items-center">
          <FontAwesomeIcon icon={faAngleUp} className="mr-1" />
          {upvotes} Likes
        </button>
        <button className="text-xs text-gray-500 flex items-center">
          <FontAwesomeIcon icon={faAngleDown} className="mr-1" />
          {downvotes} Dislikes
        </button>
        <button className="text-xs text-gray-500 flex items-center">
          <FontAwesomeIcon icon={faFlag} className="mr-1" /> Report
        </button>
      </div>

      {/* Divider */}
      <div className="border-b-2 border-gray-200 mb-2"></div>

      {/* Opinion */}
      {opinion ? (
        <div className="flex items-start flex-col mb-2">
          <div className="flex items-center w-full">
            <img
              src={opinionAuthorPhoto}
              alt="Opinion Author"
              className="w-6 h-6 rounded-full mr-2"
            />
            <div className="text-sm font-medium text-gray-700 flex-grow">
              {opinionAuthorName}
            </div>
            <div className="text-xs ml-auto text-gray-500">{opinionDate}</div>
          </div>
          <div className="flex items-start flex-col w-full">
            <div className="mt-2 mb-1 text-gray-600">
              {opinion.length > 50 ? opinion.slice(0, 50) + "..." : opinion}
            </div>
            <div className="flex justify-between items-center w-full">
              <button className="text-xs text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faAngleUp} className="mr-1" /> {upvotes}
                Agrees
              </button>
              <button className="text-xs text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faAngleDown} className="mr-1" />
                {downvotes} Disagrees
              </button>
              <button className="text-xs text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faFlag} className="mr-1" /> Report
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-row justify-between">
          <div className="text-gray-600">No opinions yet. Be the first.</div>
          <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
        </div>
      )}
    </div>
  );
};

export default Card;
