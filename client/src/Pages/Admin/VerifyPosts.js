import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/AdminNav";
import VerifyPostCard from "../../Components/VerifyPostCard";
import { getUnverifiedPosts } from "../../APIs/CommunityApis";
import { MutatingDots } from "react-loader-spinner";

const VerifyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const unverifiedPosts = await getUnverifiedPosts();
      setPosts(unverifiedPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className=" text-lg  md:text-3xl text-center m-4 font-semibold text-gray-700">
        Verify Posts
      </div>
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
        <div className=" flex flex-wrap items-center m-3">
          {posts.map((post) => (
            <VerifyPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VerifyPosts;
