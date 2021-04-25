import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2A3B8F', // #E53935
        secondary: '#F15A29',
        //   accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})