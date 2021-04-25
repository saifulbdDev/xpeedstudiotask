<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-col class="mx-auto text-center" md="6">
        <v-btn
          v-for="(link, ilink ) in items"
          :key="'ilink'+ilink"
          color="white"
          class="my-2 text-capitalize"
          text
        >{{ link.text }}</v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { text: "About Company" },
      { text: "Privacy Policy" },
      { text: "Terms & Conditions" },
      { text: "Blog" },
      { text: "Contact Us" },
    ],
  }),
};
</script>