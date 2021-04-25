<template>
  <v-app id="app">
    <router-view></router-view>
    <notifications position="bottom right" :speed="500" group="foo" />
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
</style>