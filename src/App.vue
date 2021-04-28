<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    window.addEventListener("storage", this.storageChange);
  },

  methods: {
    storageChange(e) {
      if (e.key !== "logged_in") {
        return;
      }
      const auth = JSON.parse(e.newValue);
      if (auth) {
        this.$router.push("/");
      } else {
        this.$router.push("/auth");
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener("storage", this.storageChange);
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>

