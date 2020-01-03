import axios from "axios";
import store from "../store";

const NEWS_URL = "https://hn.algolia.com/api/v1/";

// Cancel Token Request Interceptor
axios.interceptors.request.use(
  function(config) {
    //  Generate cancel token source
    let source = axios.CancelToken.source();

    // Set cancel token on this request
    config.cancelToken = source.token;

    // Add to vuex to make cancellation available from anywhere
    store.commit("ADD_CANCEL_TOKEN", source);

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const fetchNews = async (query = "", page = 1, date) => {
  let news = [];
  let lastPage = 0;
  let isError = false;
  let isLoading = true;

  let url = date
    ? `${NEWS_URL}search_by_date?query=${query}&page=${page}&numericFilters=created_at_i>${date}`
    : `${NEWS_URL}search?query=${query}&page=${page}`;

  try {
    const response = await axios.get(url);
    news = response.data.hits;
    lastPage = response.data.nbPages - 1;
  } catch (error) {
    if (axios.isCancel(error)) {
      // set flag to handle request canceling seperately
      console.log("api canceled");
    } else {
      console.log("api errored", error);
      isError = true;
    }
  } finally {
    isLoading = false;
  }

  return { news, lastPage, isError, isLoading };
};
