import Vue from "vue";
import Vuex from "vuex";
import { fetchNews } from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cancelTokens: [],
    news: [],
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
    SET_NEWS(state, news) {
      state.news = news;
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
    async FETCH_NEWS_LIST({ commit }, { query, page, date }) {
      commit("SET_ERROR", false);
      commit("SET_LOADING", true);

      const { news, isError, isLoading } = await fetchNews(query, page, date);

      commit("SET_NEWS", news);
      commit("SET_ERROR", isError);
      commit("SET_LOADING", isLoading);
    }
  },
  modules: {}
});
