import axios from "axios";

export const search = async (searchText) => {
  try {
    const response = await axios.post("/api/search/", { searchText });
    return response.data;
  } catch (error) {
    throw error;
  }
};
