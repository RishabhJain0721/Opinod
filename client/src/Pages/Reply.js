import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsDown,
  faThumbsUp,
  faCommentDots,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import SingleReply from "../Components/SingleReply";
import { MutatingDots, ThreeDots } from "react-loader-spinner";
import { fetchCommentAndReplies } from "../APIs/CommentApis";
import { addReply } from "../APIs/CommentApis";
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
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";

const Reply = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const commentId = location.pathname.split("/")[4];
  const postId = location.pathname.split("/")[2];
  const type = location.pathname.split("/")[1];
  const navigate = useNavigate();

  const username = useSelector((state) => state.user.username);
  const likedComments = useSelector((state) => state.user.likedComments);
  const dislikedComments = useSelector((state) => state.user.dislikedComments);

  const [replyText, setReplyText] = useState("");
  const [comment, setComment] = useState({});
  const [replies, setReplies] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false);

  const [commentLikes, setCommentLikes] = useState(comment.upvotes);
  const [commentDislikes, setCommentDislikes] = useState(comment.downvotes);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [isCommentDisliked, setIsCommentDisliked] = useState(false);

  const [commentLikeToggle, setCommentLikeToggle] = useState(false);
  const [commentDislikeToggle, setCommentDislikeToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchCommentAndReplies(commentId);
        console.log(res);
        setIsCommentLiked(
          likedComments.includes(res.comment._id) ? true : false
        );
        setIsCommentDisliked(
          dislikedComments.includes(res.comment._id) ? true : false
        );

        setCommentLikes(res.comment.upvotes);
        setCommentDislikes(res.comment.downvotes);
        setComment(res.comment);
        setReplies(res.replies);
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmitReply = async () => {
    try {
      const res = await addReply(
        comment._id,
        comment.postId,
        replyText,
        username
      );
      console.log(res);
      window.location.reload();
    } catch (error) {
      throw error;
    }
    setReplyText("");
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

  return (
    <div>
      <Topbar />
      {!isMobile && <Navbar />}
      <div className="flex flex-col mt-16 md:ml-60">
        <div
          className="cursor-pointer ml-3 mt-5"
          onClick={() => {
            navigate(`/details/${postId}`);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm" /> Go to
          original post
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#2196F3"
              secondaryColor="#2196F3"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div>
            <div className="flex items-start flex-col p-4 bg-blue-100 rounded-lg shadow-md mt-3 mx-3 mb-4">
              <div className="flex items-center justify-center mb-2">
                <img
                  src="https://preview.redd.it/which-is-your-favourite-guys-v0-tzkw8381746d1.jpeg?width=1080&crop=smart&auto=webp&s=a445827dffe761320c9b0f36c6898e621389acc3"
                  alt="Profile"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <div className="flex flex-row items-baseline">
                  <div className="text-sm font-semibold">{comment.author}</div>
                  <div className="text-xs text-gray-500 ml-2">
                    {/* {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })} */}
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="text-sm mb-2 ml-8">{comment.text}</div>
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
                <button className="flex items-center mr-4">
                  <FontAwesomeIcon icon={faCommentDots} className="mr-1" />{" "}
                  {replies.length}
                </button>
                <button className="flex items-center mr-4">
                  <FontAwesomeIcon icon={faFlag} className="mr-1" />
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg ml-5">Replies :</div>
              <div className=" mb-28">
                {replies.map((reply) => {
                  return <SingleReply key={reply._id} comment={reply} />;
                })}
              </div>
              {/* <ReplyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              > */}

              <div className="w-screen fixed bottom-0 z-40">
                <div className="flex bg-white border border-t-2 p-5">
                  <input
                    type="text"
                    className="border border-gray-800 rounded w-4/5 p-3 mr-3"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                  />
                  <button
                    onClick={handleSubmitReply}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className=" text-lg" />
                  </button>
                </div>
              </div>
              {/* </ReplyModal> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reply;
