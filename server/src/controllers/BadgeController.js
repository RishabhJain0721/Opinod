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
        Message: "Active Contributor",
        stats: { Current: comments.length, Goal: 10 },
      }
    : {
        Message: "Not Active Contributor",
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
        Message: "Subject Expert",
        stats: { Current: comments.length, Goal: 10 },
      }
    : {
        Message: "Not Subject Expert",
        stats: { Current: comments.length, Goal: 10 },
      };
};

//Knowledge Contributor : Awarded for sharing valuable knowledge through posts (100 posts)
const checkKnowledgeContributor = async (username) => {
  const posts = await CommunityPost.find({ author: username });
  return posts.length >= 100
    ? {
        Message: "Knowledge Contributor",
        stats: { Current: posts.length, Goal: 100 },
      }
    : {
        Message: "Not Knowledge Contributor",
        stats: { Current: posts.length, Goal: 100 },
      };
};

// Engagement Badges

// Active Commenter: Awarded for reaching a certaieleber of comments (e.g., 50 comments).
const checkActiveCommenter = async (username) => {
  const comments = await Comment.find({ author: username });
  return comments.length >= 50
    ? { Message: "Commenter", stats: { Current: comments.length, Goal: 50 } }
    : {
        Message: "Not Commenter",
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
        Message: "Lively Debater",
        stats: { Current: comments.length, Goal: 10 },
      }
    : {
        Message: "Not Lively Debater",
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
    ? { Message: "Popular Post", stats: { Current: posts.length, Goal: 1 } }
    : {
        Message: "Not Popular Post",
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
        Message: "Insightful Analyst",
        stats: { Current: comments.length, Goal: 50 },
      }
    : {
        Message: "Not Insightful Analyst",
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
        Message: "Top Contributor",
        stats: { Current: posts.length + comments.length, Goal: 100 },
      }
    : {
        Message: "Not Top Contributor",
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
        Message: "Community Leader",
        stats: { Current: userFreq.length.length, Goal: maxFrequency },
      }
    : {
        Message: "Not Community Leader",
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
            if (maxFrequency > 50) leaderOf.push(communityId);
          }
        }
      }
    );

    await Promise.all(leaderOfPromises);
    return { Message: "Leader of ", leaderOf };
  })();
};

//Mentor/ expert : Awarded for helping new users and guiding discussions(with max expert opinions >100 on news/posts)
const checkMentor = async (username) => {
  const comments = await Comment.find({ author: username }, { _id: 1 });
  return comments.length >= 100
    ? { Message: "Mentor", stats: { Current: comments.length, Goal: 100 } }
    : { Message: "Not Mentor", stats: { Current: comments.length, Goal: 100 } };
};

//Milestone Badges

//Century Posts : Awarded for reaching 100 posts.
const checkCenturyPosts = async (username) => {
  const posts = await CommunityPost.find({ author: username });
  return posts.length >= 100
    ? { Message: "Century Posts", stats: { Current: posts.length, Goal: 100 } }
    : {
        Message: "Not Century Posts",
        stats: { Current: posts.length, Goal: 100 },
      };
};

//• Active Engager : Awarded for reaching 500 comments.
const checkActiveEngager = async (username) => {
  const comments = await Comment.find({ author: username }, { _id: 1 });
  return comments.length >= 500
    ? {
        Message: "Active Engager",
        stats: { Current: comments.length, Goal: 500 },
      }
    : {
        Message: "Not Active Engager",
        stats: { Current: comments.length, Goal: 500 },
      };
};

//• 1 Year Anniversary: Awarded for being a member for one year.
const checkAnniversary = async (username) => {
  const user = await User.findOne({ username }, { createdAt: 1 });
  const diff = new Date() - user.createdAt;
  return diff >= 365 * 24 * 60 * 60 * 1000
    ? {
        Message: "1 Year Anniversary",
        stats: { Current: diff, Goal: 365 * 24 * 60 * 60 * 1000 },
      }
    : {
        Message: "Not 1 Year Anniversary",
        stats: { Current: diff, Goal: 365 * 24 * 60 * 60 * 1000 },
      };
};

//• Top Followers: Awarded for reaching 500 followers.
const checkTopFollowers = async (username) => {
  const user = await User.findOne({ username }, { followers: 1 });
  return user.followers.length >= 500
    ? {
        Message: "Top Followers",
        stats: { Current: user.followers.length, Goal: 500 },
      }
    : {
        Message: "Not Top Followers",
        stats: { Current: user.followers.length, Goal: 500 },
      };
};

const calculateAchievements = async (req, res) => {
  // const username = req.body.username;
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

  res.status(200).json({
    activeContributor,
    subjectExpert,
    knowledgeContributor,
    activeCommenter,
    livelyDebater,
    popularPost,
    insightfulAnalyst,
    topContributor,
    communityLeader,
    topCommunityMember,
    mentor,
    centuryPosts,
    activeEngager,
    anniversary,
    // topFollowers,
  });
};

export { calculateAchievements };
