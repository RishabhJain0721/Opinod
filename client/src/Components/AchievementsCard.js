import React, { useState } from "react";

const AchievementsCard = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const badge = props.badge;
  const status = props.status;
  if (badge === "Top Community Member") {
    return <></>;
  }
  if (status.stats.Current === undefined || status.stats.Goal === undefined)
    return <div></div>;

  const info = {
    "Active Contributor":
      "Awarded for posting regularly (10 comments per week for one week).",
    "Subject Expert":
      "Awarded for demonstrating expertise in a particular topic (10 comments with 100 likes).",
    "Knowledge Contributor":
      "Awarded for sharing valuable knowledge through posts (100 posts).",
    "Active Commenter": "Awarded for reaching 50 number of comments.",
    "Lively Debater": "Awarded for engaging in discussions on 10 threads.",
    "Popular Post": "Awarded for a post that receives 100 likes.",
    "Insightful Analyst":
      "Awarded for providing in-depth analysis in 50 posts (started by other) or news articles.",
    "Top Contributor":
      "Awarded for being one of the top contributors (engagement using comments/posting contents) over a month.",
    "Community Leader":
      "Awarded for highest number of posts in overall community discussions.",
    "Top Community Member":
      "Awarded for maximum posts(>50) in a specific community.",
    Mentor:
      "Awarded for helping new users and guiding discussions (with max expert opinions >100 on news/posts).",
    "Century Posts": "Awarded for reaching 100 posts.",
    "Active Engager": "Awarded for reaching 500 comments.",
    Anniversary: "Awarded for being a member for one year.",
  };

  const src =
    status.Message === true
      ? "https://static.vecteezy.com/system/resources/previews/026/587/119/non_2x/gold-laurel-or-wheat-wreath-icon-symbol-of-victory-achievement-and-grain-natural-food-golden-design-element-for-medals-awards-logo-silhouette-isolated-on-black-background-illustration-free-vector.jpg"
      : "https://img.freepik.com/free-vector/illustration-lock-icon_53876-5832.jpg?t=st=1720787305~exp=1720790905~hmac=2d7dd2f12ded0bdb63fb045d86f2d4007f4a4a1cee084efc25ab195efe9df8e2&w=740";

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex items-center mt-2 h-36" onClick={handleCardClick}>
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
                    {status.Message === true ? "Achieved!" : "Locked"}
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <div className="font-medium text-gray-500 text-start">
                  {badge}
                </div>
                <div className="flex items-center text-right">
                  <span className="font-bold text-xl text-gray-950">
                    Status :{" "}
                    {status.Message === true
                      ? status.stats.Goal
                      : status.stats.Current}
                    /{status.stats.Goal}
                  </span>
                </div>
                <div className="relative mt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{
                        width:
                          status.Message === false
                            ? (status.stats.Current / status.stats.Goal) * 100 +
                              "%"
                            : "100%",
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-800 text-start font-medium">
                    {status.Message === false
                      ? status.stats.Goal - status.stats.Current
                      : 0}{" "}
                    more to go!
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 text-start">
                  Tap to view achievement info
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
                {Object.entries(info).map(([key, value]) => {
                  return key === badge && value;
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsCard;
