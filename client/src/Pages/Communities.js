import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import MobileSearch from "../Components/MobileSearch";
import CommunityCardShort from "../Components/CommunityCardShort";
import CommunityCard from "../Components/CommunityCard";
import { useSelector } from "react-redux";
import { getCommunities } from "../APIs/CommunityApis";
import { MutatingDots } from "react-loader-spinner";

const Communities = () => {
  const navigate = useNavigate();
  const joinedFromStore = useSelector((state) => state.user.joinedCommunities);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [joined, setJoined] = useState([]);
  const [main, setMain] = useState([]);
  const [special, setSpecial] = useState([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await getCommunities();
        res.communities.forEach((ele) => {
          if (ele.parent === "main") {
            setMain((prev) => [...prev, ele]);
          }
          if (ele.parent === "special") {
            setSpecial((prev) => [...prev, ele]);
          }
          if (joinedFromStore.includes(ele._id)) {
            setJoined((prev) => [...prev, ele]);
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

  const handleViewMain = () => {
    navigate("/communities/main");
  };

  const handleViewSpecial = () => {
    navigate("/communities/special");
  };

  const handleViewJoined = () => {
    navigate("/communities/joined");
  };

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
              <div className="text-base md:text-2xl ml-5 md:ml-10 md:mr-10 mt-4 md:mt-8 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className="font-medium text-gray-700">
                  Joined Communities
                </div>
                <div>
                  <button
                    className="text-xs md:text-sm text-gray-600 px-2"
                    onClick={handleViewJoined}
                  >
                    See all
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-start ml-3 md:ml-8 mt-4 md:mt-8 mr-5">
                {joined.length ? (
                  joined
                    .slice(0, 3)
                    .map((community) => (
                      <CommunityCard
                        key={community._id}
                        id={community._id}
                        name={community.name}
                        description={community.description}
                        image={community.image}
                        subscribers={community.subscriberCount}
                      />
                    ))
                ) : (
                  <div className=" text-gray-600 ml-auto mr-auto text-xs md:text-sm">
                    No communities joined
                  </div>
                )}
              </div>

              <div className="text-base md:text-2xl ml-5 md:ml-10 md:mr-10 mt-4 md:mt-8 mr-5 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-medium text-gray-700">Explore</div>

                {/* Main Topics */}
                <div className="flex justify-between items-center">
                  <div className="font-normal text-sm md:text-lg text-gray-600">
                    Main Topics
                  </div>
                  <div>
                    <button
                      className="text-xs md:text-sm text-gray-600 px-2"
                      onClick={handleViewMain}
                    >
                      See all
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap justify-start">
                  {main.slice(0, isMobile ? 3 : 5).map((community) => (
                    <CommunityCardShort
                      key={community._id}
                      id={community._id}
                      name={community.name}
                      image={community.image}
                    />
                  ))}
                </div>

                {/* Special Interest Groups */}
                <div className="flex justify-between items-center">
                  <div className="font-normal text-sm md:text-lg text-gray-600">
                    Special Interest Groups
                  </div>
                  <div>
                    <button
                      className="text-xs md:text-sm text-gray-600 px-2"
                      onClick={handleViewSpecial}
                    >
                      See all
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap justify-start">
                  {special.slice(0, isMobile ? 3 : 5).map((community) => (
                    <CommunityCardShort
                      key={community._id}
                      id={community._id}
                      name={community.name}
                      image={community.image}
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

export default Communities;
