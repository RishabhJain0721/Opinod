import React, { useEffect, useState } from "react";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import MobileSearch from "../Components/MobileSearch";
import CommunityCard from "../Components/CommunityCard";
import { getCommunities } from "../APIs/CommunityApis";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";

const CommunitiesJoined = () => {
  const joinedFromStore = useSelector((state) => state.user.joinedCommunities);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await getCommunities();
        res.communities.forEach((ele) => {
          if (joinedFromStore.includes(ele._id)) {
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
              <div className="text-xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal mb-4">
                  Joined Communities
                </div>

                {/* Main Topics */}
                <div className="flex flex-wrap justify-start ">
                  {communities.map((community) => (
                    <CommunityCard
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

export default CommunitiesJoined;
