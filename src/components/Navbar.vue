<template>
  <nav class="navbar pink darken-1">
    <div class="nav-wrapper">
      <a href="#" @click.prevent class="brand-logo center"
        >PROJECT X <i class="large material-icons">group_work</i></a
      >
      <ul>
        <li>
          <a
            class="dropdown-trigger"
            href="#"
            data-target="dropdown1"
            ref="dropdown"
            ><i class="material-icons right">dehaze</i></a
          >
        </li>
      </ul>
      <ul id="dropdown1" class="dropdown-content">
        <li>
          <a href="#!" @click.prevent="signOut"
            >Профиль<i class="material-icons">account_circle</i></a
          >
        </li>
        <li>
          <a href="#!" @click.prevent="signOut"
            >Выйти<i class="material-icons">assignment_return</i></a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    dropdown: null,
  }),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      alignment: "bottom",
      constrainWidth: false,
      coverTrigger: false,
    });
  },
  beforeDestroy() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
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