import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentDots,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import {
  addCommunityPostLike,
  removeCommunityPostLike,
  addCommunityPostDislike,
  removeCommunityPostDislike,
} from "../APIs/LikeApis.js";
import {
  like,
  dislike,
  likeRemove,
  dislikeRemove,
} from "../Actions/actions.js";

const UserPostCard = (props) => {
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

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const likedPosts = useSelector((state) => state.user.likedPosts);
  const dislikedPosts = useSelector((state) => state.user.dislikedPosts);

  const [likes, setLikes] = useState(upvotes);
  const [dislikes, setDislikes] = useState(downvotes);
  const [isLiked, setIsLiked] = useState(likedPosts.includes(_id));
  const [isDisliked, setIsDisiked] = useState(dislikedPosts.includes(_id));
  const [likeToggle, setLikeToggle] = useState(false);
  const [dislikeToggle, setDislikeToggle] = useState(false);

  const handleLike = async () => {
    await addCommunityPostLike(username, _id);
    dispatch(like(_id));
    setIsLiked(true);
    setLikes(likes + 1);
  };

  const handleRemoveLike = async () => {
    await removeCommunityPostLike(username, _id);
    dispatch(likeRemove(_id));
    setIsLiked(false);
    setLikes(likes - 1);
  };

  const handleDislike = async () => {
    await addCommunityPostDislike(username, _id);
    dispatch(dislike(_id));
    setIsDisiked(true);
    setDislikes(dislikes + 1);
  };

  const handleRemoveDislike = async () => {
    await removeCommunityPostDislike(username, _id);
    dispatch(dislikeRemove(_id));
    setIsDisiked(false);
    setDislikes(dislikes - 1);
  };

  const handleToggleLike = async () => {
    setLikeToggle(true);
    if (isLiked) {
      await handleRemoveLike();
    } else {
      if (isDisliked) {
        await handleRemoveDislike();
      }
      await handleLike();
    }
    setLikeToggle(false);
  };

  const handleToggleDislike = async () => {
    setDislikeToggle(true);
    if (isDisliked) {
      await handleRemoveDislike();
    } else {
      if (isLiked) {
        await handleRemoveLike();
      }
      await handleDislike();
    }
    setDislikeToggle(false);
  };

  return (
    <div className="p-2 md:m-4 md:rounded-lg md:border md:border-gray-300 md:shadow-sm bg-white rounded-lg w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md">
      <div className="flex items-center">
        <span className="text-xs md:text-sm text-gray-500">{subCategory}</span>
      </div>
      <h2
        className="text-base md:text-lg font-normal"
        onClick={() => {
          navigate(`/cpostdetails/${_id}`);
        }}
      >
        {title.length > 70 ? title.slice(0, 70) + "..." : title}
      </h2>
      <p
        className="text-gray-600 text-sm md:text-sm font-normal"
        onClick={() => {
          navigate(`/cpostdetails/${_id}`);
        }}
      >
        {description.length > 70
          ? description.slice(0, 70) + "..."
          : description}
      </p>
      <div
        className="flex items-center mb-1"
        onClick={() => {
          navigate(`/cpostdetails/${_id}`);
        }}
      >
        <div className="flex justify-between w-full pr-2">
          <p className=" font-medium text-sm">{author}</p>
          <p className="text-xs text-gray-500">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      <div className="flex items-center text-gray-700 space-x-6 text-sm">
        {likeToggle ? (
          <div className="ml-4">
            <ThreeDots
              visible={true}
              height="24"
              width="50"
              color="#1E88E5"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div className="flex flex-row items-center mr-2">
            <button
              className={`px-1 flex flex-row items-center justify-between w-10 ${
                isLiked && "text-green-500"
              }`}
              onClick={handleToggleLike}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              <div className="ml-0 md:ml-2">{likes}</div>
            </button>
          </div>
        )}
        {dislikeToggle ? (
          <ThreeDots
            visible={true}
            height="24"
            width="50"
            color="#1E88E5"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <div className="flex flex-row items-center mx-4">
            <button
              className={`px-1 flex flex-row items-center justify-between w-10 ${
                isDisliked && "text-red-500"
              }`}
              onClick={handleToggleDislike}
            >
              <FontAwesomeIcon icon={faThumbsDown} />
              <div className="ml-0 md:ml-2">{dislikes}</div>
            </button>
          </div>
        )}
        <div className="flex items-center">
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </div>
      {/* Divider */}
      <div className="border-b border-gray-300 mt-4 w-20 mx-auto "></div>
    </div>
  );
};

export default UserPostCard;
