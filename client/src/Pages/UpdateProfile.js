import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import { updateProfile } from "../APIs/UserDetailsApis";
import { loginToStore } from "../Actions/actions";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [image, setImage] = useState(user.profilePicture);
  const [instagram, setInstagram] = useState(user.instagram);
  const [reddit, setReddit] = useState(user.reddit);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [twitter, setTwitter] = useState(user.twitter);

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
    console.log("File", file);
    const maxFileSize = 500 * 1024;

    if (file.size > maxFileSize) {
      alert("File size exceeds 500 KB");
    } else {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("description", description);
    formData.append("instagram", instagram);
    formData.append("reddit", reddit);
    formData.append("linkedin", linkedin);
    formData.append("twitter", twitter);
    if (image) {
      formData.append("image", image);
    }

    const res = await updateProfile(formData);
    dispatch(
      loginToStore(
        res.token,
        res.username,
        res.email,
        res.selectedCategories,
        res.profilePicture,
        res.description,
        res.likedPosts,
        res.dislikedPosts,
        res.likedComments,
        res.dislikedComments,
        res.instagram,
        res.reddit,
        res.linkedin,
        res.twitter
      )
    );
    console.log(res);
    navigate("/");
  };

  return (
    <div>
      <Topbar />
      {!isMobile && <Navbar />}
      <div className="flex mt-16">
        <div className="w-full md:ml-60 mt-11 md:mt-0">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-4 md:m-4 h-fit border md:border-blue-400">
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
                  Profile Image(max size 500 KB)
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="instagram"
                >
                  Instagram Link
                </label>
                <input
                  type="url"
                  name="instagram"
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="reddit"
                >
                  Reddit Link
                </label>
                <input
                  type="url"
                  name="reddit"
                  id="reddit"
                  value={reddit}
                  onChange={(e) => setReddit(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="linkedin"
                >
                  LinkedIn Link
                </label>
                <input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="twitter"
                >
                  Twitter Link
                </label>
                <input
                  type="url"
                  name="twitter"
                  id="twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
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
      </div>
    </div>
  );
};

export default UpdateProfile;
