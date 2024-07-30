import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow } from "date-fns";

const FeedbackCard = (props) => {
  const { _id, text, username, createdAt } = props.post;
  const navigate = useNavigate();

  return (
    <div
      className="p-2 mb-2 md:m-4 md:rounded-lg md:border md:border-gray-300 md:shadow-sm bg-white rounded-lg w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md"
      onClick={() => {
        navigate(`/admin/feedback/${_id}`);
      }}
    >
      <div className="flex items-center mb-1">
        <div className="flex justify-between w-full pr-2">
          <p className=" font-medium text-sm">Author : {username}</p>
          <p className="text-xs text-gray-500">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      <p className="text-gray-600 mb-2 text-sm md:text-sm font-normal overflow-hidden">
        {text.length > 40 ? text.slice(0, 40) + "..." : text}
      </p>

      {/* Divider */}
      <div className="border-b border-gray-300 mt-4 w-20 mx-auto "></div>
    </div>
  );
};

export default FeedbackCard;
