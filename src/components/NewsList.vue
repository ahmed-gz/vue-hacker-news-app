<template>
  <div class="news-list">
    <h3 v-if="news.length === 0">No news!</h3>
    <div v-else>
      <v-container class="my-2">
        <Pagination :range="3" :lastPage="lastPage" />
      </v-container>
      <v-card class="mx-auto" max-width="400" tile>
        <template v-for="(item, index) in news">
          <v-list-item
            link
            two-line
            :href="item.url"
            target="_blank"
            :key="item.objectID"
          >
            <v-list-item-content>
              <v-list-item-title>
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
              </v-list-item-title>
              <v-list-item-subtitle>
                <span v-if="item.points">{{ item.points }} points </span>
                <span v-if="item.author">by {{ item.author }} </span>
                <span v-if="item.created_at">
                  created at {{ item.created_at | formatDate }}
                </span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="index + 1 < news.length" :key="index"></v-divider>
        </template>
      </v-card>
      <v-container class="my-2">
        <Pagination :range="3" :lastPage="lastPage" />
      </v-container>
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination";
import { getFormatedDate } from "@/util/helpers";

export default {
  name: "NewsList",
  components: {
    Pagination
  },
  props: {
    news: Array,
    lastPage: Number
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
