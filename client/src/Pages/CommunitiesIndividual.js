import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import CommunityTab from "../Components/CommunityTab";
import CommunityPostCard from "../Components/CommunityPostCard";
import { getCommunityData, addCommunityPost } from "../APIs/CommunityApis";
import { MutatingDots, ThreeDots } from "react-loader-spinner";
import SubcategoryCard from "../Components/SubcategoryCard";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FeedbackModal from "../Components/FeedbackModal";
import { addFeedback } from "../APIs/FeedbackApis";
import { joinCommunity, leaveCommunity } from "../APIs/UserDetailsApis";
import { updateCommunities, updateRemoveCommunity } from "../Actions/actions";
import UploadImage from "../Components/UploadImage";

const CommunitiesIndividual = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const communityId = location.pathname.split("/")[2];
  const username = useSelector((state) => state.user.username);
  const joinedCommunitiesStore = useSelector(
    (state) => state.user.joinedCommunities
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [topPosts, setTopPosts] = useState([]);
  const [community, setCommunity] = useState({});

  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const res = await getCommunityData(communityId);
        console.log(res);
        setSubcategories(res.community.subCategories);
        setName(res.community.name);
        setTopPosts(res.topPosts);
        setCommunity(res);
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
    if (!username) {
      return toast.info("Please login to add a post!");
    }
    if (
      (subcategories.length > 0 && !selectedSubcategory) ||
      !title ||
      !description
    )
      return toast.error("Please fill all the fields");
    try {
      setIsSubmitting(true);
      await addCommunityPost({
        title,
        description,
        communityId,
        selectedSubcategory,
        username,
        image,
      });
      toast.info("Post submitted for review");
      setTitle("");
      setDescription("");
      setSelectedSubcategory("");
      setImage("");
      setTriggerRerender((prev) => !prev);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageurl = (url) => {
    setImage(url);
  };

  const removeImage = () => {
    setImage("");
    setTriggerRerender((prev) => !prev);
    toast.error(`❌ Image removed`, { icon: false });
  };

  const Msg = ({ closeToast, toastProps }) => (
    <div>
      Please{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-blue-500 font-medium"
      >
        login
      </span>{" "}
      to view more!
    </div>
  );

  const handleSubmitFeedback = async () => {
    if (!feedbackText) {
      return toast.error("Please write a reply");
    }
    try {
      await addFeedback({ feedbackText, username });
      toast.success("Feedback submitted successfully");
      setFeedbackText("");
      setIsModalOpen(false);
    } catch (error) {}
  };

  const handleViewPosts = () => {
    if (!username) {
      return toast.info(<Msg />);
    }
    navigate(`/community/${communityId}/posts`);
  };

  const handleViewAllSubcategories = () => {
    if (!username) {
      return toast.info(<Msg />);
    }
    navigate(`/community/${communityId}/subcategories`);
  };

  const handleJoinCommunity = async () => {
    if (!username) {
      toast.info(<Msg />);
      return;
    }
    try {
      await joinCommunity(username, community.community._id);
      // setLoading(true);
      dispatch(updateCommunities(community.community._id));
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      await leaveCommunity(username, community.community._id);
      // setLoading(true);
      dispatch(updateRemoveCommunity(community.community._id));
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
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
              <div className="text-2xl font-semibold ml-5 md:ml-10 md:mr-10 mt-4 md:mt-8 mr-5 flex items-center justify-between text-gray-800 w-auto">
                {/* Name */}
                <div className=" font-semibold md:font-normal mb-3">{name}</div>
              </div>
              <div className="ml-5 mr-5 md:ml-10 md:mr-10 md:mt-3 mb-7">
                <CommunityTab
                  id={community.community._id}
                  image={community.community.image}
                  description={community.community.description}
                  postsCount={community.postCount}
                  subscribersCount={community.community.subscriberCount}
                  onJoinClick={
                    joinedCommunitiesStore.includes(community.community._id)
                      ? handleLeaveCommunity
                      : handleJoinCommunity
                  }
                />
              </div>

              {subcategories.length > 0 && (
                <>
                  <div className="text-xl ml-5 mr-5 md:ml-10 md:mr-10 flex items-center justify-between text-gray-800 w-auto">
                    {/* Subcategories */}
                    <div className=" font-semibold md:font-normal">
                      Explore sub-categories
                    </div>
                    <div>
                      <button
                        className="text-xs md:text-sm text-gray-600 px-2"
                        onClick={handleViewAllSubcategories}
                      >
                        See all
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-start mx-5 ">
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
                </>
              )}

              {/* Top Posts */}
              <div className="text-xl ml-5 md:ml-10 md:mr-10 mr-5 flex items-center justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal">Posts</div>
                <div>
                  <button
                    className="text-xs md:text-sm text-gray-600 px-2"
                    onClick={handleViewPosts}
                  >
                    See all
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-3 md:mx-5">
                {topPosts.map((post, index) => {
                  return <CommunityPostCard key={index} post={post} />;
                })}
              </div>
              {topPosts.length === 0 && (
                <div className=" text-xs md:text-sm text-gray-500 text-center ml-auto mr-auto p-4">
                  No posts to display in this community
                </div>
              )}

              <div className="text-xl ml-5 md:ml-10 md:mr-10  mt-4 md:mt-8 mr-5 mb-10 flex flex-col justify-between text-gray-800 w-auto">
                <div className="font-semibold md:font-normal mb-3">
                  Create New Post
                </div>
                <div className="w-full">
                  <div className="flex flex-row items-center md:space-x-4 space-x-2">
                    {/* Dropdown to select subcategory */}
                    {subcategories.length > 0 && (
                      <select
                        name="subcategory"
                        id="subcategory"
                        value={selectedSubcategory}
                        onChange={(e) => setSelectedSubcategory(e.target.value)}
                        className="text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-2/3 md:w-1/3 border border-gray-400 rounded-lg py-1"
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
                    )}
                    <span key={triggerRerender} className="text-gray-700">
                      <UploadImage
                        ongettingurl={imageurl}
                        cancel={removeImage}
                        triggerRerender={triggerRerender}
                      />
                    </span>
                  </div>

                  <div className="mt-4 space-y-4">
                    {/* Write a title */}
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      placeholder="Write a title for your post"
                      className="text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg w-full border border-gray-400 placeholder-gray-500 p-2"
                    />

                    {/* Write a description */}
                    <textarea
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      placeholder="Share your invaluable thoughts in detail"
                      className="text-base md:text-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full border border-gray-400 placeholder-gray-500 p-2 rounded-lg min-h-80"
                    />
                  </div>

                  {isSubmitting ? (
                    <div className="flex justify-center mt-4">
                      <ThreeDots
                        visible={true}
                        height="50"
                        width="40"
                        color="#212121"
                        secondarycolor="#212121"
                        radius="5"
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  ) : (
                    <button
                      onClick={handleSubmitPost}
                      className="text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-full py-2 mt-4 rounded-full text-base"
                    >
                      Submit for review
                    </button>
                  )}
                </div>
              </div>
              <FeedbackModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              >
                <div className="flex flex-col">
                  <textarea
                    className="border rounded text-xs md:text-sm p-2 mb-2"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Please write a feedback. Helps us improve!"
                  />
                  <button
                    onClick={handleSubmitFeedback}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Submit Feedback
                  </button>
                </div>
              </FeedbackModal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunitiesIndividual;
