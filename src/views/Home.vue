<template>
  <div class="home">
    <v-container>
      <h1>Search</h1>
      <NewsSearch />
      <v-alert v-if="isError" class="my-5 mx-auto" width="500px" type="error">
        Something went wrong, please try again!
      </v-alert>
      <v-progress-circular
        v-else-if="isLoading"
        :size="50"
        class="my-5"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <NewsList v-else :news="news" :lastPage="lastPage" />
    </v-container>
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
