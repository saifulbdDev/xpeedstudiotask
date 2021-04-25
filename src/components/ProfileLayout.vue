  
<template>
  <main class="main-app h-100">
    <Header />

    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Header from "./layout/frontend/Header.vue";

export default {
  name: "Frontend",
  components: {
    Header,
  },
};
</script>

<style scoped>
.main-app {
  background-color: #f2f3f8;
}
</style>
