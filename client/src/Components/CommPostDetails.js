import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThreeDots } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  addCommunityPostLike,
  removeCommunityPostLike,
  addCommunityPostDislike,
  removeCommunityPostDislike,
} from "../APIs/LikeApis.js";
import {
  like,
  dislike,
  likeRemove,
  dislikeRemove,
} from "../Actions/actions.js";
import {
  faThumbsUp,
  faThumbsDown,
  faClock,
  faCommentDots,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const CommPostDetails = (props) => {
  const navigate = useNavigate();
  const details = props.details;

  const base64Image = details.profilePic ? details.profilePic.buffer : "";
  const imageType = details.profilePic ? details.profilePic.mimetype : "";

  const src = `data:${imageType};base64,${base64Image}`;

  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const likedPosts = useSelector((state) => state.user.likedPosts);
  const dislikedPosts = useSelector((state) => state.user.dislikedPosts);

  const [likes, setLikes] = useState(details.upvotes);
  const [dislikes, setDislikes] = useState(details.downvotes);
  const [isLiked, setIsLiked] = useState(likedPosts.includes(details._id));
  const [isDisliked, setIsDisiked] = useState(
    dislikedPosts.includes(details._id)
  );
  const [likeToggle, setLikeToggle] = useState(false);
  const [dislikeToggle, setDislikeToggle] = useState(false);

  const handleLike = async () => {
    await addCommunityPostLike(username, details._id);
    dispatch(like(details._id));
    setIsLiked(true);
    setLikes(likes + 1);
  };

  const handleRemoveLike = async () => {
    await removeCommunityPostLike(username, details._id);
    dispatch(likeRemove(details._id));
    setIsLiked(false);
    setLikes(likes - 1);
  };

  const handleDislike = async () => {
    await addCommunityPostDislike(username, details._id);
    dispatch(dislike(details._id));
    setIsDisiked(true);
    setDislikes(dislikes + 1);
  };

  const handleRemoveDislike = async () => {
    await removeCommunityPostDislike(username, details._id);
    dispatch(dislikeRemove(details._id));
    setIsDisiked(false);
    setDislikes(dislikes - 1);
  };

  const handleToggleLike = async () => {
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

  return (
    <div>
      {/* Profile photo and name */}
      <div className="flex items-center justify-center mb-2 text-gray-700 p-5 pb-0">
        {/* Image */}
        <div onClick={() => navigate(`/profile/${details.author}`)}>
          {imageType ? (
            <img
              src={src}
              alt="Profile"
              className="w-7 h-7 md:w-7 md:h-7 rounded-full mr-1"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleUser}
              className="text-3xl mr-0 text-gray-800"
            />
          )}
        </div>
        <div
          className="text-sm md:text-base font-semibold ml-1"
          onClick={() => navigate(`/profile/${details.author}`)}
        >
          {details.author}
        </div>
        <div className="ml-auto text-xs md:text-sm text-gray-500 flex items-center">
          <FontAwesomeIcon icon={faClock} className="text-gray-500 ml-3 mr-1" />
          {formatDistanceToNow(new Date(details.createdAt), {
            addSuffix: true,
          })}
        </div>
      </div>
      <div className="text-xs md:text-sm text-gray-500 mb-2 mx-5">
        {details.subCategory}
      </div>
      {/* Title */}
      <div className="text-base md:text-2xl font-medium text-gray-800 mx-5">
        {details.title}
      </div>
      {details.image && (
        <div className="mx-5 my-2">
          <img src={details.image} alt="img" className="rounded-md" />
        </div>
      )}
      {/* Content with gradient blur */}
      <div className="relative overflow-hidden mx-5 text-sm md:text-lg font-normal mb-4 text-gray-600">
        {details.description.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </div>
      <div className="flex items-center mx-5 justify-between md:justify-start mb-5 text-gray-700">
        {likeToggle ? (
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
          <div className="flex flex-row items-center mr-5">
            <button
              className={`px-1 flex flex-row items-center justify-between w-10 ${
                isLiked && "text-green-500"
              }`}
              onClick={handleToggleLike}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              <div className="ml-0 md:ml-2">{likes}</div>
            </button>
          </div>
        )}
        {dislikeToggle ? (
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
          <div className="flex flex-row items-center mx-5">
            <button
              className={`px-1 flex flex-row items-center justify-between w-10 ${
                isDisliked && "text-red-500"
              }`}
              onClick={handleToggleDislike}
            >
              <FontAwesomeIcon icon={faThumbsDown} />
              <div className="ml-0 md:ml-2">{dislikes}</div>
            </button>
          </div>
        )}
        <div className="flex flex-row items-center mx-5">
          <button className="px-1 mr-1">
            <FontAwesomeIcon icon={faCommentDots} />
          </button>
          <div className="ml-0 md:ml-2">{details.totalComments}</div>
        </div>
      </div>
      {/* Divider */}
      {/* <div className="border-b-2 border-blue-300 mb-4"></div> */}
    </div>
  );
};

export default CommPostDetails;
