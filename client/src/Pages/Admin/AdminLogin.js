import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Image from "../Assets/pic.jpg";
import { adminLogin } from "../../APIs/AuthApis";
import { useDispatch } from "react-redux";
import { adminLoginToStore } from "../../Actions/actions";
import { MutatingDots } from "react-loader-spinner";

const AdminLogin = () => {
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
        setUsername(value);
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
    setIsLoading(true);
    try {
      const res = await adminLogin({ username, password });
      if (res.message === "Admin login successful") {
        setError("");
        dispatch(adminLoginToStore(res.username));
        navigate("/admin/verifyPosts");
      } else setError(res.message);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
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
        <div className="flex flex-col items-center justify-start h-screen ">
          <div className="text-3xl mt-14 mb-8 text-blue-500 font-medium">
            ADMIN LOGIN
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-0.5 text-md font-medium">
                Admin Handle
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
            <div className="text-red-500 text-center text-sm">{error}</div>
            <button
              type="submit"
              className="p-2 rounded-lg bg-blue-500 text-white text-base font-semibold mt-2 w-80 focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
