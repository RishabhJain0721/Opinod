import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleFeedback } from "../../APIs/FeedbackApis";
import { MutatingDots } from "react-loader-spinner";
import AdminNav from "../../Components/AdminNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow } from "date-fns";

const FeedbackDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  const fetchDetails = async () => {
    try {
      setIsLoadingDetails(true);
      const res = await getSingleFeedback(id);
      setDetails(res);
      setIsLoadingDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

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
                    Author : {details.username}
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

                <div className="relative overflow-hidden mx-5 text-xs sm:text-sm md:text-lg font-normal mb-4 text-gray-600">
                  {details.text}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackDetails;
