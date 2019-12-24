<template>
  <div class="news-search">
    <input
      v-if="searchByDate"
      type="date"
      :value="currentDate"
      @input="onChange"
    />
    <input type="text" :value="query" @input="onChange" />
  </div>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  name: "NewsSearch",
  data: () => ({
    query: "",
    currentDate: ""
  }),
  computed: {
    searchByDate() {
      return this.$route.path === "/search-by-date";
    }
  },
  methods: {
    onChange: debounce(function(e) {
      this.currentDate =
        e.target.type === "date" ? e.target.value : this.currentDate;
      this.query = e.target.type === "text" ? e.target.value : this.query;

      this.$store.dispatch("FETCH_NEWS_LIST", {
        query: this.query,
        page: 1,
        date: this.currentDate
      });
    }, 250)
  }
};
</script>

<style style lang="scss" scoped>
input {
  margin: 5px 0;
}
</style>
