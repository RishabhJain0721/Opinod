import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import AchievementsCard from "../Components/AchievementsCard";
import TopCommunityMemberCard from "../Components/TopCommunityMemberCard";
import { calculateAchievements } from "../APIs/UserDetailsApis";
import { MutatingDots } from "react-loader-spinner";

const Achievements = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [achievements, setAchievements] = useState({});
  const [isAchievementsList, setIsAchievementsList] = useState(false);

  const fetchAchievements = async () => {
    try {
      setIsAchievementsList(false);
      const res = await calculateAchievements(user.username);
      setAchievements(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAchievementsList(true);
    }
  };

  useEffect(() => {
    fetchAchievements();

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Topbar />
      <div className="flex mt-16">
        <div className="p-4 w-full">
          <div>
            {/* Achievements */}
            <div className="text-lg font-medium mb-5 mt-3 ml-6">
              Achievements
            </div>
            {isAchievementsList ? (
              <div className="flex flex-wrap items-center ml-5 mt-10 gap-x-8">
                {Object.entries(achievements).map(([key, value]) => {
                  return (
                    <AchievementsCard key={key} badge={key} status={value} />
                  );
                })}
                {achievements["Top Community Member"].stats.Current.map(
                  (community, index) => {
                    return (
                      <TopCommunityMemberCard key={index} name={community} />
                    );
                  }
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-4/5">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
