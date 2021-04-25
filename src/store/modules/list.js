import axios from "axios";
let state = {
  posts: [],
  headers: [],
  fields: [],
};
let mutations = {
  POST_DATA(state, posts) {
    state.posts = posts;
  },
  GET_FORM_DATA(state, fields) {
    state.fields = fields;
  },
  // eslint-disable-next-line no-unused-vars
  POST_CREATED(state) {},
  // eslint-disable-next-line no-unused-vars
  SUBMIT_FORM_DATA(state) {},
};
let actions = {
  PostData({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost/api/list.php")
        .then((result) => {
          let list = result.data.data;
          let headers = [];

          Object.entries(list.headers[0]).forEach(([key, value]) => {
            value["text"] = value.title;
            value["value"] = key;
            value["filter"] = "";
            value["search"] = "";

            if (value.hidden === false) {
              headers.push(value);
            }
          });
          let dd = { text: "Actions", value: "actions", sortable: false };
          headers.push(dd);
          list.headers = headers;
          commit("POST_DATA", list);
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getformData({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost/api/get_form.php")
        .then((result) => {
          let fields = [];
          Object.entries(result.data.data.fields[0]).forEach(([key, value]) => {
            value["name"] = key;
            if (value.default) {
              value.value = value.default;
            }
            if (value.repeater_fields) {
              value["list"] = [];

              Object.entries(value.repeater_fields).forEach(
                ([key2, value2]) => {
                  value2["name"] = key2;
                  value.list.push(value2);
                }
              );
            }
            fields.push(value);
          });
          commit("GET_FORM_DATA", fields);
          resolve(result.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getformDatabyId({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost/api/get_form.php?id=${id}`)
        .then((result) => {
          let fields = [];
          Object.entries(result.data.data.fields[0]).forEach(([key, value]) => {
            value["name"] = key;
            if (value.repeater_fields) {
              value["list"] = [];

              Object.entries(value.repeater_fields).forEach(
                ([key2, value2]) => {
                  value2["name"] = key2;
                  value.list.push(value2);
                }
              );
            }
            fields.push(value);
          });
          commit("GET_FORM_DATA", fields);
          resolve(result.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  submit_formData({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/submit_form.php", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
        .then((result) => {
          resolve(result);
          commit("SUBMIT_FORM_DATA", result.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  reorder_formData({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost/api/reorder.php", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
        .then((result) => {
          resolve(result);
          commit("SUBMIT_FORM_DATA", result.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
let getters = {
  posts(state) {
    return state.posts;
  },
  fields(state) {
    return state.fields;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
