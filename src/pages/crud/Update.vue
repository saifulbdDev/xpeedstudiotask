<template>
  <v-card class="p-3 mt-5 mx-auto">
    <validation-observer ref="observer">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <template v-for="(field, i) in fields">
            <v-col
              :class="field.type"
              md="6"
              cols="12"
              :key="'select_'+i"
              v-if="field.type === 'select'"
            >
              <label :for="id(field)" class="form-label">
                {{field.title}}
                <span v-if="field.required">*</span>
              </label>
              <validation-provider v-slot="{ errors }" :name="field.title" :rules="custom(field)">
                <select
                  class="form-select"
                  outline
                  :class="clsss(errors, field)"
                  v-model="field.value"
                  :placeholder="field.title"
                  :aria-label="field.name"
                  :name="field.name"
                  :id="id(field)"
                  item-text="label"
                >
                  <option
                    v-for="(option, selectkey) in field.options"
                    :selected="option.key === field.default"
                    :value="option.key"
                    :key="'slect_'+selectkey"
                  >{{ option.label }}</option>
                </select>
                <span v-show="errors.length" class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </v-col>
            <v-col
              :class="field.type"
              md="6"
              cols="12"
              :key="'select_'+i"
              v-else-if="field.type === 'radio'"
            >
              <label :for="id(field)" class="form-label">
                {{field.title}}
                <span v-if="field.required">*</span>
              </label>
              <validation-provider v-slot="{ errors }" :name="field.title" :rules="custom(field)">
                <div class="d-flex">
                  <div
                    class="form-check mr-2"
                    v-for="(option, radiokey) in field.options"
                    :key="radiokey"
                  >
                    <input
                      class="form-check-input"
                      type="radio"
                      :class="clsss(errors, field)"
                      :value="option.key"
                      v-model="field.value"
                      name="flexRadioDefault"
                      :id="id(field)"
                      checked
                    />
                    <label class="form-check-label" :for="id(field)">{{option.label}}</label>
                  </div>
                </div>
                <div v-show="errors.length" class="invalid">
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </div>
              </validation-provider>
            </v-col>
            <v-col
              :class="field.type"
              md="6"
              cols="12"
              :key="'select_'+i"
              v-else-if="field.type === 'textarea'"
            >
              <label :for="id(field)" class="form-label">
                {{field.title}}
                <span v-if="field.required">*</span>
              </label>
              <textarea
                :class="field.html_attr.class"
                class="form-control"
                :type="field.type"
                v-model="field.value"
                :placeholder="field.title"
                :aria-label="field.name"
                :name="field.name"
                :required="field.required"
                :id="id(field)"
                rows="3"
              ></textarea>
            </v-col>
            <v-col
              :class="field.type"
              :md="6"
              cols="12"
              :key="'select_'+i"
              v-else-if="field.type === 'repeater'"
            >
              <label :for="id(field)" class="form-label">{{field.title}}</label>
              <v-divider v-if="field.value.length"></v-divider>
              <v-row v-for="(work, i) in field.value" :key="'work'+i" class="align-center work-row">
                <v-btn
                  class="mt-5 work-btn"
                  dark
                  small
                  fab
                  color="red lighten-1"
                  @click="removework(field,work)"
                >
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
                <div class="mt-2" v-for="(field_2, key) in field.list" :key="'key'+key">
                  <label :for="id(field)" class="form-label">
                    {{field_2.title}}
                    <span v-if="field.required">*</span>
                  </label>
                  <validation-provider
                    v-slot="{ errors }"
                    :name="field_2.title"
                    :rules="custom(field_2)"
                  >
                    <input
                      :class="clsss(errors, field)"
                      class="form-control"
                      :type="field_2.type"
                      :name="field_2.name"
                      v-model="work[field_2.name]"
                      :placeholder="field_2.title"
                      :aria-label="field_2.name"
                      :required="field_2.required"
                    />
                    <span v-show="errors.length" class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </v-row>
              <v-divider></v-divider>
              <v-btn class="mt-5" dark color="primary" @click="addWork(field)">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-col>
            <v-col :class="field.type" md="6" cols="12" :key="'field_'+i" v-else>
              <label :for="id(field)" class="form-label">
                {{field.title}}
                <span v-if="field.required">*</span>
              </label>
              <validation-provider v-slot="{ errors }" :name="field.title" :rules="custom(field)">
                <input
                  :class="clsss(errors, field)"
                  class="form-control"
                  :type="field.type"
                  :name="field.name"
                  v-model="field.value"
                  :placeholder="field.title"
                  :aria-label="field.name"
                  :required="field.required"
                  :id="id(field)"
                />
                <span v-show="errors.length" class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </v-col>
          </template>
        </v-row>
        <v-btn
          color="primary"
          large
          :loading="loading"
          :disabled="loading"
          class="mr-4 mt-3"
          @click="Submit"
        >Update</v-btn>
      </v-form>
    </validation-observer>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import {
  required,
  digits,
  email,
  max,
  min,
  integer,
  regex,
  alpha,
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});
extend("min", {
  ...min,
  message: "{_field_} must be greater than {length} digits. ",
});
extend("integer", {
  ...integer,
  message: "{_field_} must be numeric ",
});
extend("alpha", {
  ...alpha,
  message: "{_field_} only letters",
});
extend("only_letters", {
  ...alpha,
  message: "{_field_} only letters",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loader: null,
      loading: false,
      valid: true,
    };
  },
  created() {
    this.getformDatabyId();
  },
  computed: {
    ...mapGetters("list", ["fields"]),
  },
  methods: {
    getformDatabyId() {
      this.$store.dispatch("list/getformDatabyId", this.$route.params.id);
    },
    addWork(field) {
      let obj = {};
      field.value.push(obj);
    },
    removework(field, item) {
      var editedIndex = field.value.indexOf(item);
      field.value.splice(editedIndex, 1);
    },
    reset() {
      this.$refs.form.reset();
    },
    custom(field) {
      var valid = "";

      if (field.validate) {
        valid = "required|" + field.validate;
        if (field.required === false) {
          valid = "";
        }
      } else {
        if (field.required === true) {
          valid = "required";
        } else {
          valid = "";
        }
      }

      return valid;
    },
    id(field) {
      var id = "";
      if (field.html_attr) {
        if (field.html_attr.id) {
          id = field.html_attr.id;
        }
      }
      return id;
    },
    clsss(errors, field) {
      var cls = "";
      if (field.html_attr) {
        if (field.html_attr.class) {
          cls = field.html_attr.class;
          if (errors.length) {
            cls = "is-invalid " + field.html_attr.class;
          }
        } else {
          if (errors.length) {
            cls = "is-invalid ";
          }
        }
      } else {
        if (errors.length) {
          cls = "is-invalid ";
        }
      }

      return cls;

      //   : `${field.html_attr.class}`;
    },
    Submit() {
      this.loading = true;
      this.$refs.observer.validate().then((res) => {
        if (res == true) {
          this.$store
            .dispatch("list/submit_formData", this.fields)
            .then((res) => {
              setTimeout(
                () => (
                  this.$swal(`${res.data.messages}`, "", `${res.data.status}`),
                  (this.loading = false)
                ),
                2000
              );
            });
        } else {
          this.loading = false;
        }
      });
    },
  },
};
</script>
<style scoped>
.hidden {
  display: none;
}
</style>