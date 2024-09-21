import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import NewsDetails from "../Components/NewsDetails";
import Comment from "../Components/Comment";
import { getNewsById } from "../APIs/NewsApis";
import { addTopComment, getComments } from "../APIs/CommentApis";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import UploadImage from "../Components/UploadImage";
import { toast } from "react-toastify";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [newReply, setNewReply] = useState("");
  const [comments, setComments] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [image, setImage] = useState("");
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const username = useSelector((state) => state.user.username);

  const fetchDetails = async () => {
    try {
      setIsLoadingDetails(true);
      const res = await getNewsById(id);
      setDetails(res);
      setIsLoadingDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getComments(id);
      setComments(res);
      setIsLoadingComments(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchComments();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  const handleAddTopComment = async () => {
    if (!newReply) {
      toast.error("Please write something.");
      return;
    }

    try {
      setIsLoadingComments(true);
      await addTopComment(id, newReply, image, username);
      await fetchComments();
      setTriggerRerender((prev) => !prev);
    } catch (err) {
      throw err;
    } finally {
      setNewReply("");
      setImage("");
    }
  };

  const imageurl = (url) => {
    setImage(url);
  };

  const removeImage = () => {
    setImage("");
    setTriggerRerender((prev) => !prev);
    toast.error(`❌ Image removed`, { icon: false });
  };

  return (
    <div>
      <Topbar />

      <div className="flex mt-16">
        {isLoadingDetails ? (
          <div className="flex items-center justify-center w-screen h-96  ">
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
          <div className="w-full md:ml-5 md:mr-5  md:mt-0 ">
            {/* Comment box */}
            <div className="w-full fixed bottom-0 left-0 z-40">
              <div
                className={`flex bg-white border border-t-2 p-3 transition-all duration-300 ${
                  isFocused ? " h-80" : "h-16"
                }`}
              >
                <textarea
                  type="text"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="border border-gray-500 rounded w-11/12 text-sm p-3 mr-3 md:ml-2 overflow-y-auto no-scrollbar::-webkit-scrollbar no-scrollbar"
                  placeholder="Give your opinion"
                />
                <div
                  className="text-xl md:text-2xl text-gray-600 mt-auto mb-2 mr-4 h-10"
                  key={triggerRerender}
                >
                  <UploadImage
                    ongettingurl={imageurl}
                    cancel={removeImage}
                    triggerRerender={triggerRerender}
                  />
                </div>
                <button
                  onClick={handleAddTopComment}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2 mt-auto h-10"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-sm md:text-lg"
                  />
                </button>
              </div>
            </div>

            {/* News */}
            <div className="bg-white p-1 sm:p-2 md:p-3 mb-4 w-auto h-fit">
              <div className="flex flex-col justify-between items-between mb-2">
                <NewsDetails details={details} />

                {/* Replies */}
                <div className="flex items-start flex-col w-full pl-2">
                  {/* Heading */}
                  <div className="text-base sm:text-lg md:text-xl font-medium mb-2 w-full">
                    Opinions :
                  </div>

                  {isLoadingComments ? (
                    <div className="flex items-center justify-center w-full">
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
                    <div className=" mb-16">
                      {comments.map((comment, index) => (
                        <Comment key={index} opinion={comment} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
