import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinCommunity, leaveCommunity } from "../APIs/UserDetailsApis";
import { updateCommunities, updateRemoveCommunity } from "../Actions/actions";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const HomeCommCard = ({
  id,
  name,
  image,
  description,
  subscribers,
  posts,
  topPostTitle,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector((state) => state.user.username);
  // const joinedCommunitiesStore = useSelector(
  //   (state) => state.user.joinedCommunities
  // );
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
    // <div className="h-40 md:h-40 w-full border border-blue-300 rounded-xl mb-2 md:mr-6 cursor-pointer">
    //   {/* Profile photo and name */}
    //   <div className="flex mb-2 h-28">
    //     <div className="flex flex-col items-center justify-around w-full">
    //       <div className="m-3 w-full" onClick={handleGoToCommunity}>
    //         {/* Title */}
    //         <div className="text-base  font-semibold text-gray-900 pb-1 px-2">
    //           {name}
    //         </div>
    //         <div className="flex flex-col md:flex-row md:justify-between mb-1">
    //           <div className="text-xs text-gray-500 px-2">{posts} posts</div>
    //           <div className="text-xs text-gray-500 px-2">
    //             {subscribers} subscribers
    //           </div>
    //         </div>

    //         <hr className="h-px border-0 dark:bg-blue-300 " />

    //         <div className="text-base md:text-xl font-medium flex justify-between text-gray-900 mt-1 px-2">
    //           {String(topPostTitle).length > 10
    //             ? String(topPostTitle).slice(0, 10) + "..."
    //             : topPostTitle}
    //         </div>
    //       </div>
    //       <div className="flex w-full justify-end mt-0">
    //         <button
    //           className="text-center bg-blue-500 text-white rounded-l-full rounded-r-full text-xs md:text-sm py-1.5 w-full px-2 mx-2"
    //           // onClick={handleJoinCommunity}
    //           onClick={handleGoToCommunity}
    //         >
    //           {loading ? (
    //             <div className="p-1 flex items-center justify-center">
    //               <ThreeDots height="10" width="20" radius="1" color="#fff" />
    //             </div>
    //           ) : (
    //             "Join Conversation"
    //           )}
    //         </button>
    //         {/* )} */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg relative">
      <div className="relative">
        {/* Background Image */}
        <img
          className="w-full h-32  md:h-48 object-cover"
          src={image}
          alt="Community"
        />

        {/* Title - Overlapping Text */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <h1 className="text-white text-xl lg:text-3xl text-center font-bold">
            {name}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="p-2 md:p-4 text-xs md:text-sm">
        <p className="text-gray-700">{description}</p>
        <div className="mt-2 md:mt-4">
          <span className="text-gray-600 font-semibold">{subscribers}</span>{" "}
          Subscribers
        </div>
        <div className="mt-1 md:mt-2">
          <span className="text-gray-600 font-semibold">{posts}</span> Posts
        </div>
      </div>
    </div>
  );
};

export default HomeCommCard;
