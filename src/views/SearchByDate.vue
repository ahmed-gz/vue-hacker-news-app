<template>
  <div class="search-by-date">
    <h1>Search by date</h1>
    <NewsSearch />
    <h2 v-if="isError">Something went wrong, please try again!</h2>
    <h2 v-else-if="isLoading">Loading...</h2>
    <NewsList v-else :news="news" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "search-by-date",
  components: {
    NewsList: () =>
      import(/* webpackPrefetch: true */ "@/components/NewsList.vue"),
    NewsSearch: () =>
      import(/* webpackPrefetch: true */ "@/components/NewsSearch.vue")
  },
  data: () => ({
    currentPage: 1
  }),
  computed: mapState(["news", "isError", "isLoading"]),
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.$store.dispatch("FETCH_NEWS_LIST", {
        page: vm.currentPage
      });
    });
  }
};
</script>
