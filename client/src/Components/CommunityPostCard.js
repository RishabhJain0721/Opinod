import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentDots,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow } from "date-fns";

const CommunityPostCard = (props) => {
  const {
    _id,
    subCategory,
    title,
    description,
    profilePicture,
    author,
    createdAt,
    upvotes,
    downvotes,
  } = props.post;
  const navigate = useNavigate();
  const base64Image = profilePicture.buffer;
  const imageType = profilePicture.mimetype;
  const src = `data:${imageType};base64,${base64Image}`;
  return (
    <div
      className="p-2 mb-2 md:m-4 md:rounded-lg md:border md:border-gray-300 md:shadow-sm bg-white rounded-lg w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md"
      //   onClick={() => {
      //     navigate(`/community/${_id}`);
      //   }}
    >
      <div className="flex items-center">
        <span className="text-sm text-gray-500">{subCategory}</span>
      </div>
      <h2 className="text-lg md:text-base font-normal">
        {title.length > 70 ? title.slice(0, 70) + "..." : title}
      </h2>
      <p className="text-gray-600 mb-2 text-sm md:text-sm font-normal">
        {description.length > 70
          ? description.slice(0, 70) + "..."
          : description}
      </p>
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
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
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

export default CommunityPostCard;
