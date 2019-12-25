<template>
  <div class="pagination">
    <button
      type="button"
      :disabled="currentPage === 1"
      @click="onPaginate(currentPage - 1)"
    >
      &laquo;
    </button>
    <span v-if="currentPage - 1 > range">...</span>
    <button
      type="button"
      v-for="n in pages"
      :key="n"
      :disabled="n === currentPage"
      @click="onPaginate(n)"
    >
      {{ n }}
    </button>
    <span v-if="lastPage - currentPage > range">...</span>
    <button
      type="button"
      :disabled="currentPage === lastPage"
      @click="onPaginate(currentPage + 1)"
    >
      &raquo;
    </button>
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
