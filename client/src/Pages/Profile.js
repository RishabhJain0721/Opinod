import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import BadgeCard from "../Components/BadgeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faInstagram,
//   faTwitter,
//   faReddit,
//   faLinkedin,
// } from "@fortawesome/free-brands-svg-icons";
import { logout } from "../Actions/actions";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import {
  calculateAchievements,
  calculateLevel,
  getRecent,
} from "../APIs/UserDetailsApis";
import { MutatingDots } from "react-loader-spinner";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filter, setFilter] = useState("All");
  const [recent, setRecent] = useState([]);
  const [recents, setRecents] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [achievements, setAchievements] = useState({});
  const [level, setLevel] = useState();
  const [isAchievementsList, setIsAchievementsList] = useState(false);
  const [isLevel, setIsLevel] = useState(false);
  const [recentLoading, setRecentLoading] = useState(false);

  const base64Image = user.profilePicture.buffer;
  const imageType = user.profilePicture.mimetype;
  const src = `data:${imageType};base64,${base64Image}`;

  const fetchAchievements = async () => {
    try {
      setIsAchievementsList(false);
      const res = await calculateAchievements(user.username);
      setAchievements(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAchievementsList(true);
    }
  };

  const fetchLevel = async () => {
    try {
      setIsLevel(false);
      const res = await calculateLevel(user.username);
      setLevel(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLevel(true);
    }
  };

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
    fetchLevel();
    fetchAchievements();
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
    }
  }, [filter]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectFilter = (option) => {
    setFilter(option);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Topbar />
      {!isMobile && <Navbar />}
      <div className="flex mt-16">
        <div className="md:ml-60 p-4 w-full">
          <div className="bg-white p-4 md:p-4 md:m-4 h-fit">
            {/* First Row: Profile pic, Followers, Following, Category */}
            <div className="flex items-center justify-start mb-2 md:mb-4">
              <img
                src={src}
                alt="Profile"
                className="w-16 h-16 md:w-24 md:h-24 rounded-full mr-4"
              />
              <div className="flex flex-col text-center ml-2 md:ml-5">
                <span className="text-lg md:text-xl font-semibold">{308}</span>
                <span className="text-base md:text-lg font-normal text-gray-500">
                  Followers
                </span>
              </div>
              <div className="flex flex-col text-center ml-5">
                <span className="text-lg md:text-xl font-semibold">{100}</span>
                <span className="text-base md:text-lg font-normal text-gray-500">
                  Following
                </span>
              </div>
              <div className="flex flex-col text-center ml-5">
                <span className="text-lg md:text-xl font-semibold">
                  {user.categories.length}
                </span>
                <span className="text-base md:text-lg font-normal text-gray-500">
                  Badges
                </span>
              </div>
            </div>

            {/* Second Row: Name and Edit button */}

            <div className="flex items-center">
              <div className="text-lg font-medium">{user.username}</div>
              <button
                className="px-2 py-1 rounded text-blue-600 duration-100 ml-1 text-sm md:text-base"
                onClick={() => navigate("/updateProfile")}
              >
                Edit profile
              </button>
            </div>

            {/* Third Row: Email */}
            {/* <div className="text-xs md:text-lg text-gray-700 mb-4">
              {user.email}
            </div> */}

            {/* Fourth Row: Description */}
            <div className="text-gray-600 text-sm md:text-base">
              {user.description}
            </div>

            {isLevel && <BadgeCard info={level} />}

            {/* Social Media Links */}
            {/* <div className="flex justify-start mb-6">
              <a href={user.instagram} className="mx-2 text-blue-600">
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              </a>
              <a href={user.reddit} className="mx-2 text-blue-600">
                <FontAwesomeIcon icon={faReddit} className="text-2xl" />
              </a>
              <a href={user.linkedin} className="mx-2 text-blue-600">
                <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
              </a>
              <a href={user.twitter} className="mx-2 text-blue-600">
                <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
              </a>
            </div> */}

            {/* Recent Activities */}
            <div className=" text-base font-medium mb-1">
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
                <button
                  className="px-2 font-normal text-gray-600 text-xs md:text-base"
                  onClick={() => navigate("/recents")}
                >
                  See all
                </button>
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
                </div>
              )}
            </div>
            <div className="flex flex-col text-gray-600">
              {recentLoading ? (
                <></>
              ) : (
                recent.slice(0, 5).map((ele, index) => {
                  if (
                    ele.type === "comment" ||
                    ele.type === "communityComment"
                  ) {
                    return (
                      <div key={index}>
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="  mr-2 text-xs md:text-sm text-blue-500"
                        />
                        Shared opinion on{" "}
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
                          className="mr-2 text-xs md:text-sm text-blue-500"
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

            {/* Achievements */}
            <div className="flex items-center justify-between text-lg font-medium mt-2">
              <span>Achievements</span>
              <button
                className="px-2 font-normal text-gray-600 text-xs md:text-base"
                onClick={() => navigate("/achievements")}
              >
                See all
              </button>
            </div>

            {isAchievementsList ? (
              <div className="flex flex-col text-gray-700">
                {Object.entries(achievements)
                  .slice(0, 3)
                  .map(([key, value]) => {
                    return (
                      <div key={key}>
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="  mr-2 text-xs md:text-sm text-blue-500"
                        />
                        {key}
                      </div>
                    );
                  })}
                {achievements["Top Community Member"].stats.Current.slice(
                  0,
                  2
                ).map((community, index) => {
                  return (
                    <div key={index}>
                      <FontAwesomeIcon
                        icon={faSquare}
                        className="  mr-2 text-xs md:text-sm text-blue-500"
                      />
                      Top {community} member
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-4/5">
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
            )}

            {/* Edit Profile and Logout Buttons */}

            <button
              className="bg-red-500 text-white w-full px-4 py-2 rounded hover:bg-red-600 duration-100 mt-5"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
