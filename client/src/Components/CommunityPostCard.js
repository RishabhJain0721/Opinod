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
import { toast } from "react-toastify";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

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

  let base64Image, imageType;
  if (profilePicture) {
    base64Image = profilePicture.buffer;
    imageType = profilePicture.mimetype;
  }
  const src = `data:${imageType};base64,${base64Image}`;

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const likedPosts = useSelector((state) => state.user.likedPosts);
  const dislikedPosts = useSelector((state) => state.user.dislikedPosts);

  const [likes, setLikes] = useState(upvotes);
  const [dislikes, setDislikes] = useState(downvotes);
  const [isLiked, setIsLiked] = useState(
    username ? likedPosts.includes(_id) : false
  );
  const [isDisliked, setIsDisiked] = useState(
    username ? dislikedPosts.includes(_id) : false
  );
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
    if (!username) {
      toast.info("Please login to like/dislike!");
      return;
    }
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
    if (!username) {
      toast.info("Please login to like/dislike!");
      return;
    }
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
    <div className="p-2 mb-2 md:m-4 md:rounded-lg md:border md:border-gray-300 md:shadow-sm bg-white rounded-lg">
      <div className="flex items-center mb-1">
        <span className="text-xs text-gray-500">{subCategory}</span>
      </div>
      <h2
        className="text-sm md:text-base mb-1 font-medium text-gray-700"
        onClick={() => {
          username
            ? navigate(`/cpostdetails/${_id}`)
            : toast.info("Please login to view more");
        }}
      >
        {title.length > 70 ? title.slice(0, 70) + "..." : title}
      </h2>
      <p
        className="text-gray-600 mb-2 text-xs md:text-sm font-normal"
        onClick={() => {
          username
            ? navigate(`/cpostdetails/${_id}`)
            : toast.info("Please login to view more");
        }}
      >
        {description.length > 70
          ? description.slice(0, 70) + "..."
          : description}
      </p>
      <div
        className="flex items-center mb-1"
        onClick={() => {
          username
            ? navigate(`/cpostdetails/${_id}`)
            : toast.info("Please login to view more");
        }}
      >
        {imageType ? (
          <img
            src={src}
            alt={`${author}'s profile`}
            className="w-7 h-7 rounded-full mr-2"
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-2xl mr-2 text-gray-800"
          />
        )}
        <div className="flex justify-between w-full pr-0">
          <p className=" font-medium text-xs">{author}</p>
          <p className="text-xs text-gray-500">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
            {formatDistanceToNow(new Date(createdAt), { addSuffix: false })}
          </p>
        </div>
      </div>
      <div className="flex items-center text-gray-700 space-x-6">
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

export default CommunityPostCard;
