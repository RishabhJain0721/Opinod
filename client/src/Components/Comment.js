import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
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
import UploadImage from "./UploadImage";

const Comment = ({ opinion }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const type = location.pathname.split("/")[1];

  const base64Image = opinion.profilePicture.buffer;
  const imageType = opinion.profilePicture.mimetype;
  const src = `data:${imageType};base64,${base64Image}`;

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

  const [image, setImage] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);

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
              image,
              username
            )
          : await addReply(
              opinion._id,
              opinion.postId,
              replyText,
              image,
              username
            );
      console.log(res);
      window.location.reload();
    } catch (error) {
      throw error;
    }
    setIsModalOpen(false);
    setReplyText("");
    setImage("");

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

  const handleReport = async () => {
    try {
      const res = await report(opinion._id);
      console.log(res);
      toast.error("Comment Reported");
    } catch (error) {
      console.log(error);
    }
  };

  const imageurl = (url) => {
    console.log(url);
    setImage(url);
  };

  const removeImage = () => {
    setImage("");
    setTriggerRerender((prev) => !prev);
    toast.error(`❌ Image removed`, { icon: false });
  };

  return (
    <div className="flex items-start flex-col w-full p-4 pb-2 bg-white rounded-lg mb-0">
      <div className="flex items-center justify-center mb-2">
        <img src={src} alt="Profile" className="w-6 h-6 rounded-full mr-2" />
        <div className="flex flex-row items-baseline">
          <div className="text-sm font-semibold">{opinion.author}</div>
          <div className="text-xs text-gray-500 ml-2">
            {formatDistanceToNow(new Date(opinion.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
      <div className="text-sm md:text-sm mb-1 ml-8">{opinion.text}</div>
      {opinion.image && (
        <div className=" ml-8 mb-2 ">
          <img
            src={opinion.image}
            alt="Failed to load"
            className=" max-h-48 max-w-56 md:max-w-96"
          />
        </div>
      )}
      <div className="flex items-center text-gray-500 text-xs ml-8 mb-2">
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
            className={`flex items-center mr-4 ${
              isCommentLiked ? "text-green-500" : ""
            } `}
            onClick={handleToggleCommentLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />{" "}
            {commentLikes}
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
            className={`flex items-center mr-4 ${
              isCommentDisliked ? "text-red-500" : ""
            }`}
            onClick={handleToggleCommentDislike}
          >
            <FontAwesomeIcon icon={faThumbsDown} className="mr-1" />{" "}
            {commentDislikes}
          </button>
        )}
        <button className="flex items-center mr-4" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faCommentDots} className="mr-1" />
        </button>
        <button className="flex items-center mr-4" onClick={handleReport}>
          <FontAwesomeIcon icon={faFlag} className="mr-1" />
        </button>

        {/* <button
          className="flex items-center"
          onClick={() => navigate(`/details/${postId}/reply/${opinion._id}`)}
        >
          <FontAwesomeIcon icon={faCommentDots} className="mr-1" />
          {opinion.children.length} Replies
        </button> */}
      </div>
      {opinion.children.length > 0 && (
        <div
          className="flex items-center text-gray-500 text-xs ml-8"
          onClick={() => {
            type === "cpostdetails"
              ? navigate(`/cpostdetails/${postId}/reply/${opinion._id}`)
              : navigate(`/details/${postId}/reply/${opinion._id}`);
          }}
        >
          See replies ({opinion.children.length})
        </div>
      )}

      <ReplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col">
          <textarea
            className="border rounded text-xs md:text-sm p-2 mb-2"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <div
            className="text-lg md:text-xl text-gray-600 mt-auto mb-auto mr-4"
            key={triggerRerender}
          >
            <UploadImage
              ongettingurl={imageurl}
              cancel={removeImage}
              triggerRerender={triggerRerender}
            />
          </div>
          <button
            onClick={handleSubmitReply}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Reply
          </button>
        </div>
      </ReplyModal>
    </div>
  );
};

export default Comment;
