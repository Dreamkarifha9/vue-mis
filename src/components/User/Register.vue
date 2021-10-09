<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          เพิ่มข้อมูล User</v-card-subtitle
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
          <v-col cols="12" sm="4">
            <v-text-field
              ref="name"
              v-model="user.name"
              :rules="[() => !!user.name || '*']"
              :error-messages="errorMessages"
              label="ชื่อ-นามสกุล"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="username"
              v-model="user.username"
              :rules="[() => !!user.username || '*']"
              :error-messages="errorMessages"
              label="USERNAME"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="password"
              v-model="user.password"
              :rules="[() => !!user.password || '*']"
              :error-messages="errorMessages"
              label="รหัสผ่าน"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="employee_id"
              v-model="user.employee_id"
              :rules="[() => !!user.employee_id || '*']"
              :error-messages="errorMessages"
              label="รหัสพนักงาน"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-combobox
              v-model="selectdivision"
              :items="itemsDivision"
              :item-text="(item) => `${item.divisionname}`"
              :item-value="(item) => `${item.id}`"
              return-object
              label="แผนก"
              multiple
              required
              outlined
            ></v-combobox>
          </v-col>
        </v-row>
        <v-btn
          class="ma-2 green accent-4"
          :loading="loading"
          :disabled="!formHasErrors"
          color="success"
          type="submit"
        >
          <v-icon>mdi mdi-content-save</v-icon>
          บันทึกข้อมูล
        </v-btn>
        <v-btn
          class="ma-2 red accent-4"
          color="error"
          @click="onChange_tabIndex"
        >
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
  props: ["tab_index"],
  data: () => ({
    formHasErrors: true,
    errorMessages: null,
    loader: null,
    loading: false,
    selectdivision: [],
    date: new Date().toISOString().substr(0, 10),
    user: {
      name: null,
      username: null,
      password: null,
      is_active: true,
      employee_id: null,
    },
  }),
  computed: {
    ...mapGetters({
      resultdialog: "ui/resultdialog",
      listdivision: "tpm/listdivisions",
    }),
    itemsDivision() {
      return this.listdivision.filter((item) => {
        return item.id != 0;
      });
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  methods: {
    async onChange_tabIndex() {
      this.$emit("changetabindex", 1);
    },
    async MachineHandlerSubmit() {
      let data = [];
      for (let item of this.selectdivision) {
        data.push(item.id);
      }
      const formData = {
        name: this.user.name,
        username: this.user.username,
        password: this.user.password,
        is_active: this.user.is_active,
        employee_id: this.user.employee_id,
        division: data.toString(),
      };
      this.$store
        .dispatch("user/adduser", formData)
        .then((res) => {
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "info",
              showing: true,
              timeout: 2000,
              text: "บันทึกข้อมูลสำเร็จ !!",
            },
            { root: true }
          );
          this.onChange_tabIndex();
        })
        .catch((error) => {
          // let stasave = this.$store.state("tpm/statussave");
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "error",
              showing: true,
              timeout: 10000,
              text: `${error.response.data.message}   ${error.response.status}`,
            },
            { root: true }
          );

          this.error = true;
        });
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
  },
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
