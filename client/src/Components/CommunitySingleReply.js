import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReplyModal from "./ReplyModal";
import { useSelector, useDispatch } from "react-redux";
import { addCommunityReply } from "../APIs/CommentApis";
import {
  likeComment,
  dislikeComment,
  removeCommentLike,
  removeCommentDislike,
} from "../APIs/LikeApis";
import {
  likeCom,
  dislikeCom,
  likeComRemove,
  dislikeComRemove,
} from "../Actions/actions";
import { report } from "../APIs/CommentApis";
import { ThreeDots } from "react-loader-spinner";
import {
  faThumbsDown,
  faThumbsUp,
  faCommentDots,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import UploadImage from "./UploadImage";

const CommunitySingleReply = (props) => {
  const comment = props.comment;

  const base64Image = comment.profilePicture.buffer;
  const imageType = comment.profilePicture.mimetype;
  const src = `data:${imageType};base64,${base64Image}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const username = useSelector((state) => state.user.username);
  const likedComments = useSelector((state) => state.user.likedComments);
  const dislikedComments = useSelector((state) => state.user.dislikedComments);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [commentLikes, setCommentLikes] = useState(comment.upvotes);
  const [commentDislikes, setCommentDislikes] = useState(comment.downvotes);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [isCommentDisliked, setIsCommentDisliked] = useState(false);

  const [commentLikeToggle, setCommentLikeToggle] = useState(false);
  const [commentDislikeToggle, setCommentDislikeToggle] = useState(false);

  const [image, setImage] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);

  useEffect(() => {
    setIsCommentLiked(
      username ? (likedComments.includes(comment._id) ? true : false) : false
    );
    setIsCommentDisliked(
      username ? (dislikedComments.includes(comment._id) ? true : false) : false
    );
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitReply = async () => {
    try {
      const res = await addCommunityReply(
        comment._id,
        comment.postId,
        commentText,
        image,
        username
      );
      console.log(res);
    } catch (error) {
      throw error;
    }
    setIsModalOpen(false);
    setCommentText("");
    setImage("");
    window.location.reload();
  };

  const handleCommentLike = async () => {
    await likeComment(username, comment._id);
    dispatch(likeCom(comment._id));
    setIsCommentLiked(true);
    setCommentLikes(commentLikes + 1);
  };
  const handleRemoveCommentLike = async () => {
    await removeCommentLike(username, comment._id);
    dispatch(likeComRemove(comment._id));
    setIsCommentLiked(false);
    setCommentLikes(commentLikes - 1);
  };
  const handleCommentDislike = async () => {
    await dislikeComment(username, comment._id);
    dispatch(dislikeCom(comment._id));
    setIsCommentDisliked(true);
    setCommentDislikes(commentDislikes + 1);
  };
  const handleRemoveCommentDislike = async () => {
    await removeCommentDislike(username, comment._id);
    dispatch(dislikeComRemove(comment._id));
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
      const res = await report(comment._id);
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
    <div>
      <div className="flex flex-col">
        <div className="flex items-start flex-col p-2 mt-1 mx-3">
          <div className="flex items-center justify-center mb-2">
            <img
              src={src}
              alt="Profile"
              className="w-6 h-6 rounded-full mr-2"
            />
            <div className="flex flex-row items-baseline">
              <div className="text-sm font-semibold">{comment.author}</div>
              <div className="text-xs text-gray-500 ml-2">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className="text-sm mb-2 ml-8">{comment.text}</div>
          {comment.image && (
            <div className=" ml-8 mb-2 ">
              <img
                src={comment.image}
                alt="Failed to load"
                className=" max-h-48 max-w-56 md:max-w-96"
              />
            </div>
          )}
          <div className="flex items-center text-gray-500 text-xs ml-8">
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
            {/* <button
              className="flex items-center mr-4"
              onClick={handleOpenModal}
            >
              <FontAwesomeIcon icon={faReply} className="mr-1" /> Reply
            </button> */}
            <button
              className="flex items-center mr-4"
              onClick={handleOpenModal}
            >
              <FontAwesomeIcon icon={faCommentDots} className="mr-1" />{" "}
            </button>
            <button className="flex items-center mr-4" onClick={handleReport}>
              <FontAwesomeIcon icon={faFlag} className="mr-1" />
            </button>

            <ReplyModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <div className="flex flex-col">
                <textarea
                  className="border rounded text-xs md:text-sm p-2 mb-2"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your opinion..."
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
                  Submit Opinion
                </button>
              </div>
            </ReplyModal>
          </div>
          {comment.children.length > 0 && (
            <div
              className="flex items-center text-gray-500 text-xs ml-8 mt-2"
              onClick={() => {
                navigate(`/cpostdetails/${postId}/reply/${comment._id}`);
                window.location.reload();
              }}
            >
              See more ({comment.children.length})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitySingleReply;
