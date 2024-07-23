import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import MobileSearch from "../Components/MobileSearch";
import Card from "../Components/Card";
import OpinionCard from "../Components/OpinionCard";
import CommunityCardShort from "../Components/CommunityCardShort";
import { getNews } from "../APIs/NewsApis";
import { getPopularOpinions } from "../APIs/CommentApis";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../Actions/actions";
import { MutatingDots } from "react-loader-spinner";
import { formatDistanceToNow } from "date-fns";
import { getCommunities } from "../APIs/CommunityApis";
import { calculateUpgrade, getRecent } from "../APIs/UserDetailsApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const points = useSelector((state) => state.user.points);

  const [trending, setTrending] = useState([]);
  const [popularOpinions, setPopularOpinions] = useState([]);
  const [topCommunities, setTopCommunities] = useState([]);
  const [recent, setRecent] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 1280);
  const [isLoading, setIsLoading] = useState(false);
  const [opinionsLoading, setOpinionsLoading] = useState(false);
  const [communitiesLoading, setCommunitiesLoading] = useState(false);
  const [recentLoading, setRecentLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const res = await getNews();
      console.log(res);
      setTrending(res.trendingArticles);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOpinions = async () => {
    try {
      setOpinionsLoading(true);
      const res = await getPopularOpinions(isMobile ? 2 : 3, 1);
      console.log(res);
      setPopularOpinions(res);
    } catch (error) {
      console.log(error);
    } finally {
      setOpinionsLoading(false);
    }
  };

  const fetchCommunities = async () => {
    try {
      setCommunitiesLoading(true);
      const res = await getCommunities();
      console.log(res);
      setTopCommunities(res.communities);
    } catch (error) {
      console.log(error);
    } finally {
      setCommunitiesLoading(false);
    }
  };

  const fetchRecent = async () => {
    try {
      setRecentLoading(true);
      const res = await getRecent(null);
      console.log(res);
      setRecent(res);
    } catch (error) {
      console.log(error);
    } finally {
      setRecentLoading(false);
    }
  };

  const fetchUpgrade = async () => {
    try {
      const res = await calculateUpgrade(username, points);
      console.log(res);
      if (res.status) {
        alert("Congratulations! You have been upgraded to the next level.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchOpinions();
    fetchCommunities();
    fetchRecent();
    fetchUpgrade();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const smallScreen = window.innerWidth < 1280;
      setSmallScreen(smallScreen);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleViewTrending = () => {
    if (!username) {
      alert("Please login to view more articles.");
      return;
    }
    dispatch(selectCategory("Trending"));
    navigate("/category/Trending");
  };

  const handleViewPopularOpinions = () => {
    if (!username) {
      alert("Please login to view more articles.");
      return;
    }
    navigate("/topOpinions");
  };

  const handleViewTopCommunities = () => {
    if (!username) {
      alert("Please login to view more articles.");
      return;
    }
    navigate("/communities");
  };

  return (
    <div>
      <Topbar />

      {isMobile && <MobileSearch />}

      {!isMobile && <Navbar />}

      <div className="flex mt-16">
        <div className="w-full md:ml-60 mt-11 md:mt-0">
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
            <>
              <div className="text-sm md:text-4xl ml-5 md:ml-10 mt-2 md:mt-8 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className="font-medium md:font-normal">Trending</div>
                <div>
                  <button
                    className="text-xs md:text-lg text-gray-600 px-2"
                    onClick={handleViewTrending}
                  >
                    See all
                  </button>
                </div>
              </div>
              {isMobile && (
                <div className="flex items-center ml-6">
                  <span className="text-xs text-gray-500">General</span>
                </div>
              )}

              <div className="flex flex-wrap justify-start md:ml-6 ">
                {trending.slice(0, smallScreen ? 2 : 3).map((article) => (
                  <Card
                    key={article._id}
                    id={article._id}
                    profilePhoto={article.image}
                    cat={article.category}
                    name={article.source}
                    datePosted={formatDistanceToNow(
                      new Date(article.publishedAt),
                      { addSuffix: true }
                    )}
                    title={article.title}
                    upvotes={article.upvotes}
                    downvotes={article.downvotes}
                    opinionId={article.opinionId}
                    opinion={article.opinion}
                    opinionAuthorPhoto={article.opinionAuthorPhoto}
                    opinionAuthorName={article.opinionAuthorName}
                    opinionDate={formatDistanceToNow(
                      new Date(
                        article.opinionDate
                          ? article.opinionDate
                          : article.publishedAt
                      ),
                      { addSuffix: true }
                    )}
                    opinionUpvotes={article.commentUpvotes}
                    opinionDownvotes={article.commentDownvotes}
                  />
                ))}
              </div>
            </>
          )}

          {opinionsLoading ? (
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
            <>
              <div className="text-sm md:text-4xl ml-5 md:ml-10 mt-3 md:mt-5 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className="font-medium md:font-normal w-2/3">
                  Popular Opinions
                </div>
                <div>
                  <button
                    className="text-xs md:text-lg text-gray-600 px-2"
                    onClick={handleViewPopularOpinions}
                  >
                    See all
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-start md:ml-6">
                {popularOpinions
                  .slice(0, smallScreen ? 2 : 3)
                  .map((opinion) => (
                    <OpinionCard
                      key={opinion._id}
                      id={opinion._id}
                      category={opinion.post.category}
                      profilePhoto={opinion.authorPicture.profilePicture}
                      author={opinion.author}
                      datePosted={formatDistanceToNow(
                        new Date(opinion.createdAt),
                        { addSuffix: true }
                      )}
                      title={opinion.post.title}
                      text={opinion.text}
                      upvotes={opinion.upvotes}
                      downvotes={opinion.downvotes}
                      postId={opinion.post._id}
                    />
                  ))}
              </div>
            </>
          )}

          {communitiesLoading ? (
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
            <>
              <div className="text-sm md:text-4xl ml-5 md:ml-10 mt-5 md:mt-2 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className="font-medium md:font-normal w-2/3">
                  Top Communities
                </div>
                <div>
                  <button
                    className="text-xs md:text-lg text-gray-600 px-2"
                    onClick={handleViewTopCommunities}
                  >
                    See all
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-start mx-5 md:ml-6">
                {topCommunities.slice(0, isMobile ? 3 : 4).map((community) => (
                  <CommunityCardShort
                    key={community._id}
                    id={community._id}
                    name={community.name}
                    image={community.image}
                  />
                ))}
              </div>
            </>
          )}

          {recentLoading ? (
            <></>
          ) : (
            <>
              <div className="text-sm md:text-4xl ml-5 md:ml-10 mt-5 md:mt-2 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className="font-medium md:font-normal w-2/3 mb-2">
                  Recent Activities
                </div>
              </div>
              <div className="flex flex-wrap justify-start text-xs md:text-base mx-5 md:ml-10 text-gray-600 mb-10">
                <div className=" w-full">
                  {recent.map((ele, index) => {
                    if (ele.type === "like" || ele.type === "communityLike") {
                      return (
                        <div key={index}>
                          <FontAwesomeIcon
                            icon={faSquare}
                            className="  mr-2 text-xs md:text-sm text-blue-500"
                          />
                          <span className="text-gray-800 font-medium">
                            {ele.username}
                          </span>{" "}
                          liked{" "}
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
                          <span className="text-gray-800 font-medium">
                            {ele.author}
                          </span>{" "}
                          commented on{" "}
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
                          <span className="text-gray-800 font-medium">
                            {ele.author}
                          </span>{" "}
                          replied to{" "}
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
                          <span className="text-gray-800 font-medium">
                            {ele.username}
                          </span>{" "}
                          posted a new{" "}
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
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
