import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Image from "../Assets/pic.jpg";
import { signup } from "../APIs/AuthApis";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
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
    // Placeholder for form validation
    if (!username || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    console.log(username, email, password);

    await signup({ username, email, password }).then((res) => {
      console.log("Response : ", res);
    });
    alert("Verification link sent to email. Please verify.");
  };

  return (
    <div>
      <Topbar />
      <div className="flex flex-col lg:flex-row px-5 sm:ml-10 mx-auto mt-10 md:mt-24 items-center justify-center">
        <div className="h-2/4">
          <div className="text-3xl mt-14 mb-8 text-blue-500 font-medium">
            SIGNUP
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-0.5 text-md font-medium">
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
              <label htmlFor="email" className="mb-0.5 text-md font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-lg mt-1 w-80 focus:outline-none focus:border-blue-500 mb-2 "
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-0.5 text-md font-medium">
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
            <div className="mt-2 text-sm font-medium">
              Already have an account?
              <button
                className="text-blue-500 ml-1"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
            <button
              type="submit"
              className="p-2 rounded-lg bg-blue-500 text-white text-base font-semibold mt-2 w-80 focus:outline-none"
            >
              Signup
            </button>
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
    </div>
  );
};

export default Signup;
