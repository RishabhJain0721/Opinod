import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinCommunity, leaveCommunity } from "../APIs/UserDetailsApis";
import { useDispatch, useSelector } from "react-redux";
import { updateCommunities, updateRemoveCommunity } from "../Actions/actions";
import { ThreeDots } from "react-loader-spinner";

const CommunityCardShort = ({ id, name, image }) => {
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
          className=" h-16 w-16 rounded-full cursor-pointer"
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
