<template>
  <v-data-table
    :headers="posts.headers"
    :items="posts.rows"
    v-sortable-data-table
    @sorted="saveOrder"
    item-key="name"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Table List</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:headers="props">
      <tr>
        <th v-for="header in props.headers" :key="header.text">{{header.text}} dd</th>
      </tr>
    </template>
    <template v-slot:header="{ props: { headers } }">
      <thead class="m-5">
        <tr>
          <th v-for="(header, i) in headers" :key="i" class="mt-1">
            <div class="pt-3 mb-2">
              <v-text-field
                v-if="header.searchable"
                outlined
                v-model="header.search"
                v-on:keyup="Search(header)"
                height="40"
                :placeholder="header.text"
                hide-details="auto"
                class
              ></v-text-field>
            </div>
          </th>
        </tr>
      </thead>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn depressed small color="primary" @click="editItem(item)">Update</v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="posts">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Sortable from "sortablejs";
export default {
  directives: {
    sortableDataTable: {
      bind(el, _binding, vnode) {
        const options = {
          animation: 150,
          onUpdate: function (event) {
            vnode.child.$emit("sorted", event);
          },
        };
        Sortable.create(el.getElementsByTagName("tbody")[0], options);
      },
    },
  },
  data: () => ({
    search: "",
  }),

  computed: {
    ...mapState("list", ["posts"]),
  },

  created() {
    this.PostData();
  },

  methods: {
    ...mapActions("list", ["PostData"]),
    Search(header) {
      header.filter = (f) => {
        return (f + "").toLowerCase().includes(header.search.toLowerCase());
      };
    },
    editItem(item) {
      this.$router.push({ name: "Update", params: { id: item.id } });
    },
    saveOrder(event) {
      const movedItem = this.posts.rows.splice(event.oldIndex, 1)[0];
      this.posts.rows.splice(event.newIndex, 0, movedItem);

      this.$store.dispatch("list/reorder_formData", movedItem).then((res) => {
        if (res.data.status == "success") {
          this.$notify({
            group: "foo",
            type: "success",
            title: movedItem.name + " Is reorder",
            text: res.data.messages[0],
            duration: 1000,
            speed: 1000,
          });
        } else if (res.data.status == "error") {
          this.$notify({
            group: "foo",
            type: "error",
            title: movedItem.name + " Is reorder",
            text: res.data.messages[0],
            duration: 1000,
            speed: 1000,
          });
        } else {
          this.$notify({
            group: "foo",
            title: movedItem.name + " Is reorder",
            text: res.data.messages,
            duration: 1000,
            speed: 1000,
          });
        }
      });
    },
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
  },
};
</script>
<style scoped>
.sortable-chosen {
  background: #000 !important;
}
</style>