import User from "../models/User.js";
import Community from "../models/Community.js";
import Comment from "../models/Comment.js";
import CommunityPost from "../models/CommunityPost.js";

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
        stats: { Current: userFreq.length, Goal: maxFrequency },
      }
    : {
        Message: false,
        stats: { Current: userFreq.length, Goal: maxFrequency },
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

const calculateAchievements = async (req, res) => {
  const { username } = req.body;
  const activeContributor = await checkActiveContributor(username);
  const subjectExpert = await checkSubjectExpert(username);
  const knowledgeContributor = await checkKnowledgeContributor(username);
  const activeCommenter = await checkActiveCommenter(username);
  const livelyDebater = await checkLivelyDebater(username);
  const popularPost = await checkPopularPost(username);
  const insightfulAnalyst = await checkInsightfulAnalyst(username);
  const topContributor = await checkTopContributor(username);
  const communityLeader = await checkCommunityLeader(username);
  const topCommunityMember = await checkTopCommunityMember(username);
  const mentor = await checkMentor(username);
  const centuryPosts = await checkCenturyPosts(username);
  const activeEngager = await checkActiveEngager(username);
  const anniversary = await checkAnniversary(username);
  // const topFollowers = await checkTopFollowers(username);

  const final = {
    "Active Contributor": activeContributor,
    "Subject Expert": subjectExpert,
    "Knowledge Contributor": knowledgeContributor,
    "Active Commenter": activeCommenter,
    "Lively Debater": livelyDebater,
    "Popular Post": popularPost,
    "Insightful Analyst": insightfulAnalyst,
    "Top Contributor": topContributor,
    "Community Leader": communityLeader,
    "Top Community Member": topCommunityMember,
    Mentor: mentor,
    "Century Posts": centuryPosts,
    "Active Engager": activeEngager,
    Anniversary: anniversary,
    // "Top Followers": topFollowers,
  };
  console.log(final);

  res.status(200).json(final);
};

const calculateLevel = async (req, res) => {
  const { username } = req.body;
  try {
    const userPoints = await User.find({ username }, { points: 1, _id: 0 });
    const points = userPoints[0].points;
    let data = {};
    if (points < 500) {
      //bronze
      data.level = 1;
      data.badge = "Bronze";
      data.current = points;
      data.goal = 500;
    } else if (points < 1000) {
      //silver
      data.level = 2;
      data.badge = "Silver";
      data.current = points - 500;
      data.goal = 500;
    } else if (points < 1500) {
      //gold
      data.level = 3;
      data.badge = "Gold";
      data.current = points - 1000;
      data.goal = 500;
    } else if (points < 2000) {
      //platinum
      data.level = 4;
      data.badge = "Platinum";
      data.current = points - 1500;
      data.goal = 500;
    } else if (points < 2500) {
      //emrald
      data.level = 5;
      data.badge = "Emrald";
      data.current = points - 2000;
      data.goal = 500;
    } else if (points < 3000) {
      //ruby
      data.level = 6;
      data.badge = "Ruby";
      data.current = points - 2500;
      data.goal = 500;
    } else if (points < 3500) {
      //diamond
      data.level = 7;
      data.badge = "Diamond";
      data.current = points - 3000;
      data.goal = 500;
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

const sendPeopleWithBadges = async (req, res) => {
  try {
    let data = [];
    const users = await User.find({}, { username: 1, email: 1, badges: 1 });
    // console.log(users);
    for (let user of users) {
      for (let badge of user.badges) {
        if (badge.unlocked === true && badge.rewarded === false) {
          data.push({ name: user.username, email: user.email, badge: badge });
        }
      }
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { calculateAchievements, calculateLevel, sendPeopleWithBadges };
