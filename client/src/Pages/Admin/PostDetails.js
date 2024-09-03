import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getUnverifiedPostDetails,
  verifyPost,
  discardPost,
} from "../../APIs/CommunityApis";
import { MutatingDots } from "react-loader-spinner";
import AdminNav from "../../Components/AdminNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState();
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);

  const fetchDetails = async () => {
    try {
      setIsLoadingDetails(true);
      const res = await getUnverifiedPostDetails(id);
      setDetails(res);
      setIsLoadingDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleVerify = async () => {
    if (isDiscarding) {
      return;
    }
    try {
      setIsVerifying(true);
      await verifyPost(id);
      toast.success("Post Verified Successfully");
      navigate("/admin/verifyPosts");
    } catch (error) {
      console.log(error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDiscard = async () => {
    if (isVerifying) {
      return;
    }
    try {
      setIsDiscarding(true);
      await discardPost(id);
      toast.success("Post Discarded Successfully");
      navigate("/admin/verifyPosts");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDiscarding(false);
    }
  };

  return (
    <div>
      <AdminNav />
      <div>
        {isLoadingDetails ? (
          <div className="flex items-center justify-center w-screen h-96">
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#2196F3"
              secondaryColor="#2196F3"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
            />
          </div>
        ) : (
          <div className="w-full">
            <div className="bg-white p-1 sm:p-2 md:p-3 mb-4 w-auto h-fit">
              <div className="flex flex-col justify-between items-between mb-2">
                <div className="flex items-center justify-center mb-2 text-gray-700 p-5 pb-0">
                  <div className="text-sm md:text-base font-semibold">
                    Author : {details.author}
                  </div>
                  <div className="ml-auto text-xs md:text-sm text-gray-500 flex items-center">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-gray-500 ml-3 mr-1"
                    />
                    {formatDistanceToNow(new Date(details.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </div>

                <div className="text-xs md:text-sm text-gray-500 mb-2 mx-5">
                  {details.subCategory}
                </div>

                <div className="text-base md:text-2xl font-medium text-gray-800 mx-5">
                  {details.title}
                </div>

                <div className="relative overflow-hidden mx-5 text-xs sm:text-sm md:text-lg font-normal mb-4 text-gray-600">
                  {details.description}
                </div>

                <div className="text-white mx-5">
                  {isVerifying ? (
                    <button className="bg-green-700 px-4 py-2 w-1/3 rounded-md mr-3 ">
                      Verifying...
                    </button>
                  ) : (
                    <button
                      className="bg-green-600 px-4 py-2 w-1/3 rounded-md mr-3 "
                      onClick={handleVerify}
                    >
                      Verify
                    </button>
                  )}

                  {isDiscarding ? (
                    <button className="bg-red-700 px-4 py-2 w-1/3 rounded-md ">
                      Discarding...
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 px-4 py-2 w-1/3 rounded-md "
                      onClick={handleDiscard}
                    >
                      Discard
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
