<template>
  <div id="app">
    <TheHeader />
    <div id="page-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";

export default {
  components: {
    TheHeader
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#page-container {
  max-width: 600px;
  margin: auto;
}
</style>
