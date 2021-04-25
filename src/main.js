import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import store from "./store/index";
import * as VeeValidate from "vee-validate";
// import Sortable from "sortablejs";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/style.css";
import Notifications from "vue-notification";

import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);
Vue.use(VeeValidate);
Vue.use(Notifications);
Vue.config.productionTip = false;
// Vue.use(Sortable);
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
