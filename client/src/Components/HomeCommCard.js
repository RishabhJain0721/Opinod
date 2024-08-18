import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinCommunity, leaveCommunity } from "../APIs/UserDetailsApis";
import { updateCommunities, updateRemoveCommunity } from "../Actions/actions";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const HomeCommCard = ({ id, name, description, image, subscribers }) => {
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
    <div className=" h-52 md:h-40 w-5/12 md:w-64 border border-gray-300 rounded-xl mb-2 m-2 cursor-pointer">
      {/* Profile photo and name */}
      <div className="flex mb-2 h-28">
        {/* <img
          src={image}
          alt="Profile"
          className="h-16 w-16 rounded-md mr-2"
          onClick={handleGoToCommunity}
        /> */}
        <div className="flex flex-col items-center justify-around">
          <div className="m-3" onClick={handleGoToCommunity}>
            {/* Title */}
            <div className="text-base font-medium text-gray-700 mb-1 border-b border-gray-300 pb-1">
              {name}
            </div>

            <div className="text-xs flex justify-between text-gray-700 mt-1 ">
              {description.length > 60
                ? description.slice(0, 60) + "..."
                : description}
            </div>
            <div className="text-xs text-blue-500 mt-2">
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

export default HomeCommCard;
