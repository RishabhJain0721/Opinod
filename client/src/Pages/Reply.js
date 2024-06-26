import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faReply,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import ReplyModal from "../Components/ReplyModal";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import SingleReply from "../Components/SingleReply";
import { fetchCommentAndReplies } from "../APIs/CommentApis";
import { MutatingDots } from "react-loader-spinner";
import { addReply } from "../APIs/CommentApis";
import { useSelector } from "react-redux";

const Reply = () => {
  const location = useLocation();
  const commentId = location.pathname.split("/")[4];
  const postId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [comment, setComment] = useState({});
  const [replies, setReplies] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchCommentAndReplies(commentId);
        console.log(res);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmitReply = async () => {
    try {
      const res = await addReply(
        comment._id,
        comment.postId,
        replyText,
        username
      );
      console.log(res);
    } catch (error) {
      throw error;
    }
    setIsModalOpen(false);
    setReplyText("");
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
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="text-xs md:text-sm mb-2">{comment.text}</div>
              <div className="flex items-center text-gray-500 text-xs">
                <button className="flex items-center mr-4">
                  <FontAwesomeIcon icon={faChevronUp} className="mr-1" />{" "}
                  {comment.upvotes} Agrees
                </button>
                <button className="flex items-center mr-4">
                  <FontAwesomeIcon icon={faChevronDown} className="mr-1" />{" "}
                  {comment.downvotes} Disagrees
                </button>
                <button
                  className="flex items-center mr-4"
                  onClick={handleOpenModal}
                >
                  <FontAwesomeIcon icon={faReply} className="mr-1" />{" "}
                  {replies.length} Replies
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg ml-5">Replies :</div>
              <div>
                {replies.map((reply) => {
                  return <SingleReply key={reply._id} reply={reply} />;
                })}
              </div>
              <ReplyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              >
                <div className="flex flex-col">
                  <textarea
                    className="border rounded text-xs md:text-sm p-2 mb-2"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                  />
                  <button
                    onClick={handleSubmitReply}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Submit Reply
                  </button>
                </div>
              </ReplyModal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reply;
