<template>
  <div class="news-list">
    <h3 v-if="news.length === 0">No news!</h3>
    <ul v-else>
      <li v-for="item in news" :key="item.objectID">
        <span v-if="item.url">
          <a :href="item.url" target="_blank" rel="noopener">
            {{ item.title }}
          </a>
        </span>
        <span v-else>
          <a :href="item.story_url" target="_blank" rel="noopener">
            {{ item.story_title }}
          </a>
        </span>
        <br />
        <span v-if="item.points">{{ item.points }} points </span>
        <span v-if="item.author">by {{ item.author }} </span>
        <span v-if="item.created_at">
          created at {{ item.created_at | formatDate }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getFormatedDate } from "@/util/helpers";

export default {
  name: "NewsList",
  props: {
    news: Array
  },
  filters: {
    formatDate: getFormatedDate
  }
};
</script>

<style style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  text-align: left;

  li {
    margin: 20px 10px;
  }
}
a {
  color: #42b983;
}
</style>
