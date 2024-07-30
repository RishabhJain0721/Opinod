import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { verifyPost } from "../APIs/CommunityApis";
import { discardPost } from "../APIs/CommunityApis";
import { toast } from "react-toastify";

const VerifyPostCard = (props) => {
  const { _id, subCategory, title, description, author, createdAt } =
    props.post;
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);

  const handleVerify = async () => {
    if (isDiscarding) {
      return;
    }
    try {
      setIsVerifying(true);
      await verifyPost(_id);
      toast.success("Post Verified Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDiscard = async () => {
    if (isVerifying) {
      return;
    }
    try {
      setIsDiscarding(true);
      await discardPost(_id);
      toast.success("Post Discarded Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDiscarding(false);
    }
  };

  return (
    <div className="p-2 mb-2 md:m-4 md:rounded-lg md:border md:border-gray-300 md:shadow-sm bg-white rounded-lg w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md">
      <div className="flex items-center">
        <span className="text-sm text-gray-500">{subCategory}</span>
      </div>
      <h2
        className="text-lg md:text-base font-normal"
        onClick={() => {
          navigate(`/admin/post/${_id}`);
        }}
      >
        {title.length > 70 ? title.slice(0, 70) + "..." : title}
      </h2>
      <p
        className="text-gray-600 mb-2 text-sm md:text-sm font-normal"
        onClick={() => {
          navigate(`/admin/post/${_id}`);
        }}
      >
        {description.length > 70
          ? description.slice(0, 70) + "..."
          : description}
      </p>
      <div
        className="flex items-center mb-1"
        onClick={() => {
          navigate(`/admin/post/${_id}`);
        }}
      >
        {/* <img
          src={src}
          alt={`${author}'s profile`}
          className="w-7 h-7 rounded-full mr-3"
        /> */}
        <div className="flex justify-between w-full pr-2">
          <p className=" font-medium text-sm">Author : {author}</p>
          <p className="text-xs text-gray-500">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className="text-white w-full flex justify-between">
        {isVerifying ? (
          <button className="bg-green-700 px-2 py-1 w-1/2 rounded-md mr-3 ">
            Verifying...
          </button>
        ) : (
          <button
            className="bg-green-500 px-2 py-1 w-1/2 rounded-md mr-3 "
            onClick={handleVerify}
          >
            Verify
          </button>
        )}

        {isDiscarding ? (
          <button className="bg-red-700 px-2 py-1 w-1/2 rounded-md ">
            Discarding...
          </button>
        ) : (
          <button
            className="bg-red-500 px-2 py-1 w-1/2 rounded-md "
            onClick={handleDiscard}
          >
            Discard
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="border-b border-gray-300 mt-4 w-20 mx-auto "></div>
    </div>
  );
};

export default VerifyPostCard;
