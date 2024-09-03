import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import MobileSearch from "../Components/MobileSearch";
import { search } from "../APIs/SearchApis";
import { MutatingDots } from "react-loader-spinner";
import { formatDistanceToNow } from "date-fns";
import CommunityPostCard from "../Components/CommunityPostCard";
import CardSmall from "../Components/CardSmall";

const Search = () => {
  const location = useLocation();
  const searchText = location.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState(true);
  const [community, setCommunity] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [communityData, setCommunityData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const fetchSearch = async () => {
    try {
      setIsLoading(true);
      const res = await search(searchText);
      setNewsData(res.posts);
      setCommunityData(res.communityPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearch();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [searchText]);

  const toggleView = () => {
    if (news) {
      setNews(false);
      setCommunity(true);
    } else {
      setNews(true);
      setCommunity(false);
    }
  };

  return (
    <div>
      <Topbar />

      {!isMobile && <Navbar />}

      <div className="flex mt-4 md:mt-16">
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
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 font-medium md:font-normal text-gray-800">
                {newsData.length + communityData.length} search results for :{" "}
                {searchText}
              </div>
              <div className="flex w-full justify-around text-gray-800 font-medium md:text-xl mt-2 p-1 cursor-pointer">
                <div
                  onClick={toggleView}
                  className={`${
                    news ? "bg-slate-200 rounded-lg" : ""
                  } w-1/2 ml-5 flex justify-center p-1`}
                >
                  News
                </div>
                <div
                  onClick={toggleView}
                  className={`${
                    community ? "bg-slate-200 rounded-lg" : ""
                  } w-1/2 mr-5 flex justify-center p-1`}
                >
                  Community
                </div>
              </div>

              {news && (
                <div className="flex flex-wrap justify-start md:ml-3 mb-5">
                  {newsData.map((news) => (
                    <CardSmall
                      key={news._id}
                      id={news._id}
                      profilePhoto={news.image}
                      cat={news.category}
                      name={news.source}
                      datePosted={formatDistanceToNow(
                        new Date(news.publishedAt),
                        { addSuffix: false }
                      )}
                      title={news.title}
                      upvotes={news.upvotes}
                      downvotes={news.downvotes}
                    />
                  ))}
                  {newsData.length === 0 && (
                    <div className="text-gray-600 text-sm md:text-lg text-center mx-auto mt-20">
                      No News Articles Found
                    </div>
                  )}
                </div>
              )}

              {community && (
                <div className="flex flex-wrap justify-start mx-5 md:ml-6">
                  {communityData.map((community) => (
                    <CommunityPostCard key={community.id} post={community} />
                  ))}
                  {communityData.length === 0 && (
                    <div className="text-gray-600 text-sm md:text-lg text-center mx-auto mt-20">
                      No Community Posts Found
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
