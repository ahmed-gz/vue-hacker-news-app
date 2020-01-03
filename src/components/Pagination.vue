<template>
  <div class="pagination">
    <v-btn
      fab
      color="blue darken-1"
      class="mx-1"
      :disabled="currentPage === 1"
      @click="onPaginate(1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      fab
      color="blue darken-1"
      class="mx-1"
      :disabled="currentPage === 1"
      @click="onPaginate(currentPage - 1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <span v-if="currentPage - 1 > range">...</span>
    <v-btn
      fab
      color="blue lighten-1"
      class="mx-1"
      v-for="n in pages"
      :key="n"
      :disabled="n === currentPage"
      @click="onPaginate(n)"
    >
      {{ n }}
    </v-btn>
    <span v-if="lastPage - currentPage > range">...</span>
    <v-btn
      fab
      color="blue darken-1"
      class="mx-1"
      :disabled="currentPage === lastPage"
      @click="onPaginate(currentPage + 1)"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
    <v-btn
      fab
      color="blue darken-1"
      class="mx-1"
      :disabled="currentPage === lastPage"
      @click="onPaginate(lastPage)"
    >
      <v-icon>mdi-chevron-right</v-icon>
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
import debounce from "lodash.debounce";

export default {
  name: "Pagination",
  props: {
    range: Number,
    lastPage: Number
  },
  computed: {
    pages() {
      const prevPages = Array.from(
        { length: this.range },
        (_, idx) => --idx + this.currentPage - this.range + 1
      );
      const nextPages = Array.from(
        { length: this.range },
        (_, idx) => ++idx + this.currentPage
      );

      const allPages = [
        ...new Set([...prevPages, this.currentPage, ...nextPages])
      ].filter(n => 0 < n && n <= this.lastPage);

      return allPages;
    },
    ...mapState(["currentPage"])
  },
  methods: {
    onPaginate: debounce(function(page) {
      // TODO: make this action a callback to parent to make this dumb
      this.$store.dispatch("FETCH_NEWS_LIST", {
        page: page
      });
    }, 250)
  }
};
</script>

<style style lang="scss" scoped>
button {
  font-size: 20px;
}
</style>
