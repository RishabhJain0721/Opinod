import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinCommunity, leaveCommunity } from "../APIs/UserDetailsApis";
import { useDispatch, useSelector } from "react-redux";
import { updateCommunities, updateRemoveCommunity } from "../Actions/actions";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const CommunityCardShort = ({ id, name, image, posts, subscribers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);
  const joinedCommunitiesStore = useSelector(
    (state) => state.user.joinedCommunities
  );
  const [loading, setLoading] = useState(false);

  const handleGoToCommunity = () => {
    navigate(`/community/${id}`);
  };

  const handleJoinCommunity = async () => {
    if (!username) {
      toast.info("Please login to join community!");
    }
    try {
      await joinCommunity(username, id);
      setLoading(true);
      dispatch(updateCommunities(id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      await leaveCommunity(username, id);
      setLoading(true);
      dispatch(updateRemoveCommunity(id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex-wrap w-1/3 md:w-1/5 mb-2 mt-2 md:mt-10 md:mb-10 ">
      {/* Profile photo and name */}
      <div className="flex flex-col items-center mb-2">
        <img
          src={image}
          alt="Profile"
          className=" h-20 w-20 rounded-full cursor-pointer"
          onClick={handleGoToCommunity}
        />
        <div className="w-full flex flex-col items-center justify-between">
          {/* Title */}
          <div
            className="text-sm md:text-base text-center font-medium text-gray-700 mt-3 mb-1 cursor-pointer"
            onClick={handleGoToCommunity}
          >
            {name}
          </div>
          {/* Description */}
          <div className="text-xs text-center text-gray-500 mx-3">
            {posts >= 0 ? posts + " posts" : ""}
          </div>
          {/* Subscribers */}
          <div className="text-xs text-center text-gray-500 mx-3">
            {subscribers >= 0 ? subscribers + " subscribers" : ""}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          {/* Join/Leave button */}
          {joinedCommunitiesStore.includes(id) ? (
            <button
              className="text-center text-blue-500 border border-blue-500 rounded-l-full rounded-r-full text-sm py-0.5 w-20 px-2"
              onClick={handleLeaveCommunity}
            >
              {loading ? (
                <div className="p-1 flex items-center justify-center">
                  <ThreeDots
                    height="10"
                    width="20"
                    radius="1"
                    color="#3B82F6"
                  />
                </div>
              ) : (
                "Joined"
              )}
            </button>
          ) : (
            <button
              className="text-center bg-blue-500 text-white rounded-l-full rounded-r-full text-sm py-0.5 w-20 px-2"
              onClick={handleJoinCommunity}
            >
              {loading ? (
                <div className="p-1 flex items-center justify-center">
                  <ThreeDots height="10" width="20" radius="1" color="#fff" />
                </div>
              ) : (
                "Join"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityCardShort;
