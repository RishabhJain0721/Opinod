import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Image from "../Assets/pic.jpg";
import { login } from "../APIs/AuthApis";
import { useDispatch } from "react-redux";
import { loginToStore } from "../Actions/actions";
import { MutatingDots } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value.toLowerCase());
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      const res = await login({ username, password });
      console.log("Response : ", res.message);
      dispatch(
        loginToStore(
          res.token,
          res.username,
          res.email,
          res.selectedCategories,
          res.joinedCommunities,
          res.profilePicture,
          res.description,
          res.likedPosts,
          res.dislikedPosts,
          res.likedComments,
          res.dislikedComments,
          res.points,
          res.followers,
          res.following
        )
      );
      navigate("/");
    } catch (error) {
      setError(error.response.data.errorName);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
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
            color="#2196F3"
            secondaryColor="#2196F3"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row px-5 sm:ml-10 mx-auto mt-10 md:mt-24 items-center justify-center">
          <div className="h-2/4">
            <div className="text-3xl mt-14 mb-8 text-blue-500 font-medium">
              LOGIN
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="mb-0.5 text-md font-medium"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg mt-1 w-80 focus:outline-none focus:border-blue-500 mb-2 "
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="mb-0.5 text-md font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg mt-1 w-80 focus:outline-none focus:border-blue-500 mb-2 "
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="mt-2 text-sm font-medium">
                Don't have an account?
                <button
                  className="text-blue-500 ml-1"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </div>
              <button
                type="submit"
                className="p-2 rounded-lg bg-blue-500 text-white text-base font-semibold mt-2 w-80 focus:outline-none"
              >
                Login
              </button>

              <div className="mt-2 text-sm text-center font-medium">
                Forgot
                <button
                  className="text-blue-500 ml-1"
                  onClick={() => navigate("/forgotUsername")}
                >
                  Username
                </button>{" "}
                /
                <button
                  className="text-blue-500 ml-1"
                  onClick={() => navigate("/forgotPassword")}
                >
                  Password
                </button>{" "}
                ?
              </div>
            </form>
          </div>
          <div className=" h-96">
            <img
              src={Image}
              alt="Failed to load"
              className=" h-1/2 sm:h-2/3 lg:h-full ml-0 lg:ml-20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
