import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowRight,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  dislikePost,
  removeLike,
  removeDislike,
} from "../APIs/LikeApis.js";
import { updateNews } from "../APIs/NewsApis.js";
import {
  like,
  dislike,
  likeRemove,
  dislikeRemove,
  updateNewsInStore,
} from "../Actions/actions.js";
import { ThreeDots } from "react-loader-spinner";

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
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const category = useSelector((state) => state.category.category);
  const likedPosts = useSelector((state) => state.user.likedPosts);
  const dislikedPosts = useSelector((state) => state.user.dislikedPosts);

  const [likes, setLikes] = useState(upvotes);
  const [dislikes, setDislikes] = useState(downvotes);
  const [isLiked, setIsLiked] = useState(
    likedPosts.includes(id) ? true : false
  );
  const [isDisliked, setIsDisiked] = useState(
    dislikedPosts.includes(id) ? true : false
  );
  const [likeToggle, setLikeToggle] = useState(false);
  const [dislikeToggle, setDislikeToggle] = useState(false);

  const handleClick = () => {
    if (!username) {
      alert("Please login to view details of this article.");
      return;
    }
    navigate(`/details/${id}`);
  };

  const handleLike = async () => {
    await likePost(username, id);
    dispatch(like(id));
    setIsLiked(true);
    setLikes(likes + 1);
  };
  const handleRemoveLike = async () => {
    await removeLike(username, id);
    dispatch(likeRemove(id));
    setIsLiked(false);
    setLikes(likes - 1);
  };
  const handleDislike = async () => {
    await dislikePost(username, id);
    dispatch(dislike(id));
    setIsDisiked(true);
    setDislikes(dislikes + 1);
  };
  const handleRemoveDislike = async () => {
    await removeDislike(username, id);
    dispatch(dislikeRemove(id));
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
    const res = await updateNews(id);
    dispatch(updateNewsInStore(res, category));
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
    const res = await updateNews(id);
    dispatch(updateNewsInStore(res, category));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md duration-150 m-4 h-fit border border-gray-300 cursor-pointer">
      {/* Profile photo and name */}
      <div className="flex items-center mb-2" onClick={handleClick}>
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
        {likeToggle ? (
          <ThreeDots
            visible={true}
            height="18"
            width="50"
            color="#1E88E5"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <button
            className={`text-xs text-gray-500 flex items-center ${
              isLiked ? "text-green-500" : ""
            }`}
            onClick={handleToggleLike}
          >
            <FontAwesomeIcon icon={faAngleUp} className="mr-1" />
            {likes} Likes
          </button>
        )}
        {dislikeToggle ? (
          <ThreeDots
            visible={true}
            height="18"
            width="50"
            color="#1E88E5"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <button
            className={`text-xs text-gray-500 flex items-center ${
              isDisliked ? "text-red-500" : ""
            }`}
            onClick={handleToggleDislike}
          >
            <FontAwesomeIcon icon={faAngleDown} className="mr-1" />
            {dislikes} Dislikes
          </button>
        )}
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
                <FontAwesomeIcon icon={faAngleUp} className="mr-1" />
                {opinionUpvotes} Agrees
              </button>
              <button className="text-xs text-gray-500 flex items-center">
                <FontAwesomeIcon icon={faAngleDown} className="mr-1" />
                {opinionDownvotes} Disagrees
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
