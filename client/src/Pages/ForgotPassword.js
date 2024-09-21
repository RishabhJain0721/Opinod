import React, { useState } from "react";
import Topbar from "../Components/Topbar";
import { MutatingDots } from "react-loader-spinner";
import { forgotPassword } from "../APIs/AuthApis";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      await forgotPassword(email);
      alert("Password reset email sent.");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Topbar />
      {isLoading ? (
        <div className="flex flex-row items-center justify-center w-screen h-screen">
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
        <div className="flex flex-col px-5 mx-auto mt-10 md:mt-24 items-center justify-center">
          <div className="text-3xl mt-14 mb-8 text-blue-500 font-medium">
            Forgot password
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mt-1 w-80 focus:outline-none focus:border-blue-500 mb-2 "
            required
          />

          <button
            className="p-2 rounded-lg bg-blue-500 text-white text-base font-semibold mt-2 w-80 focus:outline-none"
            onClick={handleSubmit}
          >
            Send updation mail
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
