import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import TopNavbar from "../Components/TopNavbar";
import Card from "../Components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getNews } from "../APIs/NewsApis";
import { useSelector, useDispatch } from "react-redux";
import { saveNews, selectCategory } from "../Actions/actions";
import { MutatingDots } from "react-loader-spinner";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const trendingFromStore = useSelector((state) => state.news.Trending);
  const dailyFromStore = useSelector((state) => state.news.Daily);

  const [trending, setTrending] = useState([]);
  const [daily, setDaily] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getNews();
        console.log(res);
        dispatch(saveNews(res.trendingArticles, "Trending"));
        dispatch(saveNews(res.dailyArticles, "Daily"));
        setDaily(res.dailyArticles);
        setTrending(res.trendingArticles);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (trendingFromStore.length === 0 || dailyFromStore.length === 0) {
      fetchNews();
    } else {
      setTrending(trendingFromStore);
      setDaily(dailyFromStore);
      setIsLoading(false);
    }

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

  const handleViewDaily = () => {
    if (!username) {
      alert("Please login to view more articles.");
      return;
    }
    dispatch(selectCategory("Daily"));
    navigate("/category/Daily");
  };

  return (
    <div>
      <Topbar />

      {/* Search bar */}
      {isMobile && (
        <div className="relative top-24 flex mx-3">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-900 border-r-0 rounded-l-full focus:outline-none focus:border-blue-500"
            placeholder="Search news"
          />
          <button className="px-4 border border-gray-900 border-l-0 rounded-r-full text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      )}

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
              <div className="text-2xl ml-5 md:ml-10 md:mt-7 font-semibold text-blue-500 w-auto">
                Home
              </div>
              <div className="text-lg md:text-4xl ml-5 md:ml-10 md:mt-2 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div>Trending</div>
                <div>
                  <button
                    className="text-xs md:text-lg text-gray-600 px-2"
                    onClick={handleViewTrending}
                  >
                    See all
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-start md:ml-6 ">
                {trending.slice(0, 3).map((article) => (
                  <Card
                    key={article._id}
                    id={article._id}
                    profilePhoto={article.image}
                    name={article.source}
                    datePosted={new Date(
                      article.publishedAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    title={article.title}
                    opinion={article.opinion}
                    opinionAuthorPhoto={article.opinionAuthorPhoto}
                    opinionAuthorName={article.opinionAuthorName}
                    opinionDate={new Date(
                      article.opinionDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    upvotes={article.upvotes}
                    downvotes={article.downvotes}
                  />
                ))}
              </div>
              <div className="text-lg md:text-4xl ml-5 md:ml-10 md:mt-2 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div>Daily Updates</div>
                <div>
                  <button
                    className="text-xs md:text-lg text-gray-600 px-2"
                    onClick={handleViewDaily}
                  >
                    See all
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-start md:ml-6">
                {daily.slice(0, 3).map((article) => (
                  <Card
                    key={article._id}
                    id={article._id}
                    profilePhoto={article.image}
                    name={article.source}
                    datePosted={new Date(
                      article.publishedAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    title={article.title}
                    opinion={article.opinion}
                    opinionAuthorPhoto={article.opinionAuthorPhoto}
                    opinionAuthorName={article.opinionAuthorName}
                    opinionDate={new Date(
                      article.opinionDate
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    upvotes={article.upvotes}
                    downvotes={article.downvotes}
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
