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
import { calculateUpgrade } from "../APIs/UserDetailsApis";

const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [newReply, setNewReply] = useState("");
  const [comments, setComments] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const username = useSelector((state) => state.user.username);
  const points = useSelector((state) => state.user.points);

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
      console.log(res);
      setComments(res);
      setIsLoadingComments(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUpgrade = async () => {
    try {
      const res = await calculateUpgrade(username, points);
      console.log(res);
      if (res.status) {
        alert("Congratulations! You have been upgraded to the next level.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchComments();
    fetchUpgrade();

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
      alert("Please write something.");
      return;
    }

    try {
      setIsLoadingComments(true);
      await addTopComment(id, newReply, username);
      await fetchComments();
      setNewReply("");
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      <Topbar />
      {!isMobile && <Navbar />}
      <div className="flex mt-16">
        {isLoadingDetails ? (
          <div className="flex items-center justify-center w-screen h-96 md:ml-60">
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
          <div className="w-full md:ml-60 md:mt-0">
            {/* Comment box */}
            <div className="w-screen fixed bottom-0 z-40">
              <div className="flex bg-white border border-t-2 p-5">
                <input
                  type="text"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="border border-gray-800 rounded w-4/5 p-3 mr-3"
                  placeholder="Add a reply..."
                />
                <button
                  onClick={handleAddTopComment}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className=" text-lg" />
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
                    Replies :
                  </div>

                  {isLoadingComments ? (
                    <div className="flex items-center justify-center w-full">
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
