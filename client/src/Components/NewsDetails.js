import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

const NewsDetails = (props) => {
  const details = props.details;
  return (
    <div className="p-2">
      {/* Profile photo and name */}
      <div className="flex items-center mb-2 text-gray-700">
        <img
          src={details.profilePhoto}
          alt="Profile"
          className="w-6 h-6 rounded-full mr-2"
        />
        <div className="text-sm md:text-base font-semibold">
          {details.source}
        </div>
        <div className="ml-auto text-xs md:text-sm text-gray-500">
          {new Date(details.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Title */}
      <div className=" text-lg md:text-2xl font-semibold mb-1 md:mb-4 text-blue-500">
        {details.title}
      </div>

      {/* Content */}
      <div className=" text-xs md:text-lg font-normal mb-4 text-gray-700">
        {details.content}
      </div>

      {/* Image */}
      <div className="mb-4">
        <img src={details.image} alt="News" className="w-full rounded-lg" />
      </div>

      {/* Reacts and comments count */}
      <div className="flex my-5 text-lg font-semibold text-gray-700">
        <div>Reacts : {details.upvotes + details.downvotes}</div>
        <div className="ml-10">Comments : {details.totalComments}</div>
      </div>

      {/* Upvote, Downvote, Shares */}
      <div className="flex items-center justify-between mb-5 text-gray-700">
        <div className="flex flex-row items-center">
          <button className="px-1">
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <div className="ml-0 md:ml-2">{details.upvotes} Agrees</div>
        </div>
        <div className="flex flex-row items-center">
          <button className="px-1">
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="ml-0 md:ml-2">{details.downvotes} Disagrees</div>
        </div>
        <div className="flex flex-row items-center">
          <button className="px-1">
            <FontAwesomeIcon icon={faShareNodes} />
          </button>
          <div className="ml-0 md:ml-2">Share</div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b-2 border-blue-300 mb-4"></div>
    </div>
  );
};

export default NewsDetails;
