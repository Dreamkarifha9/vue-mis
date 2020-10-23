<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          เพิ่มข้อมูลKPIรอง</v-card-subtitle
        >
      </v-flex>
    </v-card-title>
    <v-container>
      <v-form
        ref="form"
        v-model="formHasErrors"
        @submit.prevent="MachineHandlerSubmit()"
      >
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="วันที่บันทึกรูปภาพ"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" locale="th"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="4">
            <v-file-input
              v-model="files"
              color="deep-purple accent-4"
              counter
              label="File Image Input"
              multiple
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
              <v-btn class="ma-2" text icon color="blue lighten-2">
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
            </v-file-input>
          </v-col>
        </v-row>
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="!formHasErrors"
          color="success"
          type="submit"
        >
          <v-icon>mdi mdi-content-save</v-icon>
          บันทึกข้อมูล
        </v-btn>
        <v-btn class="ma-2" color="error" v-on:click="onChange_tabIndex">
          <v-icon>mdi mdi-undo</v-icon>
          กลับ
        </v-btn>
      </v-form>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    formHasErrors: true,
    errorMessages: null,
    loader: null,
    loading: false,
    files: [],
    date: new Date().toISOString().substr(0, 10)
  }),
  props: ["tab_index"],
  computed: {
    ...mapGetters({
      resultdialog: "ui/resultdialog"
    })
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  methods: {
    async onChange_tabIndex() {
      console.log(this.date);
      this.$emit("changetabindex", 1);
    },
    async MachineHandlerSubmit() {
      const userId = localStorage.getItem("userId");
      let formDatapic = new FormData();
      let uuid = this.uuidv4();
      for (let file of this.files) {
        formDatapic.append("files", file, file.name);
        formDatapic.append("pathname", "Kpimain/" + file.name);
        formDatapic.append("create_by", userId);
        formDatapic.append("uuid", uuid);
        formDatapic.append("create_by", userId);
      }
      const formData = {
        datecurrent: this.date,
        id: uuid,
        create_by: userId
      };

      this.$store
        .dispatch("kpiminor/addkpiminor", formData)
        .then(res => {
          // this.$store.dispatch("customer/listcustomer");
          this.$store
            .dispatch("kpiminor/createimageskpiminor", formDatapic)
            .then(res => {
              this.$store.dispatch(
                "snackbar/setSnackbar",
                {
                  color: "info",
                  showing: true,
                  timeout: 2000,
                  text: "บันทึกข้อมูลสำเร็จ !!"
                },
                { root: true }
              );
              // clear element
              // Object.keys(this.form).forEach(f => {
              //   this.$refs[f].reset();
              // });
              this.onChange_tabIndex();
            })
            .catch(error => {
              // let stasave = this.$store.state("tpm/statussave");
              this.$store.dispatch(
                "snackbar/setSnackbar",
                {
                  color: "error",
                  showing: true,
                  timeout: 10000,
                  text: `${error}   ${error.response.status}`
                },
                { root: true }
              );

              this.error = true;
            });
        })
        .catch(error => {
          // let stasave = this.$store.state("tpm/statussave");
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "error",
              showing: true,
              timeout: 10000,
              text: `${error.response.data.message}   ${error.response.status}`
            },
            { root: true }
          );

          this.error = true;
        });
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }
  }
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
