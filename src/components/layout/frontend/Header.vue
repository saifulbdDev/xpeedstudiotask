<template>
  <v-app-bar color="write">
    <v-toolbar-title>
      <router-link to="/">
        <img src="https://xpeedstudio.com/wp-content/uploads/2021/03/xpeedstudio_logo_updated.png" />
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      class="mr-1 text-capitalize"
      text
      v-for="(menu, i) in items"
      :key="'menu'+i"
      :to="menu.to"
    >{{menu.text}}</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { text: "Table List", icon: "mdi-clock", to: "/" },
      { text: "Get From", icon: "mdi-account", to: "/create" },
    ],
  }),
};
</script>