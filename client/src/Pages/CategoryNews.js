import React, { useEffect, useState } from "react";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import TopNavbar from "../Components/TopNavbar";
import Card from "../Components/Card";
import { getNewsByCategory } from "../APIs/NewsApis";
import { useSelector, useDispatch } from "react-redux";
import { saveNews } from "../Actions/actions";
import { MutatingDots } from "react-loader-spinner";
import MobileSearch from "../Components/MobileSearch";

const CategoryNews = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  const username = useSelector((state) => state.user.username);
  const newsFromStore = useSelector((state) => state.news);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchNews = async () => {
      try {
        const res = await getNewsByCategory(category, username);
        console.log(res);
        if (category === "Most Commented") {
          dispatch(saveNews(res, "MostCommented"));
        } else if (category === "Most Reacted") {
          dispatch(saveNews(res, "MostReacted"));
        } else {
          dispatch(saveNews(res, category));
        }
        setNews(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (
      (category === "Trending" || category === "Daily") &&
      newsFromStore[category].length === 3
    ) {
      fetchNews();
    } else if (
      newsFromStore[
        category === "Most Commented"
          ? "MostCommented"
          : category === "Most Reacted"
          ? "MostReacted"
          : category
      ].length === 0
    ) {
      fetchNews();
    } else {
      setNews(
        newsFromStore[
          category === "Most Commented"
            ? "MostCommented"
            : category === "Most Reacted"
            ? "MostReacted"
            : category
        ]
      );
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
  }, [category, newsFromStore]);

  return (
    <div>
      <Topbar />
      {isMobile && <MobileSearch />}
      {!isMobile && <Navbar />}
      <div className="flex mt-16">
        <div className="w-full md:ml-60 mt-11 md:mt-0">
          <div className="text-2xl ml-5 md:ml-10 mt-5 md:mt-7 font-semibold text-blue-600 w-auto">
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
            <div className="flex flex-wrap justify-start md:ml-6 ">
              {news.map((article) => (
                <Card
                  key={article._id}
                  id={article._id}
                  profilePhoto={article.image}
                  name={article.source}
                  datePosted={new Date(article.publishedAt).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                  title={article.title}
                  opinion={article.opinion}
                  opinionAuthorPhoto={article.opinionAuthorPhoto}
                  opinionAuthorName={article.opinionAuthorName}
                  opinionDate={new Date(article.opinionDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                  upvotes={article.upvotes}
                  downvotes={article.downvotes}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryNews;
