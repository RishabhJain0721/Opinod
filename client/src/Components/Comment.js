import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faReply,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import ReplyModal from "./ReplyModal";
import { addReply } from "../APIs/CommentApis";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  console.log(comment.author);
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const username = useSelector((state) => state.user.username);

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
    <div className="flex items-start flex-col w-full p-4 bg-white rounded-lg shadow-md mb-4">
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
        <button className="flex items-center mr-4" onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faReply} className="mr-1" />
          Reply
        </button>
        <button
          className="flex items-center"
          onClick={() => navigate(`/details/${postId}/reply/${comment._id}`)}
        >
          <FontAwesomeIcon icon={faCommentDots} className="mr-1" />
          {comment.children.length} Replies
        </button>
      </div>

      <ReplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
  );
};

export default Comment;
