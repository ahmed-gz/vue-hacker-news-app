<template>
  <div class="home">
    <h1>Search</h1>
    <NewsSearch />
    <h2 v-if="isError">Something went wrong, please try again!</h2>
    <h2 v-else-if="isLoading">Loading...</h2>
    <NewsList v-else :news="news" :lastPage="lastPage" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    NewsList: () =>
      import(/* webpackPrefetch: true */ "@/components/NewsList.vue"),
    NewsSearch: () =>
      import(/* webpackPrefetch: true */ "@/components/NewsSearch.vue")
  },
  computed: mapState(["news", "lastPage", "isError", "isLoading"]),
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.$store.dispatch("FETCH_NEWS_LIST", {});
    });
  }
};
</script>
