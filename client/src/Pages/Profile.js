import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import BadgeCard from "../Components/BadgeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserDetails } from "../APIs/UserDetailsApis";
import { logout } from "../Actions/actions";
import { faCircleUser, faFilter } from "@fortawesome/free-solid-svg-icons";
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
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [filter, setFilter] = useState("All");
  const [recent, setRecent] = useState([]);
  const [recents, setRecents] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [achievements, setAchievements] = useState({});
  const [level, setLevel] = useState();
  const [isAchievementsList, setIsAchievementsList] = useState(false);
  const [isLevel, setIsLevel] = useState(false);
  const [recentLoading, setRecentLoading] = useState(false);

  const [base64Image, setBase64Image] = useState(
    user.profilePicture ? user.profilePicture.buffer : ""
  );
  const [imageType, setImageType] = useState(
    user.profilePicture ? user.profilePicture.mimetype : ""
  );

  const fetchUser = async () => {
    try {
      const res = await getUserDetails(user.username);
      if (res.profilePicture) {
        setBase64Image(res.profilePicture.buffer);
        setImageType(res.profilePicture.mimetype);
      }
      setFollowers(res.followers);
      setFollowing(res.following);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAchievements = async () => {
    try {
      setIsAchievementsList(false);
      const res = await calculateAchievements(user.username);
      setAchievements(res);
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLevel(true);
    }
  };

  const fetchRecent = async () => {
    try {
      setRecentLoading(true);
      const res = await getRecent(user.username, 5);
      setRecents(res);
      setRecent(res);
    } catch (error) {
      console.log(error);
    } finally {
      setRecentLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
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
      setRecent(a);
    } else if (filter === "Opinions") {
      const a = recents.filter((ele) => {
        return ele.type === "comment" || ele.type === "communityComment";
      });
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

  const noOfBadges = () => {
    let length = 0;
    Object.values(achievements).forEach((achi) => {
      if (achi.Message === true && !Array.isArray(achi.stats.Current)) {
        length++;
      }
      if (Array.isArray(achi.stats.Current)) {
        length += parseInt(achi.stats.Current.length);
      }
    });
    return length;
  };

  return (
    <div>
      <Topbar />

      <div className="flex mt-16">
        <div className="p-4 w-full">
          <div className="bg-white pt-4 md:p-4 md:m-4 h-fit justify-center flex flex-col">
            <div className="flex md:flex-row flex-col gap-x-20">
              <div className="flex flex-col">
                {/* First Row: Profile pic, Followers, Following, Category */}
                <div className="flex items-center justify-start mb-2 md:mb-3">
                  {imageType ? (
                    <img
                      src={`data:${imageType};base64,${base64Image}`}
                      alt="Profile"
                      className="w-16 h-16 md:w-24 md:h-24 rounded-full mr-4"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-6xl mr-4 text-gray-800"
                    />
                  )}
                  <div className="flex flex-col text-center ml-2 md:ml-5">
                    <span className="text-base md:text-xl font-semibold">
                      {followers ? followers.length : 0}
                    </span>
                    <span className="text-sm md:text-lg font-normal text-gray-500">
                      Followers
                    </span>
                  </div>
                  <div className="flex flex-col text-center ml-5">
                    <span className="text-base md:text-xl font-semibold">
                      {following ? following.length : 0}
                    </span>
                    <span className="text-sm md:text-lg font-normal text-gray-500">
                      Following
                    </span>
                  </div>
                  <div className="flex flex-col text-center ml-5">
                    <span className="text-base md:text-xl font-semibold">
                      {noOfBadges()}
                    </span>
                    <span className="text-sm md:text-lg font-normal text-gray-500">
                      Badges
                    </span>
                  </div>
                </div>

                {/* Second Row: Name and Edit button */}
                <div className="flex items-center mt-4">
                  <div className="text-xl md:text-2xl font-medium">
                    {user.username}
                  </div>
                  <button
                    className="px-2 py-1 rounded text-blue-600 duration-100 ml-1 text-xs md:text-base"
                    onClick={() => navigate("/updateProfile")}
                  >
                    Edit profile
                  </button>
                </div>

                {/* Fourth Row: Description */}
                <div className="text-gray-600 text-sm md:text-base max-w-lg">
                  {user.description !== "undefined" ? (
                    user.description
                  ) : (
                    <div className="italic text-gray-400">
                      No description added
                    </div>
                  )}
                </div>
              </div>
              {isLevel && <BadgeCard info={level} />}
            </div>

            {/* Recent Activities */}
            <div className=" text-base font-medium mb-1 md:mt-5">
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
            <div className="flex flex-col text-gray-600 text-sm">
              {recentLoading ? (
                <></>
              ) : recent.length === 0 ? (
                <div className=" italic text-center mb-3 mt-2">No recents</div>
              ) : (
                recent.slice(0, 5).map((ele, index) => {
                  if (
                    ele.type === "comment" ||
                    ele.type === "communityComment" ||
                    ele.type === "reply" ||
                    ele.type === "communityReply"
                  ) {
                    return (
                      <div key={index}>
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="  mr-2  text-blue-500"
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
                          {ele.title}
                        </span>
                      </div>
                    );
                  } else if (ele.type === "post") {
                    return (
                      <div key={index}>
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="mr-2 text-blue-500"
                        />
                        Posted -{" "}
                        <span
                          onClick={() => {
                            navigate(`/cpostdetails/${ele.postId}`);
                          }}
                          className="text-blue-500 cursor-pointer"
                        >
                          {ele.title.length > 80
                            ? ele.title.slice(0, 80) + "..."
                            : ele.title}
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
              noOfBadges() === 0 ? (
                <div className="italic text-center mb-3 mt-2 text-gray-600 text-sm">
                  No achievements to show
                </div>
              ) : (
                <div className="flex flex-col text-gray-700 text-sm">
                  {Object.entries(achievements)
                    .filter(([key, value]) => value.Message === true)
                    .slice(0, 2)
                    .map(([key, value]) => {
                      return (
                        <div key={key}>
                          <FontAwesomeIcon
                            icon={faSquare}
                            className="mr-2 text-blue-500"
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
                      <div key={index} className="text-sm">
                        <FontAwesomeIcon
                          icon={faSquare}
                          className="mr-2 text-blue-500"
                        />
                        Top {community} member
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <div className="flex items-center justify-center h-4/5">
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
            )}

            <button
              className="bg-red-500 text-white ml-auto mr-auto w-1/3 px-4 py-2 rounded hover:bg-red-600 duration-100 mt-5"
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
