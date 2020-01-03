import Vue from "vue";
import Vuex from "vuex";
import { fetchNews } from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cancelTokens: [],
    news: [],
    lastPage: 0,
    query: "",
    currentDate: "",
    currentPage: 1,
    isError: false,
    isLoading: false
  },
  mutations: {
    ADD_CANCEL_TOKEN(state, token) {
      state.cancelTokens.push(token);
    },
    CLEAR_CANCEL_TOKENS(state) {
      state.cancelTokens = [];
    },
    SET_QUERY(state, query) {
      state.query = query;
    },
    SET_CURRENT_DATE(state, date) {
      state.currentDate = date;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_NEWS(state, news) {
      state.news = news;
    },
    SET_LAST_PAGE(state, lastPage) {
      state.lastPage = lastPage;
    },
    SET_ERROR(state, isError) {
      state.isError = isError;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    CANCEL_PENDING_REQUESTS({ state, commit }) {
      // Cancel all requests where a token exists
      state.cancelTokens.forEach(request => {
        if (request.cancel) {
          request.cancel();
        }
      });

      // Reset the cancelTokens store
      commit("CLEAR_CANCEL_TOKENS");
    },
    async FETCH_NEWS_LIST(
      { state, commit },
      {
        query = state.query,
        page = state.currentPage,
        date = state.currentDate
      }
    ) {
      commit("SET_ERROR", false);
      commit("SET_LOADING", true);
      commit("SET_QUERY", query);
      commit("SET_CURRENT_DATE", date);
      commit("SET_CURRENT_PAGE", page);

      const { news, lastPage, isError, isLoading } = await fetchNews(
        query,
        page,
        date
      );

      commit("SET_NEWS", news);
      commit("SET_LAST_PAGE", lastPage);
      commit("SET_ERROR", isError);
      commit("SET_LOADING", isLoading);
    },
    RESET_SEARCH_FIELDS({ commit }) {
      commit("SET_QUERY", "");
      commit("SET_CURRENT_DATE", "");
      commit("SET_CURRENT_PAGE", 1);
    }
  },
  modules: {}
});
