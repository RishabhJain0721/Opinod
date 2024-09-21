import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      {/* <Topbar /> */}
      {/* Navigation */}
      <header className="flex justify-between items-center p-4 md:p-6 bg-white shadow-md z-50 mb-9">
        <div className="text-xl md:text-2xl font-bold">Opinod</div>
        <nav className="space-x-4 md:space-x-8 flex">
          {username ? (
            <div className="flex items-center">
              <div className="flex items-center space-x-4 text-gray-800">
                <button className="text-base sm:px-2 px-1">
                  Welcome{" "}
                  <span
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className=" font-semibold"
                  >
                    {username.length > 10
                      ? username.split(0, 10) + "..."
                      : username}
                  </span>
                  !
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className=" flex gap-3 justify-center items-center">
                <div
                  className="text-gray-700 hover:text-black cursor-pointer inline-block text-sm md:text-base"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </div>
                <div
                  className="text-gray-700 hover:text-black cursor-pointer inline-block text-sm md:text-base"
                  onClick={() => navigate("/login")}
                >
                  Login
                </div>
              </div>
              <button
                className="bg-black text-white px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base"
                onClick={() => navigate("/")}
              >
                Get Started
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-start items-center text-center px-4">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-one-line-art-animal-illustration_23-2149261852.jpg?w=740&t=st=1725394048~exp=1725394648~hmac=4c18ee1b904eb57a0a26139409bc0f41458dc3e2d2c68f1b40bc9824e52479ae"
          alt="bird"
          className=" h-24 mb-10 md:h-32"
        />
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Engage, Learn, Grow
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mb-8">
          A place to share opinions, engage in meaningful discussions, and grow
          together as a community.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold"
          onClick={() => navigate("/")}
        >
          Start Reading
        </button>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-100">
        <p className="text-gray-600 text-sm md:text-base">
          &copy; 2024 Opinod. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
