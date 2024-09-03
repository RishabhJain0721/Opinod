import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import { getCommunityData, addCommunityPost } from "../APIs/CommunityApis";
import { MutatingDots } from "react-loader-spinner";
import SubcategoryCard from "../Components/SubcategoryCard";
import { useSelector } from "react-redux";

const CommunitySubcategories = () => {
  const location = useLocation();
  const communityId = location.pathname.split("/")[2];

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const res = await getCommunityData(communityId);
        setSubcategories(res.subcategories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunityData();

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
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className=" font-semibold md:font-normal mb-3">
                  Explore sub-categories
                </div>
              </div>

              <div className="flex flex-wrap justify-start mx-5 md:ml-6">
                {subcategories.map((subcategory, index) => {
                  return (
                    <SubcategoryCard
                      key={index}
                      name={subcategory.name}
                      image={subcategory.image}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitySubcategories;
