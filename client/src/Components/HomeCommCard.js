import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinCommunity, leaveCommunity } from "../APIs/UserDetailsApis";
import { updateCommunities, updateRemoveCommunity } from "../Actions/actions";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const HomeCommCard = ({ id, name, subscribers, posts, topPostTitle }) => {
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
      toast.info(<Msg />);
      return;
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

  const Msg = ({ closeToast, toastProps }) => (
    <div>
      Please{" "}
      <span
        onClick={() => navigate("/login")}
        className="text-blue-500 font-medium"
      >
        login
      </span>{" "}
      to join a community
    </div>
  );

  return (
    <div className="h-44 w-5/12 md:w-64 border border-blue-300 rounded-xl mb-2 mr-6 cursor-pointer">
      {/* Profile photo and name */}
      <div className="flex mb-2 h-28">
        {/* <img
          src={image}
          alt="Profile"
          className="h-16 w-16 rounded-md mr-2"
          onClick={handleGoToCommunity}
        /> */}
        <div className="flex flex-col items-center justify-around w-full">
          <div className="m-3 w-full" onClick={handleGoToCommunity}>
            {/* Title */}
            <div className="text-base font-medium text-gray-700 mb-1 pb-1 px-3">
              {name}
            </div>
            <hr className="h-px border-0 dark:bg-blue-300 " />

            <div className="text-base  md:text-xl font-medium flex justify-between text-gray-700 mt-1 px-3">
              {String(topPostTitle).length > 10
                ? String(topPostTitle).slice(0, 10) + "..."
                : topPostTitle}
            </div>
            <div className="text-xs text-gray-500 mt-2 px-3">{posts} posts</div>
            <div className="text-xs text-gray-500 mt-2 px-3">
              {subscribers} subscribers
            </div>
          </div>
          <div className="flex w-4/5 justify-end">
            {joinedCommunitiesStore.includes(id) ? (
              <button
                className="text-center text-blue-500 border border-blue-500 rounded-l-full rounded-r-full text-sm py-0.5 w-full px-2"
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
                className="text-center bg-blue-500 text-white rounded-l-full rounded-r-full text-sm py-0.5 w-full px-2"
                onClick={handleJoinCommunity}
              >
                {loading ? (
                  <div className="p-1 flex items-center justify-center">
                    <ThreeDots height="10" width="20" radius="1" color="#fff" />
                  </div>
                ) : (
                  "Join Conversation"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCommCard;
