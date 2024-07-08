import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinCommunity, leaveCommunity } from "../APIs/UserDetailsApis";
import { updateCommunities, updateRemoveCommunity } from "../Actions/actions";
import { ThreeDots } from "react-loader-spinner";

const CommunityCard = ({ id, name, description, image, subscribers }) => {
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
    <div className="bg-white w-96 sm:w-80 m-2 lg:w-80 xl:w-96 max-w-md duration-150 h-fit mb-2 cursor-pointer">
      {/* Profile photo and name */}
      <div className="flex mb-2">
        <img
          src={image}
          alt="Profile"
          className="h-16 w-16 rounded-md mr-2"
          onClick={handleGoToCommunity}
        />
        <div className="w-full flex items-center justify-between">
          <div className="w-3/4" onClick={handleGoToCommunity}>
            {/* Title */}
            <div className="text-base font-medium text-gray-700 mb-1">
              {name}
              <span className="text-blue-500 ml-2 text-sm">{subscribers}</span>
            </div>
            <div className="text-xs flex justify-between text-gray-700 ">
              {description.length > 60
                ? description.slice(0, 60) + "..."
                : description}
            </div>
          </div>
          <div className="flex w-1/4 justify-end">
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
    </div>
  );
};

export default CommunityCard;
