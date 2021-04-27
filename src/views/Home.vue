<template>
  <div>
    <Navbar />

    <div class="container">
      <main class="app-content">
        <div class="app-page">
          <h2 class="page-title center-align">Твой будущий дашборд</h2>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "home",
  components: { Navbar },
};
</script>