<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ auth: "auth" }),
    authState() {
      return JSON.parse(localStorage.getItem("vuex")).loggedIn;
    },
  },
  mounted() {
    window.addEventListener("storage", this.storageChange, false);
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
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>

