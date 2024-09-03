import React, { useState, useEffect, useCallback } from "react";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import OpinionCard from "../Components/OpinionCard";
import MobileSearch from "../Components/MobileSearch";
import { getPopularOpinions } from "../APIs/CommentApis";
import { formatDistanceToNow } from "date-fns";
import { MutatingDots } from "react-loader-spinner";

const TopOpinions = () => {
  const [popularOpinions, setPopularOpinions] = useState([]);
  const [opinionsLoading, setOpinionsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  let isOpinionLoading = false;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const fetchOpinions = useCallback(async () => {
    try {
      const res = await getPopularOpinions(9, page);
      if (res.length > 0) {
        setPopularOpinions((prevOpinions) => {
          return [...prevOpinions, ...res].filter(
            (opinion, index, self) =>
              index === self.findIndex((o) => o._id === opinion._id)
          );
        });
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more articles available
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpinionsLoading(false);
      isOpinionLoading = false;
    }
  }, [page, isOpinionLoading, hasMore]);

  useEffect(() => {
    fetchOpinions();
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
        isOpinionLoading ||
        !hasMore
      )
        return;

      isOpinionLoading = true;
      await fetchOpinions();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [opinionsLoading, hasMore, fetchOpinions, page]);

  return (
    <div>
      <Topbar />

      {!isMobile && <Navbar />}

      <div className="flex mt-16">
        <div className="md:ml-60 md:mt-0 w-full">
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
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-5 md:mt-8 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className="text-xl font-semibold text-gray-800 w-auto">
                  Popular Opinions
                </div>
              </div>
              <div className="flex flex-wrap md:ml-6">
                {popularOpinions.map(
                  (opinion) =>
                    opinion.post && (
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
                    )
                )}

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
                    No more opinions available
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopOpinions;
