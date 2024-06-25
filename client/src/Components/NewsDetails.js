import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FidgetSpinner, ThreeDots } from "react-loader-spinner";
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

const NewsDetails = (props) => {
  const details = props.details;
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const category = useSelector((state) => state.category.category);
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
  const [likeToggle, setLikeToggle] = useState(false);
  const [dislikeToggle, setDislikeToggle] = useState(false);

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
    const res = await updateNews(details._id);
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
    const res = await updateNews(details._id);
    dispatch(updateNewsInStore(res, category));
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
          <div className="flex flex-row items-center">
            <button
              className={`px-1 flex flex-row items-center justify-between w-20 ${
                isLiked && "text-green-500"
              }`}
              onClick={handleToggleLike}
            >
              <FontAwesomeIcon icon={faChevronUp} />
              <div className="ml-0 md:ml-2">{likes} Likes</div>
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
          <div className="flex flex-row items-center ">
            <button
              className={`px-1 flex flex-row items-center justify-between w-24 ${
                isDisliked && "text-red-500"
              }`}
              onClick={handleToggleDislike}
            >
              <FontAwesomeIcon icon={faChevronDown} />
              <div className="ml-0 md:ml-2">{dislikes} Dislikes</div>
            </button>
          </div>
        )}
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
