import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { getRecent } from "../APIs/UserDetailsApis";

const Recents = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filter, setFilter] = useState("All");
  const [recent, setRecent] = useState([]);
  const [recents, setRecents] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentLoading, setRecentLoading] = useState(false);

  const fetchRecent = async () => {
    try {
      setRecentLoading(true);
      const res = await getRecent(user.username);
      console.log(res);
      setRecents(res);
      setRecent(res);
    } catch (error) {
      console.log(error);
    } finally {
      setRecentLoading(false);
    }
  };

  useEffect(() => {
    fetchRecent();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setRecent(recents);
    } else if (filter === "Posts") {
      const a = recents.filter((ele) => {
        return ele.type === "post";
      });
      console.log(a);
      setRecent(a);
    } else if (filter === "Opinions") {
      const a = recents.filter((ele) => {
        return ele.type === "comment" || ele.type === "communityComment";
      });
      console.log(a);
      setRecent(a);
    } else if (filter === "Likes") {
      const a = recents.filter((ele) => {
        return ele.type === "like" || ele.type === "communityLike";
      });
      console.log(a);
      setRecent(a);
    }
  }, [filter]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectFilter = (option) => {
    setFilter(option);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <Topbar />
      {!isMobile && <Navbar />}
      <div className="flex mt-16">
        <div className="md:ml-60 p-4 w-full">
          <div>
            {/* Recent Activities */}
            <div className=" text-base font-medium mb-1 mt-2">
              <div className="flex items-center justify-between text-lg font-medium">
                <span>
                  Recent Activities{" "}
                  <button
                    onClick={toggleDropdown}
                    className=" rounded px-2 py-1 text-xs"
                  >
                    <FontAwesomeIcon
                      icon={faFilter}
                      className=" text-gray-600 text-xs"
                    />
                  </button>
                </span>
              </div>

              {isDropdownOpen && (
                <div className="absolute bg-white border text-base rounded shadow-md mt-1 ml-36 z-50">
                  <div
                    onClick={() => selectFilter("All")}
                    className="px-4 py-1 cursor-pointer hover:bg-gray-100"
                  >
                    All
                  </div>
                  <div
                    onClick={() => selectFilter("Posts")}
                    className="px-4 py-1 cursor-pointer hover:bg-gray-100"
                  >
                    Posts
                  </div>
                  <div
                    onClick={() => selectFilter("Opinions")}
                    className="px-4 py-1 cursor-pointer hover:bg-gray-100"
                  >
                    Opinions
                  </div>
                  <div
                    onClick={() => selectFilter("Likes")}
                    className="px-4 py-1 cursor-pointer hover:bg-gray-100"
                  >
                    Likes
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col text-gray-600">
              {recentLoading ? (
                <></>
              ) : (
                recent.map((ele, index) => {
                  if (ele.type === "like" || ele.type === "communityLike") {
                    return (
                      <div key={index}>
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="  mr-2 text-xs md:text-sm text-blue-500"
                        />
                        Liked{" "}
                        <span
                          onClick={() => {
                            if (ele.type === "like") {
                              navigate(`/details/${ele.postId}`);
                            } else if (ele.type === "communityLike") {
                              navigate(`/cpostdetails/${ele.postId}`);
                            }
                          }}
                          className="text-blue-500 cursor-pointer"
                        >
                          this
                        </span>{" "}
                        post
                      </div>
                    );
                  } else if (
                    ele.type === "comment" ||
                    ele.type === "communityComment"
                  ) {
                    return (
                      <div key={index}>
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="  mr-2 text-xs md:text-sm text-blue-500"
                        />
                        Commented on{" "}
                        <span
                          onClick={() => {
                            if (ele.type === "comment") {
                              navigate(`/details/${ele.postId}`);
                            } else if (ele.type === "communityComment") {
                              navigate(`/cpostdetails/${ele.postId}`);
                            }
                          }}
                          className="text-blue-500 cursor-pointer"
                        >
                          this
                        </span>{" "}
                        post
                      </div>
                    );
                  } else if (
                    ele.type === "reply" ||
                    ele.type === "communityReply"
                  ) {
                    return (
                      <div key={index}>
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="  mr-2 text-xs md:text-sm text-blue-500"
                        />
                        Replied to{" "}
                        <span
                          onClick={() => {
                            if (ele.type === "reply") {
                              navigate(`/details/${ele.postId}`);
                            } else if (ele.type === "communityReply") {
                              navigate(`/cpostdetails/${ele.postId}`);
                            }
                          }}
                          className="text-blue-500 cursor-pointer"
                        >
                          this
                        </span>{" "}
                        post
                      </div>
                    );
                  } else if (ele.type === "post") {
                    return (
                      <div key={index}>
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="  mr-2 text-xs md:text-sm text-blue-500"
                        />
                        Posted a new{" "}
                        <span
                          onClick={() =>
                            navigate(`/cpostdetails/${ele.postId}`)
                          }
                          className="text-blue-500 cursor-pointer"
                        >
                          article
                        </span>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recents;
