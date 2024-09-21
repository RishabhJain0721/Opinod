import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/AdminNav";
import { getFeedbacks } from "../../APIs/FeedbackApis";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import FeedbackCard from "../../Components/FeedbackCard";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchFeedbacks = async () => {
    try {
      const feedbacks = await getFeedbacks();
      setFeedbacks(feedbacks);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  //   const handleDelete = async (commentId) => {
  //     try {
  //       console.log(commentId);
  //       await deleteComment(commentId);
  //       toast.success("Comment deleted successfully");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <div>
      <AdminNav />
      <div className=" text-lg  md:text-3xl text-center m-4 font-semibold text-gray-700">
        Feedbacks
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#212121"
            secondarycolor="#212121"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className=" flex flex-wrap items-center m-3">
          {/* {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="flex flex-col p-2 m-2 bg-white border border-gray-400 rounded-lg mb-2"
            >
              <div className="flex mb-2">
                <div className="flex flex-row">
                  <div className="text-sm font-medium">{feedback.username}</div>
                  <div className="text-xs text-gray-500 ml-2">
                    {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="text-sm">{feedback.text}</div>
            </div>
          ))} */}
          {feedbacks.map((feedback) => {
            return <FeedbackCard key={feedback._id} post={feedback} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
