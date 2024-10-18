import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThreeDots, TailSpin, Vortex } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  dislikePost,
  removeLike,
  removeDislike,
} from "../APIs/LikeApis.js";
import { getNextArticle } from "../APIs/NewsApis.js";
import {
  like,
  dislike,
  likeRemove,
  dislikeRemove,
} from "../Actions/actions.js";
import {
  faThumbsUp,
  faThumbsDown,
  faClock,
  faCommentDots,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

const NewsDetails = (props) => {
  const navigate = useNavigate();
  const details = props.details;
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const category = useSelector((state) => state.category.category);
  const userCategories = useSelector((state) => state.user.categories);
  const likedPosts = useSelector((state) => state.user.likedPosts);
  const dislikedPosts = useSelector((state) => state.user.dislikedPosts);

  const [likes, setLikes] = useState(details.upvotes);
  const [dislikes, setDislikes] = useState(details.downvotes);
  const [isLiked, setIsLiked] = useState(likedPosts.includes(details._id));
  const [isDisliked, setIsDisiked] = useState(
    dislikedPosts.includes(details._id)
  );
  const [likeToggle, setLikeToggle] = useState(false);
  const [dislikeToggle, setDislikeToggle] = useState(false);
  const [isBlur, setIsBlur] = useState(true);
  const [isLeftLoading, setIsLeftLoading] = useState(false);
  const [isRightLoading, setIsRightLoading] = useState(false);

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

  const handleLeft = async () => {
    try {
      setIsLeftLoading(true);
      if (!category || category === "Trending") {
        const newId = await getNextArticle(
          "left",
          details.publishedAt,
          userCategories
        );
        navigate(`/details/${newId}`);
      } else {
        const newId = await getNextArticle(
          "left",
          details.publishedAt,
          category
        );
        navigate(`/details/${newId}`);
      }
    } catch (error) {
      toast.info("No new articles yet!");
      console.log(error);
    } finally {
      setIsLeftLoading(false);
    }
  };

  const handleRight = async () => {
    try {
      setIsRightLoading(true);
      if (!category || category === "Trending") {
        const newId = await getNextArticle(
          "right",
          details.publishedAt,
          userCategories
        );
        navigate(`/details/${newId}`);
      } else {
        const newId = await getNextArticle(
          "right",
          details.publishedAt,
          category
        );
        navigate(`/details/${newId}`);
      }
    } catch (error) {
      toast.info("No new articles yet!");
      console.log(error);
    } finally {
      setIsRightLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Link copied to clipboard");
  };

  return (
    <div>
      {/* Profile photo and name */}
      <div className="flex items-center text-gray-700 p-3 pb-1 mt-2">
        <div className="text-xs md:text-base font-semibold">
          {details.source}
        </div>
        <div className="ml-auto text-xs md:text-sm text-gray-500 flex items-center">
          {/* {new Date(details.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })} */}
          <FontAwesomeIcon icon={faClock} className="text-gray-500 ml-3 mr-1" />
          {formatDistanceToNow(new Date(details.publishedAt), {
            addSuffix: true,
          })}
        </div>
      </div>

      {/* Image */}
      <div className="mb-5 mx-2">
        <img src={details.image} alt="News" className="w-full rounded-lg" />
      </div>

      {/* Shift Buttons */}
      {/* <div className=" top-1/2 flex justify-between w-full"> */}
      <button
        onClick={handleLeft}
        className="fixed top-1/3 md:top-1/2 left-1 p-2 text-2xl md:text-3xl rounded-full bg-white border border-blue-400 z-30"
      >
        {isLeftLoading ? (
          <Vortex
            visible={true}
            height="35"
            width="20"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={[]}
          />
        ) : (
          <FontAwesomeIcon icon={faAngleLeft} />
        )}
      </button>
      <button
        onClick={handleRight}
        className="fixed top-1/3 md:top-1/2 right-1 p-2 text-2xl md:text-3xl rounded-full bg-white border border-blue-400 z-30"
      >
        {isRightLoading ? (
          <Vortex
            visible={true}
            height="35"
            width="20"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={[]}
          />
        ) : (
          <FontAwesomeIcon icon={faAngleRight} />
        )}
      </button>
      {/* </div> */}

      {/* Category */}
      <div className="text-xs md:text-sm text-gray-500 mb-2 mx-2">
        {details.category}
      </div>

      {/* Title */}
      <div className="text-base md:text-2xl font-medium mb-3 md:mb-5 text-gray-800 mx-2">
        {details.title}
      </div>
      {/* Content with gradient blur */}
      <div
        className={`relative overflow-hidden mx-2 text-sm sm:text-sm md:text-lg font-normal mb-4 text-gray-600 ${
          isBlur ? "max-h-24" : ""
        }`}
        style={{
          maskImage: isBlur
            ? "linear-gradient(to bottom, black 60%, transparent 100%)"
            : "none",
        }}
      >
        <div>
          {details.content
            .replace(/(\s*\n\s*){3,}/g, "\n\n")
            .split("\n")
            .map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </div>
        {/* {details.content} */}
      </div>
      {isBlur && (
        <div className="flex items-center justify-center w-full ">
          <button
            className="text-blue-500 mx-auto mb-3"
            onClick={() => setIsBlur(false)}
          >
            See more
          </button>
        </div>
      )}

      {/* Reacts and comments count */}
      {/* <div className="flex mt-5 mb-2 mx-5 text-base md:text-lg font-semibold text-gray-700">
        <div>Reactions: {likes + dislikes}</div>
        <div className="ml-10">Comments: {details.totalComments}</div>
      </div> */}

      {/* Upvote, Downvote, Shares */}
      <div className="flex items-center mx-5 justify-between md:justify-start mb-5 text-gray-700">
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
          <div className="flex flex-row items-center mr-5">
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
          <div className="flex flex-row items-center mx-5">
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
        <div className="flex flex-row items-center mx-5">
          <button className="px-1 mr-1">
            <FontAwesomeIcon icon={faCommentDots} />
          </button>
          <div className="ml-0 md:ml-2">{details.totalComments}</div>
        </div>
        <button
          className=" text-gray-700 flex items-center ml-5"
          onClick={handleShare}
        >
          <FontAwesomeIcon icon={faShareNodes} className="mr-1" />
        </button>
      </div>

      {/* Divider */}
      {/* <div className="border-b-2 border-blue-300 mb-4"></div> */}
    </div>
  );
};

export default NewsDetails;
