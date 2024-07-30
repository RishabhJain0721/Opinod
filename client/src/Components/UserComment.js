import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp,
  faThumbsDown,
  faCommentDots,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import ReplyModal from "./ReplyModal";
import { ThreeDots } from "react-loader-spinner";
import { addCommunityReply, addReply } from "../APIs/CommentApis";
import { useSelector, useDispatch } from "react-redux";
import {
  likeComment,
  dislikeComment,
  removeCommentLike,
  removeCommentDislike,
} from "../APIs/LikeApis";
import { report } from "../APIs/CommentApis";
import {
  likeCom,
  dislikeCom,
  likeComRemove,
  dislikeComRemove,
} from "../Actions/actions";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

const UserComment = ({ opinion }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const type = location.pathname.split("/")[1];

  const username = useSelector((state) => state.user.username);
  const likedComments = useSelector((state) => state.user.likedComments);
  const dislikedComments = useSelector((state) => state.user.dislikedComments);

  const [commentLikes, setCommentLikes] = useState(opinion.upvotes);
  const [commentDislikes, setCommentDislikes] = useState(opinion.downvotes);
  const [isCommentLiked, setIsCommentLiked] = useState(
    username ? (likedComments.includes(opinion._id) ? true : false) : false
  );
  const [isCommentDisliked, setIsCommentDisliked] = useState(
    username ? (dislikedComments.includes(opinion._id) ? true : false) : false
  );
  const [commentLikeToggle, setCommentLikeToggle] = useState(false);
  const [commentDislikeToggle, setCommentDislikeToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitReply = async () => {
    try {
      const res =
        type === "cpostdetails"
          ? await addCommunityReply(
              opinion._id,
              opinion.postId,
              replyText,
              username
            )
          : await addReply(opinion._id, opinion.postId, replyText, username);
      console.log(res);
      window.location.reload();
    } catch (error) {
      throw error;
    }
    setIsModalOpen(false);
    setReplyText("");

    //this has to optimised later to avoid reloading and fetching only the updated comment(no. of replies)
    window.location.reload();
  };

  const handleCommentLike = async () => {
    await likeComment(username, opinion._id);
    dispatch(likeCom(opinion._id));
    setIsCommentLiked(true);
    setCommentLikes(commentLikes + 1);
  };
  const handleRemoveCommentLike = async () => {
    await removeCommentLike(username, opinion._id);
    dispatch(likeComRemove(opinion._id));
    setIsCommentLiked(false);
    setCommentLikes(commentLikes - 1);
  };
  const handleCommentDislike = async () => {
    await dislikeComment(username, opinion._id);
    dispatch(dislikeCom(opinion._id));
    setIsCommentDisliked(true);
    setCommentDislikes(commentDislikes + 1);
  };
  const handleRemoveCommentDislike = async () => {
    await removeCommentDislike(username, opinion._id);
    dispatch(dislikeComRemove(opinion._id));
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
    <div className="p-2 md:m-4 md:rounded-lg md:border md:border-gray-300 md:shadow-sm bg-white rounded-lg w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md">
      <div
        className="flex items-center mb-1"
        // onClick={() => {
        //   navigate(`/cpostdetails/${_id}`);
        // }}
      >
        <div className="flex justify-between w-full pr-2">
          <p className=" font-medium text-sm">{opinion.author}</p>
          <p className="text-xs text-gray-500">
            <FontAwesomeIcon icon={faClock} className="text-gray-500 mr-1" />
            {formatDistanceToNow(new Date(opinion.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      <p
        className="text-gray-600 text-sm md:text-sm font-normal"
        // onClick={() => {
        //   navigate(`/cpostdetails/${_id}`);
        // }}
      >
        {opinion.text.length > 70
          ? opinion.text.slice(0, 70) + "..."
          : opinion.text}
      </p>

      <div className="flex items-center text-gray-700 space-x-6 text-sm">
        {commentLikeToggle ? (
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
                isCommentLiked && "text-green-500"
              }`}
              onClick={handleToggleCommentLike}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              <div className="ml-0 md:ml-2">{commentLikes}</div>
            </button>
          </div>
        )}
        {commentDislikeToggle ? (
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
                isCommentDisliked && "text-red-500"
              }`}
              onClick={handleToggleCommentDislike}
            >
              <FontAwesomeIcon icon={faThumbsDown} />
              <div className="ml-0 md:ml-2">{commentDislikes}</div>
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

export default UserComment;
