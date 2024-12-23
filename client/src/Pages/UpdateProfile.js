import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../Components/Topbar";
import { updateProfile } from "../APIs/UserDetailsApis";
import { loginToStore } from "../Actions/actions";
import { MutatingDots } from "react-loader-spinner";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [image, setImage] = useState(user.profilePicture);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 10000 * 1024;

    if (file.size > maxFileSize) {
      alert("File size exceeds 10 MB");
      return;
    } else {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      setIsUpdating(true);
      const res = await updateProfile(formData);
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
      navigate("/profile");
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <Topbar />

      <div className="flex mt-16">
        {!isUpdating ? (
          <div className="w-full   mt-11 md:mt-0">
            <div className="bg-white rounded-lg p-4 md:p-4 md:m-4 h-fit  md:border-blue-400">
              <form onSubmit={handleSubmit} type="multipart/form-data">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="profileImage"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex justify-start space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 duration-100"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 duration-100"
                    onClick={() => navigate("/profile")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full md:ml-64 mt-48">
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
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
