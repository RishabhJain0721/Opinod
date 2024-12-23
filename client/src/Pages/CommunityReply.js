import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faArrowLeft,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsDown,
  faThumbsUp,
  faCommentDots,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import CommunitySingleReply from "../Components/CommunitySingleReply";
import { MutatingDots, ThreeDots } from "react-loader-spinner";
import { fetchCommentAndReplies, report } from "../APIs/CommentApis";
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
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import UploadImage from "../Components/UploadImage";

const CommunityReply = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const commentId = location.pathname.split("/")[4];
  const postId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const username = useSelector((state) => state.user.username);
  const likedComments = useSelector((state) => state.user.likedComments);
  const dislikedComments = useSelector((state) => state.user.dislikedComments);

  const [replyText, setReplyText] = useState("");
  const [comment, setComment] = useState({});
  const [replies, setReplies] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false);

  const [base64Image, setBase64Image] = useState("");
  const [mimetype, setMimetype] = useState("");

  const [commentLikes, setCommentLikes] = useState(comment.upvotes);
  const [commentDislikes, setCommentDislikes] = useState(comment.downvotes);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const [isCommentDisliked, setIsCommentDisliked] = useState(false);

  const [commentLikeToggle, setCommentLikeToggle] = useState(false);
  const [commentDislikeToggle, setCommentDislikeToggle] = useState(false);

  const [image, setImage] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const [footerTop, setFooterTop] = useState(0);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchCommentAndReplies(commentId);
      setIsCommentLiked(likedComments.includes(res.comment._id) ? true : false);
      setIsCommentDisliked(
        dislikedComments.includes(res.comment._id) ? true : false
      );

      setCommentLikes(res.comment.upvotes);
      setCommentDislikes(res.comment.downvotes);
      setComment(res.comment);
      setBase64Image(res.comment?.profilePicture?.buffer || "");
      setMimetype(res.comment?.profilePicture?.mimetype || "");
      setReplies(res.replies);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
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
      setReplyText("");
      setImage("");
      await addCommunityReply(
        comment._id,
        comment.postId,
        replyText,
        image,
        username
      );
    } catch (error) {
      throw error;
    }
    fetchData();
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

  const Msg = ({ closeToast, toastProps }) => (
    <div>
      Please{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-blue-500 font-medium"
      >
        login
      </span>{" "}
      to like/dislike!
    </div>
  );

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
    try {
      await report(commentId);
      toast.error("Comment Reported");
    } catch (error) {
      console.log(error);
    }
  };

  const imageurl = (url) => {
    setImage(url);
  };

  const removeImage = () => {
    setImage("");
    setTriggerRerender((prev) => !prev);
    toast.error(`❌ Image removed`, { icon: false });
  };

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const commentBox = document.getElementById("comment-box");

      if (footer && commentBox) {
        const footerTop = footer.getBoundingClientRect().top;
        const commentBoxHeight = commentBox.offsetHeight;

        // Check if the comment box is close to overlapping the footer
        if (footerTop <= window.innerHeight) {
          setIsAboveFooter(true);
        } else {
          setIsAboveFooter(false);
        }

        setFooterTop(footerTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="md:w-7/12 ml-auto mr-auto">
      <Topbar />

      <div className="flex flex-col mt-16 md:ml-5 md:mr-5">
        <div
          className="cursor-pointer ml-3 mt-5"
          onClick={() => {
            navigate(`/cpostdetails/${postId}`);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-sm" /> &nbsp;Go to
          original post
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#212121"
              secondaryColor="#212121"
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
                {mimetype != "" ? (
                  <img
                    src={`data:${mimetype};base64,${base64Image}`}
                    alt="Profile"
                    className="w-6 h-6 rounded-full mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="text-2xl mr-2 text-gray-800"
                  />
                )}
                <div className="flex flex-row items-baseline">
                  <div
                    className="text-sm font-semibold"
                    onClick={() => navigate(`/profile/${comment.author}`)}
                  >
                    {comment.author}
                  </div>
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
                <button className="flex items-center mr-4">
                  <FontAwesomeIcon icon={faCommentDots} className="mr-1" />{" "}
                  {replies.length}
                </button>
                <button
                  className="flex items-center mr-4"
                  onClick={handleReport}
                >
                  <FontAwesomeIcon icon={faFlag} className="mr-1" />
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg ml-5">Replies :</div>
              <div className="mb-28">
                {replies.map((reply) => {
                  return (
                    <CommunitySingleReply key={reply._id} comment={reply} />
                  );
                })}
              </div>

              <div
                className="w-full md:w-7/12 fixed bottom-0 left-auto right-auto z-40"
                id="comment-box"
                style={{
                  transform:
                    isAboveFooter && !isFocused
                      ? "translateY(-100%)"
                      : "translateY(0)",
                  bottom: isAboveFooter
                    ? !isFocused
                      ? window.innerHeight - footerTop - 64
                      : window.innerHeight - footerTop
                    : 0,
                }}
              >
                <div
                  className={`flex bg-white p-3 transition-all duration-300 ${
                    isFocused ? "h-24" : "h-16"
                  }`}
                >
                  <textarea
                    type="text"
                    className="border border-gray-500 rounded w-11/12 text-sm p-3 mr-3 md:ml-2 overflow-y-auto no-scrollbar::-webkit-scrollbar no-scrollbar focus:outline-none"
                    value={replyText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your opinion..."
                  />
                  <div
                    className="text-xl md:text-2xl text-gray-600 mt-auto mb-2 mr-4 h-10"
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
                    className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2 mt-auto h-10"
                  >
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="text-sm md:text-lg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityReply;
