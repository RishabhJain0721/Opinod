import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentDots,
  faClock,
} from "@fortawesome/free-regular-svg-icons";

const OpinionCard = ({
  id,
  category,
  profilePhoto,
  author,
  datePosted,
  title,
  text,
  upvotes,
  downvotes,
  postId,
}) => {
  const navigate = useNavigate();
  const base64Image = profilePhoto.buffer;
  const imageType = profilePhoto.mimetype;
  const src = `data:${imageType};base64,${base64Image}`;
  return (
    <div
      className="p-2 mx-4 mb-2 md:m-4 md:rounded-lg md:border md:border-gray-300 md:shadow-sm bg-white rounded-lg w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md"
      onClick={() => {
        navigate(`/details/${postId}`);
      }}
    >
      <div className="flex items-center mb-1">
        <span className="text-sm text-gray-500">{category}</span>
      </div>
      <h2 className="text-sm md:text-base font-normal mb-2">
        {title.length > 70 ? title.slice(0, 70) + "..." : title}
      </h2>
      <div className="flex items-center mb-1">
        <img
          src={src}
          alt={`${author}'s profile`}
          className="w-7 h-7 rounded-full mr-3"
        />
        <div className="flex justify-between w-full pr-2">
          <p className=" font-medium text-sm">{author}</p>
          <p className="text-xs text-gray-500">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
            {datePosted}
          </p>
        </div>
      </div>
      <p className="text-gray-700 mb-2 text-xs md:text-sm font-normal">
        {text.length > 70 ? text.slice(0, 70) + "..." : text}
      </p>
      <div className="flex items-center text-gray-700 space-x-6">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
          <span>{upvotes}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
          <span>{downvotes}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </div>
      {/* Divider */}
      <div className="border-b border-gray-300 mt-4 w-20 mx-auto "></div>
    </div>
  );
};

export default OpinionCard;
