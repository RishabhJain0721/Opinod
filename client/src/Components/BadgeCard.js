import React, { useState } from "react";
import Bronze from "../Assets/bronze.png";
import Silver from "../Assets/silver.png";
import Gold from "../Assets/gold.png";
import Platinum from "../Assets/platinum.png";
import Emrald from "../Assets/emrald.png";
import Ruby from "../Assets/ruby.png";
import Diamond from "../Assets/diamond.png";

const BadgeCard = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const info = props.info;
  let src;

  switch (info.badge) {
    case "Bronze":
      src = Bronze;
      break;
    case "Silver":
      src = Silver;
      break;
    case "Gold":
      src = Gold;
      break;
    case "Platinum":
      src = Platinum;
      break;
    case "Emerald":
      src = Emrald;
      break;
    case "Ruby":
      src = Ruby;
      break;
    case "Diamond":
      src = Diamond;
      break;
    default:
      src = Bronze;
  }

  return (
    <div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front flex items-center">
          <div className="bg-white px-4 pb-2 rounded-lg border-blue-200 border shadow-md flex items-center space-x-4 w-full">
            <div className="flex flex-col items-center">
              <div>
                <img src={src} alt="Badge" className="w-24 h-24" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-center mt-2">
                  Level {info.level}
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {info.badge} Badge
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-3 w-3/5">
              <div className="font-normal text-sm text-start text-gray-700">
                Your current score is
              </div>
              <div className="flex items-center text-right">
                <span className="font-bold text-xl text-gray-950">
                  {info.current} Points
                </span>
              </div>
              <div className="relative mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: (info.current * 100) / info.goal + "%" }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-start text-gray-800 font-medium">
                  {info.goal - info.current} points to upgrade level!
                </div>
              </div>
              <div className="text-xs text-start text-gray-500 mt-1">
                Tap to know how points work
              </div>
            </div>
          </div>
        </div>
        <div className="flip-card-back flex items-center">
          <div className="bg-white px-4 pb-2 rounded-lg border-blue-200 border shadow-md flex items-center space-x-4 w-full">
            <div className="flex flex-col mx-auto">
              <div className="font-bold text-gray-900 text-center mt-2">
                How to Earn Points?
              </div>
              <div className="text-sm text-gray-700 text-center mt-1 mb-1">
                <span className=" text-lg">Interactions earn you points.</span>
                <br />
                <span>Like/Dislike - 5 points</span>
                <br />
                <span>Comment - 20 points</span>
                <br />
                <span>Post in Community - 50 points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;
