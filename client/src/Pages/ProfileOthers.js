import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import {
  getUserDetails,
  getUserPosts,
  getUserComments,
  followUser,
  unfollowUser,
} from "../APIs/UserDetailsApis";
import { useSelector, useDispatch } from "react-redux";
import { MutatingDots } from "react-loader-spinner";
import UserPostCard from "../Components/UserPostCard";
import UserComment from "../Components/UserComment";
import { follow, unfollow } from "../Actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const ProfileOthers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const name = location.pathname.split("/")[2];
  const username = useSelector((state) => state.user.username);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState({});
  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const [p, setP] = useState(true);
  const [c, setC] = useState(false);

  const following = useSelector((state) => state.user.following);
  const [isFollowing, setIsFollowing] = useState(
    following?.includes(name) ? true : false
  );

  const [base64Image, setBase64Image] = useState("");
  const [imageType, setImageType] = useState("");
  //   const src = `data:${imageType};base64,${base64Image}`;

  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const res = await getUserDetails(name);
      if (!res.profilePicture) navigate("/*");
      setUser(res);
      setBase64Image(res.profilePicture.buffer);
      setImageType(res.profilePicture.mimetype);
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      const res = await getUserPosts(name);
      setPosts(res);
    } catch (error) {
      console.log(error);
    } finally {
      setPostsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const res = await getUserComments(name);
      setComments(res);
    } catch (error) {
      console.log(error);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchComments();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getUserLevel(points) {
    if (points < 500) {
      return 1;
    } else if (points < 1000) {
      return 2;
    } else if (points < 1500) {
      return 3;
    } else if (points < 2000) {
      return 4;
    } else if (points < 2500) {
      return 5;
    } else if (points < 3000) {
      return 6;
    } else if (points < 3500) {
      return 7;
    }
    // Default case if none of the above conditions match
    return 7;
  }

  const handleFollow = async () => {
    try {
      await followUser(username, name);
      dispatch(follow(name));
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(username, name);
      dispatch(unfollow(name));
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleView = () => {
    if (p) {
      setP(false);
      setC(true);
    } else {
      setP(true);
      setC(false);
    }
  };

  return (
    <div>
      <Topbar />

      <div className="flex mt-16 flex-col  ">
        {userLoading ? (
          <div className="flex items-center justify-center w-full mt-20  ">
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
          <div className="p-4 pb-0 w-full">
            <div className="bg-white p-4 h-fit">
              {/* First Row: Profile pic, Followers, Following, Category */}
              <div className="flex items-center justify-start mb-2 md:mb-4">
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
                  <span className="text-lg md:text-xl font-semibold">
                    {user.followers ? user.followers.length : 0}
                  </span>
                  <span className="text-base md:text-lg font-normal text-gray-500">
                    Followers
                  </span>
                </div>
                <div className="flex flex-col text-center ml-5">
                  <span className="text-lg md:text-xl font-semibold">
                    {user.following ? user.following.length : 0}
                  </span>
                  <span className="text-base md:text-lg font-normal text-gray-500">
                    Following
                  </span>
                </div>
                <div className="flex flex-col text-center ml-5">
                  <span className="text-lg md:text-xl font-semibold">
                    {getUserLevel(user.points)}
                  </span>
                  <span className="text-base md:text-lg font-normal text-gray-500">
                    Level
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-col md:flex-row">
                <div className="md:w-11/12">
                  {/* Name */}
                  <div className="text-2xl font-medium">{user.username}</div>
                  {/* Description */}
                  <div className="text-gray-600 text-sm md:text-base">
                    {user.description !== "undefined" ? (
                      user.description
                    ) : (
                      <div className="italic text-gray-400">
                        No description added
                      </div>
                    )}
                  </div>
                </div>
                {/* Follow button */}
                <div className=" border-gray-300 border-2 rounded-md p-4 h-min w-auto max-w-xs mt-4 md:ml-4">
                  {isFollowing ? (
                    <>
                      <div className="text-xs md:text-sm">
                        Follow {user.username} to get his articles on top feed
                        in home page!
                      </div>
                      <button
                        className="bg-red-500 text-white font-semibold w-full rounded-md px-4 py-2 mt-3"
                        onClick={handleUnfollow}
                      >
                        Unfollow
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-xs md:text-sm">
                        Follow {user.username} to get his articles on top feed
                        in home page!
                      </div>
                      <button
                        className="bg-gray-800 text-white font-semibold w-full rounded-md px-4 py-2 mt-3"
                        onClick={handleFollow}
                      >
                        Follow
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full md:w-1/2  justify-center md:justify-start md:ml-12 gap-x-5 text-gray-800 font-medium md:text-lg p-0 cursor-pointer">
          <div
            onClick={toggleView}
            className={`${
              p ? "border-b-2 border-blue-500" : ""
            }  w-1/5 md:w-20 flex justify-center p-1`}
          >
            Posts
          </div>
          <div
            onClick={toggleView}
            className={`${
              c ? "border-b-2 border-blue-500" : ""
            } w-1/5 md:w-20 flex justify-center p-1`}
          >
            Opinions
          </div>
        </div>
        {postsLoading ? (
          <div className="flex items-center justify-center w-full  ">
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
          p && (
            <div className="flex flex-wrap justify-start mx-5 md:ml-5">
              {posts.map((post, index) => {
                return <UserPostCard key={index} post={post} />;
              })}
              {posts.length === 0 && (
                <div className="ml-auto mr-auto text-gray-500 italic mt-10">
                  No posts available
                </div>
              )}
            </div>
          )
        )}
        {commentsLoading ? (
          <div className="flex items-center justify-center w-full mt-20">
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
          c && (
            <div className="flex flex-wrap justify-start mx-5 md:ml-5">
              {comments.map((comment, index) => {
                return <UserComment key={index} opinion={comment} />;
              })}
              {comments.length === 0 && (
                <div className="ml-auto mr-auto text-gray-500 italic mt-10 mb-10">
                  No opinions available
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProfileOthers;
