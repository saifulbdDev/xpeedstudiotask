import Vue from "vue";
import Router from "vue-router";
import ProfileLayout from "../components/ProfileLayout.vue";
import Crudindex from "../pages/crud/CrudIndex.vue";
import Update from "../pages/crud/Update.vue";
import Create from "../pages/crud/Create.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: ProfileLayout,
      redirect: "/list",
      children: [
        {
          path: "/list",
          name: "Crud",
          component: Crudindex,
        },
        {
          path: "/update/:id",
          name: "Update",
          component: Update,
        },
        {
          path: "/create",
          name: "Create",
          component: Create,
        },
      ],
    },
  ],
});
