import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const CardSmall = ({
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

  const username = useSelector((state) => state.user.username);
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

  return (
    <div className="bg-white p-2 w-96 sm:w-80 lg:w-80 xl:w-96 max-w-md duration-150 h-fit md:p-3 md:rounded-lg md:border md:border-gray-300 md:shadow-sm m-4 mb-0 cursor-pointer">
      {/* Profile photo and name */}
      <div className="flex items-center mb-1" onClick={handleClick}>
        <img
          src={profilePhoto}
          alt="Main"
          className="h-20 w-20 rounded-lg mr-2"
        />
        <div className=" w-full justify-between">
          {/* <div className=" text-xs text-gray-500">{cat}</div> */}
          {/* Title */}
          <div className="text-sm md:text-base font-medium text-gray-700 mb-1">
            {title.length > 70 ? title.slice(0, 70) + "..." : title}
          </div>
          <div className="text-xs flex justify-between text-gray-700 ">
            {name.length > 15 ? name.slice(0, 15) + "..." : name}

            <div className="text-gray-500 flex items-center">
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

export default CardSmall;
