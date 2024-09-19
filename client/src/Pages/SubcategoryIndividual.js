import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import CommunityPostCard from "../Components/CommunityPostCard";
import { getSubcategoryPosts } from "../APIs/CommunityApis";
import { MutatingDots } from "react-loader-spinner";

const SubcategoryIndividual = () => {
  const location = useLocation();
  const subWithDash = location.pathname.split("/")[2];
  const subcategory = subWithDash.replaceAll("-", " ");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        const res = await getSubcategoryPosts(subcategory, 1);
        setTopPosts(res.topPosts);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubcategoryData();

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
        <div className="w-full   mt-11 md:mt-0">
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
              {/* Top Posts */}
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal">Posts</div>
              </div>
              <div className="flex flex-wrap justify-start mx-5 md:ml-6">
                {topPosts.map((post, index) => {
                  return <CommunityPostCard key={index} post={post} />;
                })}
                {topPosts.length === 0 && (
                  <div className="ml-auto mr-auto mt-8 italic text-gray-600 text-sm md:text-base">
                    No posts to show here
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

export default SubcategoryIndividual;
