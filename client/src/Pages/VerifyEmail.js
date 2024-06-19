import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { verifyEmail } from "../APIs/AuthApis";
import { useDispatch } from "react-redux";
import { loginToStore } from "../Actions/actions";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    // Make an API call to your server to verify the email using the token
    verifyEmail(token).then((res) => {
      console.log("Response : ", res);
      dispatch(
        loginToStore(
          res.token,
          res.username,
          res.email,
          res.selectedCategories,
          res.profilePicture
        )
      );
      navigate("/selectCategories");
    });
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <p className=" text-4xl">Verifying your email</p>
      <InfinitySpin width="200" color="#424242" />
    </div>
  );
};

export default VerifyEmail;
