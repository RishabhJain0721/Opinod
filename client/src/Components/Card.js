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
      toast.info(<Msg />);
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
      toast.info(<Msg />);
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
      toast.info(<Msg />);
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
      toast.info(<Msg />);
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
    if (!username) {
      toast.info(<Msg />);
      return;
    }
    try {
      await report(opinionId);
      toast.error("Comment Reported");
    } catch (error) {
      console.log(error);
    }
  };

  const Msg = ({ closeToast, toastProps }) => (
    <div>
      Please{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-blue-500 font-medium"
      >
        login
      </span>{" "}
      to to perform action!
    </div>
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Link copied to clipboard");
  };

  return !isMobile ? (
    <div
      className="w-mx-auto bg-white overflow-hidden mb-8"
      onClick={handleClick}
    >
      {/* Image at the top */}
      <img
        className="w-full h-64 object-cover rounded-xl"
        src={profilePhoto}
        alt="news"
      />

      {/* Content below the image */}
      <div className="">
        {/* Title */}
        <div className="block mt-2 text-lg font-medium text-gray-800 mb-1 leading-relaxed overflow-hidden max-h-24">
          {title}
        </div>

        <div className="text-xs flex justify-start font-medium text-gray-500 ">
          {name}
          <span className=" text-gray-300 mx-2">|</span>
          <div className="text-gray-500 text-xs flex items-center font-normal">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
            {datePosted}
          </div>
          <span className=" text-gray-300 mx-2">|</span>
          {cat}
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white p-2 w-full duration-150 h-fit md:rounded-lg cursor-pointer">
      {/* Profile photo and name */}
      <div className="flex items-center mb-1" onClick={handleClick}>
        <img
          src={profilePhoto}
          alt="Main"
          className="h-20 w-20 md:h-16 md:w-16 rounded-lg mr-2"
        />
        <div className=" w-full justify-between">
          {/* <div className=" text-xs text-gray-500">{cat}</div> */}
          {/* Title */}
          <div className="text-xs font-medium text-gray-700 mb-1 leading-relaxed max-h-10 overflow-hidden">
            {title}
          </div>

          <div className="text-xs flex justify-between font-semibold text-gray-700 ">
            {name.length > 8 ? name.slice(0, 8) + "..." : name}

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
      <button
        className=" text-xs w-full rounded-full bg-gray-100 p-0.5"
        onClick={handleClick}
      >
        See opinions
      </button>
    </div>
  );
};

export default Card;
