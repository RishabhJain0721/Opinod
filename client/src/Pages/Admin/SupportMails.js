import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/AdminNav";
import { getSupportMails } from "../../APIs/FeedbackApis";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import SupportMailCard from "../../Components/SupportMailCard";
// import FeedbackCard from "../../Components/FeedbackCard";

const SupportMails = () => {
  const [supportMails, setSupportMails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchSupportMails = async () => {
    try {
      const supportMails = await getSupportMails();
      console.log(supportMails);
      setSupportMails(supportMails);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportMails();
  }, []);

  return (
    <div>
      <AdminNav />
      <div className=" text-lg  md:text-3xl text-center m-4 font-semibold text-gray-700">
        Support
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
          {supportMails.map((supportMail) => {
            return <SupportMailCard key={supportMail._id} post={supportMail} />;
          })}
        </div>
      )}
    </div>
  );
};

export default SupportMails;
