import React, { useEffect, useState, useCallback } from "react";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import { getNewsByCategory } from "../APIs/NewsApis";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";
import MobileSearch from "../Components/MobileSearch";

const CategoryNews = () => {
  const category = useSelector((state) => state.category.category);
  const userCategories = useSelector((state) => state.user.categories);
  const username = useSelector((state) => state.user.username);
  let isArticleLoading = false;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(async () => {
    try {
      let payload =
        category === "Trending"
          ? { category, username, page, userCategories }
          : { category, username, page };
      const res = await getNewsByCategory(payload);
      if (res.length > 0) {
        setNews((prevNews) => [...prevNews, ...res]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more articles available
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      isArticleLoading = false;
    }
  }, [category, username, page, isLoading, hasMore]);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    const handleScroll = async () => {
      if (
        window.innerHeight + Math.round(window.scrollY) <=
          document.body.offsetHeight - 2 ||
        isArticleLoading ||
        !hasMore
      )
        return;

      isArticleLoading = true;
      await fetchNews();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore, fetchNews]);

  return (
    <div>
      <Topbar />
      <div className="flex mt-4 md:mt-16">
        <div className="w-full mt-11 md:mt-0">
          <div className="text-base md:text-2xl ml-5 md:ml-10 md:mr-10 mt-4 md:mt-7 mb-2 font-medium text-gray-700 w-auto">
            {category}
          </div>

          {isLoading ? (
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
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 ml-3 md:ml-10 md:mr-10 mr-5 ">
                {news.map((article) => (
                  <Card
                    key={article._id}
                    id={article._id}
                    profilePhoto={article.image}
                    cat={article.category}
                    name={article.source}
                    datePosted={new Date(
                      article.publishedAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    title={article.title}
                    upvotes={article.upvotes}
                    downvotes={article.downvotes}
                    opinionId={article.opinionId}
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
                    opinionUpvotes={article.commentUpvotes}
                    opinionDownvotes={article.commentDownvotes}
                  />
                ))}
              </div>
              {hasMore && (
                <div className="flex items-center justify-center w-full h-24">
                  <MutatingDots
                    visible={true}
                    height="50"
                    width="50"
                    color="#2196F3"
                    secondaryColor="#2196F3"
                    radius="7.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              )}
              {!hasMore && (
                <div className="flex items-center justify-center w-full h-24 text-gray-600">
                  No more articles available
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryNews;
