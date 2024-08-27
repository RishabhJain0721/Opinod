import React, { useState } from "react";

const TopCommunityMemberCard = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const community = props.name;

  const src =
    "https://static.vecteezy.com/system/resources/previews/026/587/119/non_2x/gold-laurel-or-wheat-wreath-icon-symbol-of-victory-achievement-and-grain-natural-food-golden-design-element-for-medals-awards-logo-silhouette-isolated-on-black-background-illustration-free-vector.jpg";

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center h-36" onClick={handleCardClick}>
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="bg-white p-3 rounded-lg border-blue-200 border shadow-md flex items-center space-x-7">
              <div className="flex flex-col items-center">
                <div>
                  {/* Replace with actual badge image */}
                  <img src={src} alt="Badge" className="w-16 h-16 rounded-lg" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm text-center mt-3">
                    Achieved!
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium text-gray-500 text-start">
                  Top {community} Member
                </div>
                <div className="flex items-center text-right">
                  <span className="font-bold text-xl text-gray-950">50/50</span>
                </div>
                <div className="relative mt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{
                        width: "100%",
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-800 text-start font-medium">
                    0 more to go!
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-start">
                  Tap to view info
                </div>
              </div>
            </div>
          </div>
          <div className="flip-card-back">
            {/* Back of the card with achievement information */}
            <div className="bg-white p-4 rounded-lg border-blue-200 border shadow-md">
              <h3 className="font-bold text-gray-900 text-lg">
                Achievement Info
              </h3>
              <p className="text-gray-700">
                Awarded for maximum posts(also more than 50) in {community}{" "}
                community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCommunityMemberCard;
