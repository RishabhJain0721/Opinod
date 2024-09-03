import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/AdminNav";
import { getReportedComments, deleteComment } from "../../APIs/CommentApis";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const Reports = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchReportedComments = async () => {
    try {
      const comments = await getReportedComments();
      setComments(comments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportedComments();
  }, []);

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className=" text-lg  md:text-3xl text-center m-4 font-semibold text-gray-700">
        Reported Comments
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#2196F3"
            secondaryColor="#2196F3"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className=" flex flex-wrap items-center m-3">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col p-2 m-2 bg-white border border-gray-400 rounded-lg mb-2"
            >
              <div className="flex mb-2">
                <div className="flex flex-row">
                  <div className="text-sm font-medium">{comment.author}</div>
                  <div className="text-xs text-gray-500 ml-2">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="text-sm">{comment.text}</div>
              <button
                className="bg-red-500 text-white mt-2 py-0.5 w-20 rounded-md "
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
