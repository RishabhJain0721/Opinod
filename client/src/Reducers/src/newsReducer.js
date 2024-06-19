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
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ARTICLES": {
      const { category, articlesArray } = action.payload;
      console.log("articlesArray", articlesArray);
      console.log("category", category);

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
    default:
      return state;
  }
};

export default newsReducer;
