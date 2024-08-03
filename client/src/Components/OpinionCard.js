import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentDots,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  likeCom,
  likeComRemove,
  dislikeCom,
  dislikeComRemove,
} from "../Actions/actions";
import {
  likeComment,
  removeCommentLike,
  dislikeComment,
  removeCommentDislike,
} from "../APIs/LikeApis";
import { ThreeDots } from "react-loader-spinner";

const OpinionCard = ({
  id,
  category,
  profilePhoto,
  author,
  datePosted,
  title,
  text,
  upvotes,
  downvotes,
  postId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const base64Image = profilePhoto.buffer;
  const imageType = profilePhoto.mimetype;
  const src = `data:${imageType};base64,${base64Image}`;

  const username = useSelector((state) => state.user.username);
  const likedComments = useSelector((state) => state.user.likedComments);
  const dislikedComments = useSelector((state) => state.user.dislikedComments);

  const [commentLikes, setCommentLikes] = useState(upvotes);
  const [commentDislikes, setCommentDislikes] = useState(downvotes);
  const [isCommentLiked, setIsCommentLiked] = useState(
    username ? (likedComments.includes(id) ? true : false) : false
  );
  const [isCommentDisliked, setIsCommentDisliked] = useState(
    username ? (dislikedComments.includes(id) ? true : false) : false
  );
  const [commentLikeToggle, setCommentLikeToggle] = useState(false);
  const [commentDislikeToggle, setCommentDislikeToggle] = useState(false);

  const handleCommentLike = async () => {
    await likeComment(username, id);
    dispatch(likeCom(id));
    setIsCommentLiked(true);
    setCommentLikes(commentLikes + 1);
  };
  const handleRemoveCommentLike = async () => {
    await removeCommentLike(username, id);
    dispatch(likeComRemove(id));
    setIsCommentLiked(false);
    setCommentLikes(commentLikes - 1);
  };
  const handleCommentDislike = async () => {
    await dislikeComment(username, id);
    dispatch(dislikeCom(id));
    setIsCommentDisliked(true);
    setCommentDislikes(commentDislikes + 1);
  };
  const handleRemoveCommentDislike = async () => {
    await removeCommentDislike(username, id);
    dispatch(dislikeComRemove(id));
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

  return (
    <div className="p-2 mx-4 md:m-4 md:rounded-lg md:border md:border-gray-300 md:shadow-sm bg-white rounded-lg w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md">
      <div className="flex items-center">
        <span className="text-xs font-medium text-gray-500">{category}</span>
      </div>
      <div
        className="text-sm md:text-base font-medium mb-2"
        onClick={() => {
          navigate(`/details/${postId}`);
        }}
      >
        {title.length > 70 ? title.slice(0, 70) + "..." : title}
      </div>
      <div className="flex items-center mb-1">
        <img
          src={src}
          alt={`${author}'s profile`}
          className="w-7 h-7 rounded-full mr-2"
        />
        <div className="flex justify-between w-full">
          <p className="font-medium text-xs">{author}</p>
          <p className="text-xs text-gray-500">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
            {datePosted}
          </p>
        </div>
      </div>
      <p className="text-gray-600 mb-2 text-xs md:text-sm font-normal">
        {text.length > 70 ? text.slice(0, 70) + "..." : text}
      </p>
      <div className="flex items-center text-gray-700 space-x-6">
        <div className="flex items-center">
          {commentLikeToggle ? (
            <ThreeDots
              visible={true}
              height="16"
              width="20"
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
              {commentLikes}
            </button>
          )}
        </div>
        <div className="flex items-center">
          {commentDislikeToggle ? (
            <ThreeDots
              visible={true}
              height="16"
              width="20"
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
              {commentDislikes}
            </button>
          )}
        </div>
        <div
          className="flex items-center text-xs text-gray-500"
          onClick={() => {
            navigate(`/details/${postId}`);
          }}
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </div>
      {/* Divider */}
      <div className="border-b border-gray-300 mt-2 w-20 mx-auto"></div>
    </div>
  );
};

export default OpinionCard;
