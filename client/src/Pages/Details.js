import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import NewsDetails from "../Components/NewsDetails";
import Comment from "../Components/Comment";
import { getNewsById, updateNews } from "../APIs/NewsApis";
import { addTopComment, getComments } from "../APIs/CommentApis";
import { useSelector, useDispatch } from "react-redux";
import { MutatingDots } from "react-loader-spinner";
import { updateNewsInStore } from "../Actions/actions";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const [newReply, setNewReply] = useState("");
  const [comments, setComments] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const username = useSelector((state) => state.user.username);
  const category = useSelector((state) => state.category.category);

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
      setIsLoadingComments(true);
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
      alert("Please write something.");
      return;
    }
    try {
      await addTopComment(id, newReply, username);
      await fetchComments();
      setNewReply("");
      const res = await updateNews(details._id);
      console.log(res);
      dispatch(updateNewsInStore(res, category));
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
            <div className="text-2xl ml-3 md:ml-6 mt-7 font-semibold text-blue-500 w-auto">
              {details.category}
            </div>
            <div className="bg-white p-1 sm:p-2 md:p-3 mb-4 w-auto m-2 h-fit">
              <div className="flex flex-col justify-between items-between mb-2">
                <NewsDetails details={details} />

                {/* Replies */}
                <div className="flex items-start flex-col w-full pl-2">
                  {/* Heading */}
                  <div className="text-base sm:text-lg md:text-xl font-medium mb-2 w-full">
                    Replies :
                  </div>
                  <div className="my-4 w-full">
                    <input
                      type="text"
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="border rounded w-full p-2 mb-2"
                      placeholder="Add a reply..."
                    />
                    <button
                      onClick={handleAddTopComment}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Add Reply
                    </button>
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
                    comments.map((comment, index) => (
                      <Comment key={index} comment={comment} />
                    ))
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
