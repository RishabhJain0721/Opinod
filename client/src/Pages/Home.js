import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import MobileSearch from "../Components/MobileSearch";
import Card from "../Components/Card";
import OpinionCard from "../Components/OpinionCard";
import { getNews } from "../APIs/NewsApis";
import { getPopularOpinions } from "../APIs/CommentApis";
import { useSelector, useDispatch } from "react-redux";
import { selectCategory } from "../Actions/actions";
import { MutatingDots } from "react-loader-spinner";
import { formatDistanceToNow } from "date-fns";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  const [trending, setTrending] = useState([]);
  const [popularOpinions, setPopularOpinions] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [opinionsLoading, setOpinionsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getNews();
        setTrending(res.trendingArticles);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();

    const fetchOpinions = async () => {
      try {
        const res = await getPopularOpinions(2);
        setPopularOpinions(res);
      } catch (error) {
        console.log(error);
      } finally {
        setOpinionsLoading(false);
      }
    };
    fetchOpinions();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
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
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className=" font-semibold md:font-normal">Trending</div>
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
                  <span className="text-sm text-gray-500">General</span>
                </div>
              )}

              <div className="flex flex-wrap justify-start md:ml-6 ">
                {trending.slice(0, 3).map((article) => (
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
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-8 md:mt-2 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className=" font-semibold md:font-normal">
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
                {popularOpinions.slice(0, 3).map((opinion) => (
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
        </div>
      </div>
    </div>
  );
};

export default Home;
