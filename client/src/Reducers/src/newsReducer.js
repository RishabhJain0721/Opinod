const initialState = {
  Trending: [],
  Daily: [],
  General: [],
  Entertainment: [],
  Technology: [],
  Science: [],
  Health: [],
  Business: [],
  Sports: [],
  World: [],
  MostCommented: [],
  MostReacted: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ARTICLES": {
      const { category, articlesArray } = action.payload;

      // Filter out articles that already exist in the state
      const filteredArticles = articlesArray.filter(
        (article) =>
          !state[category].some(
            (existingArticle) => existingArticle._id === article._id
          )
      );

      return {
        ...state,
        [category]: [...state[category], ...filteredArticles],
      };
    }

    case "REFRESH_NEWS": {
      return {
        Trending: [],
        Daily: [],
        General: [],
        Entertainment: [],
        Technology: [],
        Science: [],
        Health: [],
        Business: [],
        Sports: [],
        World: [],
        MostCommented: [],
        MostReacted: [],
      };
    }

    case "UPDATE_NEWS": {
      const article = action.payload.article;
      let category = action.payload.category;

      const { _id } = article;
      let updatedNewsArray = [];

      if (category === null) {
        if (state.Trending.some((news) => news._id === _id)) {
          // Check if _id exists in Trending
          updatedNewsArray = state.Trending.map((news) =>
            news._id === _id ? { ...article } : news
          );
          return {
            ...state,
            Trending: updatedNewsArray,
          };
        } else if (state.Daily.some((news) => news._id === _id)) {
          // Check if _id exists in Daily
          updatedNewsArray = state.Daily.map((news) =>
            news._id === _id ? { ...article } : news
          );
          return {
            ...state,
            Daily: updatedNewsArray,
          };
        }
      }

      if (category === "Most Commented") {
        category = "MostCommented";
      }
      if (category === "Most Reacted") {
        category = "MostReacted";
      }

      updatedNewsArray = state[category].map((news) =>
        news._id === _id ? { ...article } : news
      );

      return {
        ...state,
        [category]: updatedNewsArray,
      };
    }

    default:
      return state;
  }
};

export default newsReducer;
