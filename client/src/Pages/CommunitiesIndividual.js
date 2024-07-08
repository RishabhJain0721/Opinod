import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import CommunityPostCard from "../Components/CommunityPostCard";
import { getCommunityData, addCommunityPost } from "../APIs/CommunityApis";
import { MutatingDots } from "react-loader-spinner";
import SubcategoryCard from "../Components/SubcategoryCard";
import { useSelector } from "react-redux";

const CommunitiesIndividual = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const communityId = location.pathname.split("/")[2];
  const username = useSelector((state) => state.user.username);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);
  const [topPosts, setTopPosts] = useState([]);

  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const res = await getCommunityData(communityId);
        console.log(res);
        setSubcategories(res.subcategories);
        setTopPosts(res.topPosts);
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

  const handleSubmitPost = async () => {
    try {
      const res = await addCommunityPost({
        title,
        description,
        communityId,
        selectedSubcategory,
        username,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewAllSubcategories = () => {
    navigate(`/community/${communityId}/subcategories`);
  };

  return (
    <div>
      <Topbar />

      {/* {isMobile && <MobileSearch />} */}

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
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex items-center justify-between text-gray-800 w-auto">
                {/* Subcategories */}
                <div className=" font-semibold md:font-normal mb-3">
                  Explore sub-categories
                </div>
                <div>
                  <button
                    className="text-xs md:text-lg text-gray-600 px-2"
                    onClick={handleViewAllSubcategories}
                  >
                    See all
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-start mx-5 md:ml-6">
                {subcategories
                  .slice(0, isMobile ? 3 : 5)
                  .map((subcategory, index) => {
                    return (
                      <SubcategoryCard
                        key={index}
                        name={subcategory.name}
                        image={subcategory.image}
                      />
                    );
                  })}
              </div>

              {/* Top Posts */}
              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal">Posts</div>
              </div>
              <div className="flex flex-wrap justify-start mx-5 md:ml-6">
                {topPosts.map((post, index) => {
                  return <CommunityPostCard key={index} post={post} />;
                })}
              </div>

              <div className="text-xl md:text-4xl ml-5 md:ml-10 mt-4 md:mt-8 mr-5 mb-10 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal mb-3">
                  Create New Post
                </div>
                <div className=" w-full py-5 px-5 border border-blue-200 rounded-xl ">
                  <div className="flex flex-col space-y-4">
                    {/* Dropdown to select subcategory */}
                    <select
                      name="subcategory"
                      id="subcategory"
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="text-sm text-gray-600 focus:outline-none w-1/2 md:w-1/3"
                    >
                      <option value="">Choose Subcategory</option>
                      {subcategories.map((category, index) => {
                        return (
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                    {/* Write a title  */}
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Write a title for your post"
                      className="text-base text-gray-800 focus:outline-none ml-1 w-7/12 border-b border-gray-400 mb-1 placeholder-gray-600"
                    />
                    {/* Write a description */}
                    <input
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add description"
                      className="text-2xl text-gray-800 focus:outline-none ml-1 w-7/12 border-b border-gray-400 mb-1 placeholder-gray-600"
                    />
                  </div>

                  <button
                    onClick={handleSubmitPost}
                    className="text-white bg-blue-500 w-full py-2 mt-4 rounded-l-full rounded-r-full text-base"
                  >
                    Submit for review
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesIndividual;
