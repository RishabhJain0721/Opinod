import React from "react";

const BadgeCard = () => {
  return (
    <div className="flex items-center mb-5">
      <div className="bg-white p-4 pb-2 rounded-lg border-blue-200 border shadow-md flex items-center space-x-7">
        <div className="flex flex-col items-center">
          <div>
            {/* Replace with actual badge image */}
            <img
              src="https://via.placeholder.com/50"
              alt="Badge"
              className="w-12 h-12"
            />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-center mt-5">
              Level 1
            </div>
            <div className="text-xs text-gray-500 text-center">
              Bronze Badge
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="font-medium text-gray-700">
            Overall comments score
          </div>
          <div className="flex items-center text-right">
            <span className="font-bold text-xl text-gray-950">25 Points</span>
          </div>
          <div className="relative mt-2">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: "25%" }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-800 font-medium">
              75 points to go!
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Comment more to upgrade to level 2
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
