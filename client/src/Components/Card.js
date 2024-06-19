import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Card = ({
  id,
  profilePhoto,
  name,
  datePosted,
  title,
  opinion,
  opinionAuthorPhoto,
  opinionAuthorName,
  opinionDate,
  upvotes,
  downvotes,
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
      className="bg-white rounded-lg shadow-md p-4 mb-4 w-96 max-w-md duration-150 m-4 h-fit border border-gray-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Profile photo and name */}
      <div className="flex items-center mb-2">
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div className="text-sm font-medium text-gray-700 flex-grow">
          {name.length > 15 ? name.slice(0, 15) + "..." : name}
        </div>
        <div className="ml-auto text-xs text-gray-500">{datePosted}</div>
      </div>

      {/* Title */}
      <div className=" text-base font-semibold mb-2 text-blue-500">
        {title.length > 70 ? title.slice(0, 70) + "..." : title}
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
            <div className="my-2 text-gray-600">{opinion}</div>
            <div className="flex justify-between items-center w-full">
              <button className="text-xs text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faAngleUp} className="mr-1" /> {upvotes}{" "}
                Agrees
              </button>
              <button className="text-xs text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faAngleDown} className="mr-1" />{" "}
                {downvotes} Disagrees
              </button>
              <button className="text-xs text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faFlag} className="mr-1" /> Report
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center flex-col">
          <div className="text-gray-600">No opinions yet. Be the first.</div>
          <button className=" bg-blue-500 text-white p-2 m-2 text-xs rounded-md">
            Give opinion
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
