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
      };
    }

    case "UPDATE_NEWS": {
      const { category, _id } = action.payload;

      const updatedNewsArray = state[category].map((news) =>
        news._id === _id ? action.payload : news
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
