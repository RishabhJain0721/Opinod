import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import MobileSearch from "../Components/MobileSearch";
import CommunityCardShort from "../Components/CommunityCardShort";
import { getCommunities } from "../APIs/CommunityApis";
import { MutatingDots } from "react-loader-spinner";

const CommunitiesMain = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[2];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await getCommunities();
        res.communities.forEach((ele) => {
          if (ele.parent === type) {
            setCommunities((prev) => [...prev, ele]);
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunities();

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
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal">
                  {type.slice(0, 1).toUpperCase() + type.slice(1)} Topics
                </div>

                {/* Main Topics */}
                <div className="flex flex-wrap justify-start">
                  {communities.map((community) => (
                    <CommunityCardShort
                      key={community._id}
                      id={community._id}
                      name={community.name}
                      description={community.description}
                      image={community.image}
                      subscribers={community.subscriberCount}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CommunitiesSpecial = () => {
  const location = useLocation();
  const type = location.pathname.split("/")[2];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await getCommunities();
        res.communities.forEach((ele) => {
          if (ele.parent === type) {
            setCommunities((prev) => [...prev, ele]);
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunities();

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
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal">
                  {type.slice(0, 1).toUpperCase() + type.slice(1)} Topics
                </div>

                {/* Main Topics */}
                <div className="flex flex-wrap justify-start">
                  {communities.map((community) => (
                    <CommunityCardShort
                      key={community._id}
                      id={community._id}
                      name={community.name}
                      description={community.description}
                      image={community.image}
                      subscribers={community.subscriberCount}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { CommunitiesMain, CommunitiesSpecial };
