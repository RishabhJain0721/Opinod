import User from "../models/User.js";
import Community from "../models/Community.js";
import Comment from "../models/Comment.js";
import CommunityPost from "../models/CommunityPost.js";
import cron from "node-cron";

//utility
const maxFrequent = (arr) => {
  // Create a frequency map
  const frequencyMap = {};

  // Count the frequency of each element
  arr.forEach((ele) => {
    if (frequencyMap[ele]) {
      frequencyMap[ele]++;
    } else {
      frequencyMap[ele] = 1;
    }
  });

  // Determine the maximum frequency
  let maxFrequency = 0,
    maxElement = null;
  for (const ele in frequencyMap) {
    if (frequencyMap[ele] > maxFrequency) {
      maxFrequency = frequencyMap[ele];
      maxElement = ele;
    }
  }

  // Check if x has the maximum frequency
  return [maxElement, maxFrequency];
};

//Participation badges

//Active Contributor: Awarded for posting regularly (e.g., 10 comments per week).
const checkActiveContributor = async (username) => {
  const comments = await Comment.find({
    author: username,
    createdAt: {
      $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    },
  });
  return comments.length >= 10
    ? {
        Message: true,
        stats: { Current: comments.length, Goal: 10 },
      }
    : {
        Message: false,
        stats: { Current: comments.length, Goal: 10 },
      };
};

//Subject Expert: Awarded for demonstrating expertise in a particular topic(10 comments with 100 likes)
const checkSubjectExpert = async (username) => {
  const comments = await Comment.find({
    author: username,
    upvotes: { $gt: 100 },
  });
  return comments.length >= 10
    ? {
        Message: true,
        stats: { Current: comments.length, Goal: 10 },
      }
    : {
        Message: false,
        stats: { Current: comments.length, Goal: 10 },
      };
};

//Knowledge Contributor : Awarded for sharing valuable knowledge through posts (100 posts)
const checkKnowledgeContributor = async (username) => {
  const posts = await CommunityPost.find({ author: username });
  return posts.length >= 100
    ? {
        Message: true,
        stats: { Current: posts.length, Goal: 100 },
      }
    : {
        Message: false,
        stats: { Current: posts.length, Goal: 100 },
      };
};

// Engagement Badges

// Active Commenter: Awarded for reaching a certaieleber of comments (e.g., 50 comments).
const checkActiveCommenter = async (username) => {
  const comments = await Comment.find({ author: username });
  return comments.length >= 50
    ? { Message: true, stats: { Current: comments.length, Goal: 50 } }
    : {
        Message: false,
        stats: { Current: comments.length, Goal: 50 },
      };
};

// Lively Debater: Awarded for engaging in discussions on 10 threads.
const checkLivelyDebater = async (username) => {
  const comments = await Comment.find({
    author: username,
    $expr: { $ne: ["$postId", "$parentId"] },
  });
  return comments.length >= 10
    ? {
        Message: true,
        stats: { Current: comments.length, Goal: 10 },
      }
    : {
        Message: false,
        stats: { Current: comments.length, Goal: 10 },
      };
};

//Popular Post: Awarded for a post that receives a 100 likes.
const checkPopularPost = async (username) => {
  const posts = await CommunityPost.find({
    author: username,
    upvotes: { $gt: 100 },
  });
  return posts.length >= 1
    ? { Message: true, stats: { Current: posts.length, Goal: 1 } }
    : {
        Message: false,
        stats: { Current: posts.length, Goal: 1 },
      };
};

//Contribution Badges

//Insightful Analyst: Awarded for providing in-depth analysis in 50 posts/(started by other)/ news article
const checkInsightfulAnalyst = async (username) => {
  const comments = await Comment.find({
    author: username,
    $expr: { $gte: [{ $strLenCP: "$text" }, 50] },
  });
  return comments.length >= 50
    ? {
        Message: true,
        stats: { Current: comments.length, Goal: 50 },
      }
    : {
        Message: false,
        stats: { Current: comments.length, Goal: 50 },
      };
};

//Top Contributor: Awarded for being one of the top contributors (engagement with contents/ posting contents) over a period (e.g., monthly).
const checkTopContributor = async (username) => {
  const posts = await CommunityPost.find({
    author: username,
    publishedAt: {
      $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    },
  });
  const comments = await Comment.find({
    author: username,
    createdAt: {
      $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
    },
  });
  return posts.length + comments.length >= 100
    ? {
        Message: true,
        stats: { Current: posts.length + comments.length, Goal: 100 },
      }
    : {
        Message: false,
        stats: { Current: posts.length + comments.length, Goal: 100 },
      };
};

//Community Leader: Awarded for active participation (highest posts in overall community discussions)
const checkCommunityLeader = async (username) => {
  const authors = await CommunityPost.find({}, { author: 1, _id: 0 });
  const userFreq = await CommunityPost.find({ author: username }, { _id: 1 });
  const [maxAuthor, maxFrequency] = maxFrequent(authors);
  return maxAuthor.slice(11, -3) === username
    ? {
        Message: true,
        stats: { Current: userFreq.length.length, Goal: maxFrequency },
      }
    : {
        Message: false,
        stats: { Current: userFreq, Goal: maxFrequency },
      };
};

//Top Community Member: Awarded for max posts and comments(>50) in a specific community.
const checkTopCommunityMember = async (username) => {
  const communityIds = await User.findOne(
    { username },
    { joinedCommunities: 1, _id: 0 }
  ).lean();

  let leaderOf = [];

  return (async function () {
    const leaderOfPromises = communityIds.joinedCommunities.map(
      async (communityId) => {
        if (communityId) {
          const authors = await CommunityPost.find(
            { community: communityId },
            { author: 1, _id: 0 }
          );
          const [maxAuthor, maxFrequency] = maxFrequent(authors);

          if (maxAuthor && maxAuthor.slice(11, -3) === username) {
            if (maxFrequency > 0) {
              const name = await Community.findById(communityId, {
                name: 1,
                _id: 0,
              }).lean();
              leaderOf.push(name.name);
            }
          }
        }
      }
    );

    await Promise.all(leaderOfPromises);
    return leaderOf.length > 0
      ? { Message: true, stats: { Current: leaderOf, Goal: 1 } }
      : { Message: false, stats: { Current: leaderOf, Goal: 1 } };
  })();
};

//Mentor/ expert : Awarded for helping new users and guiding discussions(with max expert opinions >100 on news/posts)
const checkMentor = async (username) => {
  const comments = await Comment.find({ author: username }, { _id: 1 });
  return comments.length >= 100
    ? { Message: true, stats: { Current: comments.length, Goal: 100 } }
    : { Message: false, stats: { Current: comments.length, Goal: 100 } };
};

//Milestone Badges

//Century Posts : Awarded for reaching 100 posts.
const checkCenturyPosts = async (username) => {
  const posts = await CommunityPost.find({ author: username });
  return posts.length >= 100
    ? { Message: true, stats: { Current: posts.length, Goal: 100 } }
    : {
        Message: false,
        stats: { Current: posts.length, Goal: 100 },
      };
};

//• Active Engager : Awarded for reaching 500 comments.
const checkActiveEngager = async (username) => {
  const comments = await Comment.find({ author: username }, { _id: 1 });
  return comments.length >= 500
    ? {
        Message: true,
        stats: { Current: comments.length, Goal: 500 },
      }
    : {
        Message: false,
        stats: { Current: comments.length, Goal: 500 },
      };
};

//• 1 Year Anniversary: Awarded for being a member for one year.
const checkAnniversary = async (username) => {
  const user = await User.findOne({ username }, { createdAt: 1 });
  const diff = new Date() - user.createdAt;
  return diff >= 365 * 24 * 60 * 60 * 1000
    ? {
        Message: true,
        stats: { Current: parseInt(diff / (24 * 60 * 60 * 1000)), Goal: 365 },
      }
    : {
        Message: false,
        stats: { Current: parseInt(diff / (24 * 60 * 60 * 1000)), Goal: 365 },
      };
};

//• Top Followers: Awarded for reaching 500 followers.
const checkTopFollowers = async (username) => {
  const user = await User.findOne({ username }, { followers: 1 });
  return user.followers.length >= 500
    ? {
        Message: true,
        stats: { Current: user.followers.length, Goal: 500 },
      }
    : {
        Message: false,
        stats: { Current: user.followers.length, Goal: 500 },
      };
};

export const updateBadges = async () => {
  console.log("Fetching news for all categories");
  const users = await User.find({}, { username: 1, badges: 1 });

  for (const user of users) {
    const username = user.username;

    // Active Contributor
    const activeContributor = await checkActiveContributor(username);
    if (activeContributor.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Active Contributor"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Subject Expert
    const subjectExpert = await checkSubjectExpert(username);
    if (subjectExpert.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Subject Expert"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Knowledge Contributor
    const knowledgeContributor = await checkKnowledgeContributor(username);
    if (knowledgeContributor.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Knowledge Contributor"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Active Commenter
    const activeCommenter = await checkActiveCommenter(username);
    if (activeCommenter.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Active Commenter"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Lively Debater
    const livelyDebater = await checkLivelyDebater(username);
    if (livelyDebater.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Lively Debater"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Popular Post
    const popularPost = await checkPopularPost(username);
    if (popularPost.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Popular Post"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Insightful Analyst
    const insightfulAnalyst = await checkInsightfulAnalyst(username);
    if (insightfulAnalyst.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Insightful Analyst"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Top Contributor
    const topContributor = await checkTopContributor(username);
    if (topContributor.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Top Contributor"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Community Leader
    const communityLeader = await checkCommunityLeader(username);
    if (communityLeader.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Community Leader"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Top Community Member
    const topCommunityMember = await checkTopCommunityMember(username);
    if (topCommunityMember.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Top Community Member"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Mentor
    const mentor = await checkMentor(username);
    if (mentor.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Mentor"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Century Posts
    const centuryPosts = await checkCenturyPosts(username);
    if (centuryPosts.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Century Posts"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Active Engager
    const activeEngager = await checkActiveEngager(username);
    if (activeEngager.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Active Engager"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Anniversary
    const anniversary = await checkAnniversary(username);
    if (anniversary.Message === true) {
      const badgeIndex = user.badges.findIndex(
        (badge) => badge.name === "Anniversary"
      );
      if (badgeIndex !== -1) {
        user.badges[badgeIndex].unlocked = true;
      }
    }

    // Finally, save the user document after all updates
    user.markModified("badges");
    await user.save();
  }
};

// updateBadges();

// Schedule the first task to run at 6:00 AM
cron.schedule(
  "0 6 * * *",
  async () => {
    await updateBadges();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);
