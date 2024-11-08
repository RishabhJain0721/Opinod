import { useSelector } from "react-redux";
const CommunityTab = ({
  id,
  image,
  description,
  postsCount,
  subscribersCount,
  onJoinClick,
}) => {
  const joinedCommunitiesStore = useSelector(
    (state) => state.user.joinedCommunities
  );
  return (
    <div className=" bg-gradient-to-tr to-gray-800 via-blue-900 via-20% from-gray-800 from-10% text-white p-6 rounded-lg shadow-lg flex justify-between items-start md:items-center flex-col md:flex-row md:space-x-6">
      {/* Left section: Image and Description */}
      <div className="flex md:flex-col flex-row justify-center items-center md:items-start ">
        {/* Image */}
        <img
          src={image}
          alt="Community"
          className="w-32 h-32 rounded-lg object-cover mb-4"
        />
        {/* Description */}
        <p className="text-sm max-w-sm md:ml-0 ml-3">{description}</p>
      </div>

      {/* Right section: Card with posts, subscribers, and join button */}
      <div className="bg-white text-sm md:text-lg text-gray-800 rounded-lg shadow p-4 md:w-5/12 w-full">
        <div className="mb-1">
          <div className="flex justify-between font-semibold items-center mb-2">
            <span>Stats</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span>Posts</span>
            <span className="font-semibold">{postsCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Subscribers</span>
            <span className="font-semibold">{subscribersCount}</span>
          </div>
        </div>
        {joinedCommunitiesStore.includes(id) ? (
          <button
            onClick={onJoinClick}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full text-center font-bold transition"
          >
            Leave Community
          </button>
        ) : (
          <button
            onClick={onJoinClick}
            className="mt-4 border border-transparent bg-gradient-to-r to-gray-800 from-blue-900  text-white px-4 py-2 rounded-lg w-full text-center font-bold hover:bg-blue-600 transition"
          >
            Join Community
          </button>
        )}
      </div>
    </div>
  );
};

export default CommunityTab;
