<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo center"
          >PROJECT X <i class="large material-icons">group_work</i></a
        >
        <ul class="left hide-on-med-and-down">
          <li><a href="#">Мой профиль</a></li>
          <li><a @click="signOut">Выйти</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    signOut() {
      try {
        this.$store.dispatch("signOut");
        this.$router.push("/auth");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>