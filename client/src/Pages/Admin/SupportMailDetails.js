import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleSupportMail } from "../../APIs/FeedbackApis";
import { MutatingDots } from "react-loader-spinner";
import AdminNav from "../../Components/AdminNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNow } from "date-fns";

const SupportMailDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  const fetchDetails = async () => {
    try {
      setIsLoadingDetails(true);
      const res = await getSingleSupportMail(id);
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
              color="#212121"
              secondaryColor="#212121"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div className="w-full">
            <div className="bg-white p-1 sm:p-2 md:p-3 mb-4 w-auto h-fit">
              <div className="flex flex-col justify-between items-between mb-2">
                <div className="flex items-center justify-center mb-2 text-gray-700 p-5 pb-0">
                  <div className="text-sm md:text-base font-semibold">
                    Author : {details.name}
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
                <div className="text-sm md:text-base text-gray-700 font-semibold px-5">
                  Email : {details.email}
                </div>

                <div className="relative overflow-hidden m-5 text-xs sm:text-sm md:text-lg font-normal mb-4 text-gray-600">
                  <span className="font-semibold text-gray-700 md:text-base">
                    Message
                  </span>{" "}
                  : <br />
                  {details.message}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportMailDetails;
