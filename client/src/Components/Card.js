import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import {
  faFlag,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  dislikePost,
  removeLike,
  removeDislike,
  likeComment,
  dislikeComment,
  removeCommentLike,
  removeCommentDislike,
} from "../APIs/LikeApis.js";
import { report } from "../APIs/CommentApis";
import {
  like,
  dislike,
  likeRemove,
  dislikeRemove,
  likeCom,
  dislikeCom,
  likeComRemove,
  dislikeComRemove,
} from "../Actions/actions.js";
import { ThreeDots } from "react-loader-spinner";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

const Card = ({
  id,
  profilePhoto,
  cat,
  name,
  datePosted,
  title,
  upvotes,
  downvotes,
  opinionId,
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
  const likedComments = useSelector((state) => state.user.likedComments);
  const dislikedComments = useSelector((state) => state.user.dislikedComments);

  const [likes, setLikes] = useState(upvotes);
  const [dislikes, setDislikes] = useState(downvotes);
  const [isLiked, setIsLiked] = useState(
    username ? (likedPosts.includes(id) ? true : false) : false
  );
  const [isDisliked, setIsDisiked] = useState(
    username ? (dislikedPosts.includes(id) ? true : false) : false
  );
  const [likeToggle, setLikeToggle] = useState(false);
  const [dislikeToggle, setDislikeToggle] = useState(false);

  const [commentLikes, setCommentLikes] = useState(opinionUpvotes);
  const [commentDislikes, setCommentDislikes] = useState(opinionDownvotes);
  const [isCommentLiked, setIsCommentLiked] = useState(
    username ? (likedComments.includes(opinionId) ? true : false) : false
  );
  const [isCommentDisliked, setIsCommentDisliked] = useState(
    username ? (dislikedComments.includes(opinionId) ? true : false) : false
  );
  const [commentLikeToggle, setCommentLikeToggle] = useState(false);
  const [commentDislikeToggle, setCommentDislikeToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    if (!username) {
      alert("Please login to like/dislike this article.");
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
      alert("Please login to like/dislike this article.");
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

  const handleCommentLike = async () => {
    await likeComment(username, opinionId);
    dispatch(likeCom(opinionId));
    setIsCommentLiked(true);
    setCommentLikes(commentLikes + 1);
  };
  const handleRemoveCommentLike = async () => {
    await removeCommentLike(username, opinionId);
    dispatch(likeComRemove(opinionId));
    setIsCommentLiked(false);
    setCommentLikes(commentLikes - 1);
  };
  const handleCommentDislike = async () => {
    await dislikeComment(username, opinionId);
    dispatch(dislikeCom(opinionId));
    setIsCommentDisliked(true);
    setCommentDislikes(commentDislikes + 1);
  };
  const handleRemoveCommentDislike = async () => {
    await removeCommentDislike(username, opinionId);
    dispatch(dislikeComRemove(opinionId));
    setIsCommentDisliked(false);
    setCommentDislikes(commentDislikes - 1);
  };

  const handleToggleCommentLike = async () => {
    if (!username) {
      alert("Please login to like/dislike this comment.");
      return;
    }
    setCommentLikeToggle(true);
    if (isCommentLiked) {
      await handleRemoveCommentLike();
    } else {
      if (isCommentDisliked) {
        await handleRemoveCommentDislike();
      }
      await handleCommentLike();
    }
    setCommentLikeToggle(false);
  };

  const handleToggleCommentDislike = async () => {
    if (!username) {
      alert("Please login to like/dislike this comment.");
      return;
    }
    setCommentDislikeToggle(true);
    if (isCommentDisliked) {
      await handleRemoveCommentDislike();
    } else {
      if (isCommentLiked) {
        await handleRemoveCommentLike();
      }
      await handleCommentDislike();
    }
    setCommentDislikeToggle(false);
  };

  const handleReport = async () => {
    try {
      const res = await report(opinionId);
      console.log(res);
      toast.error("Comment Reported");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-2 w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md duration-150 h-fit md:rounded-lg md:border md:border-gray-300 md:shadow-sm m-4 mt-1 md:mt-3 mb-0 cursor-pointer">
      {/* Profile photo and name */}
      <div className="flex items-center mb-1" onClick={handleClick}>
        <img
          src={profilePhoto}
          alt="Main"
          className="h-20 w-20 rounded-lg mr-2"
        />
        <div className=" w-full justify-between">
          {/* <div className=" text-xs text-gray-500">{cat}</div> */}
          {/* Title */}
          <div className="text-sm md:text-base font-medium text-gray-700 mb-1 leading-relaxed">
            {title.length > 50 ? title.slice(0, 50) + "..." : title}
          </div>

          <div className="text-xs flex justify-between font-semibold text-gray-700 ">
            {name.length > 15 ? name.slice(0, 15) + "..." : name}

            <div className="text-gray-500 text-xs flex items-center font-normal">
              <FontAwesomeIcon
                icon={faClock}
                className="text-gray-500 ml-3 mr-1"
              />
              {datePosted}
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <button
          className=" text-xs w-full rounded-full bg-gray-100 p-0.5"
          onClick={handleClick}
        >
          See opinions
        </button>
      )}
      {!isMobile && (
        <>
          {" "}
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
                disabled={dislikeToggle}
              >
                <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
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
                disabled={likeToggle}
              >
                <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
                {dislikes} Dislikes
              </button>
            )}
            <button
              className="text-xs text-gray-500 flex items-center"
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faShareNodes} className="mr-1" /> Share
            </button>
          </div>
          {/* Divider */}
          <div className="border-b-2 border-gray-200 mb-2"></div>
          {/* Opinion */}
          {opinion ? (
            <div
              className="flex items-start flex-col mb-2"
              onClick={() => {
                if (!username) {
                  alert("Pease login first");
                  return;
                }
              }}
            >
              <div className="flex items-center w-full">
                <img
                  src={opinionAuthorPhoto}
                  alt="Opinion Author"
                  className="w-5 h-5 rounded-full mr-2"
                />
                <div className="text-sm font-medium text-gray-700 flex-grow">
                  {opinionAuthorName}
                </div>
                <div className="text-xs ml-auto text-gray-500">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-gray-500 mr-1"
                  />
                  {opinionDate}
                </div>
              </div>
              <div className="flex items-start flex-col w-full">
                <div className="mt-2 mb-1 text-gray-600">
                  {opinion.length > 50 ? opinion.slice(0, 50) + "..." : opinion}
                </div>
                <div className="flex justify-between items-center w-full">
                  {commentLikeToggle ? (
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
                        isCommentLiked ? "text-green-500" : ""
                      }`}
                      onClick={handleToggleCommentLike}
                      disabled={commentDislikeToggle}
                    >
                      <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                      {commentLikes} Agrees
                    </button>
                  )}
                  {commentDislikeToggle ? (
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
                        isCommentDisliked ? "text-red-500" : ""
                      }`}
                      onClick={handleToggleCommentDislike}
                      disabled={commentLikeToggle}
                    >
                      <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />
                      {commentDislikes} Disagrees
                    </button>
                  )}
                  <button
                    className="text-xs text-gray-500 flex items-center"
                    onClick={handleReport}
                  >
                    <FontAwesomeIcon icon={faFlag} className="mr-1" /> Report
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center flex-row justify-between h-20 m-1"
              onClick={handleClick}
            >
              <div className="text-gray-600">
                No opinions yet. Be the first.
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
