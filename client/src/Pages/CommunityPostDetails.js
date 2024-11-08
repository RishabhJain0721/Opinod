import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import Comment from "../Components/Comment";
import { addTopCommunityComment } from "../APIs/CommentApis";
import {
  getCommunityPostDetails,
  getCommunityPostComments,
} from "../APIs/CommunityApis";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CommPostDetails from "../Components/CommPostDetails";
import UploadImage from "../Components/UploadImage";
import { toast } from "react-toastify";

const CommunityPostDetails = () => {
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
  const [isAboveFooter, setIsAboveFooter] = useState(false);
  const [footerTop, setFooterTop] = useState(0);

  const username = useSelector((state) => state.user.username);

  const fetchDetails = async () => {
    try {
      setIsLoadingDetails(true);
      const res = await getCommunityPostDetails(id);
      setDetails(res);
      setIsLoadingDetails(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getCommunityPostComments(id);
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
      await addTopCommunityComment(id, newReply, image, username);
      await fetchComments();
      setNewReply("");
      setImage("");
      setTriggerRerender((prev) => !prev);
    } catch (err) {
      throw err;
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

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const commentBox = document.getElementById("comment-box");

      if (footer && commentBox) {
        const footerTop = footer.getBoundingClientRect().top;
        const commentBoxHeight = commentBox.offsetHeight;

        // Check if the comment box is close to overlapping the footer
        if (footerTop <= window.innerHeight - commentBoxHeight) {
          setIsAboveFooter(true);
        } else {
          setIsAboveFooter(false);
        }

        setFooterTop(footerTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Topbar />
      <div className="flex md:w-7/12 ml-auto mr-auto mt-16">
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
          <div className="w-full md:mt-0">
            {/* Comment box */}
            <div
              id="comment-box"
              className={`w-full md:w-7/12 fixed left-auto right-auto z-40 bottom-0`}
              style={{
                transform:
                  isAboveFooter && !isFocused
                    ? "translateY(-100%)"
                    : "translateY(0)",
                bottom:
                  isAboveFooter && !isFocused
                    ? window.innerHeight - footerTop - 72
                    : 0,
              }}
            >
              <div
                className={`flex bg-white p-3 transition-all duration-300 ${
                  isFocused ? "h-80" : "h-16"
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
                  className="text-xl md:text-2xl text-gray-600 mr-4 h-10 mt-auto"
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
                  className="bg-blue-500 text-white px-4 py-2 rounded-full h-10 mt-auto"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-sm md:text-lg"
                  />
                </button>
              </div>
            </div>

            {/* News */}
            <div className="bg-white p-0 sm:p-2 md:p-3 mb-4 w-auto h-fit">
              <div className="flex flex-col justify-between items-between mb-2">
                <CommPostDetails details={details} />

                {/* Replies */}
                <div className="flex items-start flex-col w-full pl-2">
                  {/* Heading */}
                  <div className="text-base sm:text-lg md:text-xl ml-3 font-medium mb-2 w-auto">
                    Replies :
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
                    <div className="mb-8 w-full">
                      {comments.map((comment, index) => (
                        <Comment key={index} opinion={comment} />
                      ))}
                      {comments.length === 0 && (
                        <div className="ml-auto mr-auto text-gray-500 italic text-center mt-6 mb-6">
                          No opinions available
                        </div>
                      )}
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

export default CommunityPostDetails;
