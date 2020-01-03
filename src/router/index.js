import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/search-by-date",
    name: "search-by-date",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "search-by-date" */ "../views/SearchByDate.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  store.dispatch("CANCEL_PENDING_REQUESTS");
  store.dispatch("RESET_SEARCH_FIELDS");
  next();
});

export default router;
