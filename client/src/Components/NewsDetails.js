import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  dislikePost,
  removeLike,
  removeDislike,
} from "../APIs/LikeApis.js";
import {
  like,
  dislike,
  likeRemove,
  dislikeRemove,
} from "../Actions/actions.js";

const NewsDetails = (props) => {
  const details = props.details;
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const likedPosts = useSelector((state) => state.user.likedPosts);
  const dislikedPosts = useSelector((state) => state.user.dislikedPosts);

  const [likes, setLikes] = useState(details.upvotes);
  const [dislikes, setDislikes] = useState(details.downvotes);
  const [isLiked, setIsLiked] = useState(
    likedPosts.includes(details._id) ? true : false
  );
  const [isDisliked, setIsDisiked] = useState(
    dislikedPosts.includes(details._id) ? true : false
  );

  const handleLike = async () => {
    await likePost(username, details._id);
    dispatch(like(details._id));
    setIsLiked(true);
    setLikes(likes + 1);
  };
  const handleRemoveLike = async () => {
    await removeLike(username, details._id);
    dispatch(likeRemove(details._id));
    setIsLiked(false);
    setLikes(likes - 1);
  };
  const handleDislike = async () => {
    await dislikePost(username, details._id);
    dispatch(dislike(details._id));
    setIsDisiked(true);
    setDislikes(dislikes + 1);
  };
  const handleRemoveDislike = async () => {
    await removeDislike(username, details._id);
    dispatch(dislikeRemove(details._id));
    setIsDisiked(false);
    setDislikes(dislikes - 1);
  };

  const handleToggleLike = async () => {
    if (isLiked) {
      handleRemoveLike();
    } else {
      if (isDisliked) {
        await handleRemoveDislike();
      }
      handleLike();
    }
  };

  const handleToggleDislike = async () => {
    if (isDisliked) {
      handleRemoveDislike();
    } else {
      if (isLiked) {
        await handleRemoveLike();
      }
      handleDislike();
    }
  };

  return (
    <div className="p-2">
      {/* Profile photo and name */}
      <div className="flex items-center mb-2 text-gray-700">
        <div className="text-sm md:text-base font-semibold">
          {details.source}
        </div>
        <div className="ml-auto text-xs md:text-sm text-gray-500">
          {new Date(details.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Title */}
      <div className=" text-base md:text-2xl font-medium mb-1 md:mb-5 text-blue-500">
        {details.title}
      </div>

      {/* Image */}
      <div className="mb-4">
        <img src={details.image} alt="News" className="w-full rounded-lg" />
      </div>

      {/* Content */}
      <div className=" text-xs sm:text-sm md:text-lg font-normal mb-4 text-gray-700">
        {details.content}
      </div>

      {/* Reacts and comments count */}
      <div className="flex my-5 text-lg font-semibold text-gray-700">
        <div>Reactions : {likes + dislikes}</div>
        <div className="ml-10">Comments : {details.totalComments}</div>
      </div>

      {/* Upvote, Downvote, Shares */}
      <div className="flex items-center justify-between mb-5 text-gray-700">
        <div className="flex flex-row items-center">
          <button
            className={`px-1 ${isLiked && "text-green-500"}`}
            onClick={handleToggleLike}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <div className="ml-0 md:ml-2">{likes} Likes</div>
        </div>
        <div className="flex flex-row items-center">
          <button
            className={`px-1 ${isDisliked && "text-red-500"}`}
            onClick={handleToggleDislike}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="ml-0 md:ml-2">{dislikes} Dislikes</div>
        </div>
        <div className="flex flex-row items-center">
          <button className="px-1">
            <FontAwesomeIcon icon={faShareNodes} />
          </button>
          <div className="ml-0 md:ml-2">Share</div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b-2 border-blue-300 mb-4"></div>
    </div>
  );
};

export default NewsDetails;
