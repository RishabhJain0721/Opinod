import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../Components/Topbar";
import CommunityPostCard from "../Components/CommunityPostCard";
import { getCommunityPosts } from "../APIs/CommunityApis";
import { MutatingDots } from "react-loader-spinner";

const CommunityPosts = () => {
  const location = useLocation();
  const communityId = location.pathname.split("/")[2];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const mainTopics = [
    { "World News": "6687e1617a839bf9ff5c6553" },
    { Politics: "6687e1617a839bf9ff5c6554" },
    { Business: "6687e1617a839bf9ff5c6555" },
    { Technology: "6687e1617a839bf9ff5c6556" },
    { Science: "6687e1617a839bf9ff5c6557" },
    { Health: "6687e1617a839bf9ff5c6558" },
    { Environment: "6687e1617a839bf9ff5c6559" },
    { Sports: "6687e1617a839bf9ff5c655a" },
    { Entertainment: "6687e1617a839bf9ff5c655b" },
  ];

  const specialIntrestGroups = [
    { "Expert Opinions": "66858c5444d20fd45e533bbe" },
    { "Educational Resources": "66858c5444d20fd45e533bbf" },
    { "Book & Article Reviews": "66858c5444d20fd45e533bc0" },
    { "Poetry/Storytelling": "66f68b5f5d137e724b48d5b1" },
    { Motivational: "66f68ba55d137e724b48d5b3" },
    { Interviews: "66f68d4d5d137e724b48d5b4" },
  ];

  const communityIdNameMap = [...mainTopics, ...specialIntrestGroups].reduce(
    (acc, comm) => {
      acc[Object.values(comm)[0]] = Object.keys(comm)[0];
      return acc;
    },
    {}
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getCommunityPosts(communityId, page);
        console.log(res);
        setPosts(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Topbar />

      <div className="flex mt-4 md:mt-16">
        <div className="w-full mt-11 md:mt-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
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
            <>
              {/* Top Posts */}
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal">
                  {communityIdNameMap[communityId]}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 md:mx-5">
                {posts.map((post, index) => {
                  return <CommunityPostCard key={index} post={post} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPosts;
