<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          Reset Password</v-card-subtitle
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
              ref="divisionname"
              v-model="division.divisionname"
              :rules="[() => !!division.divisionname || '*']"
              :error-messages="errorMessages"
              label="ชื่อ-นามสกุล"
              required
              outlined
            ></v-text-field>
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
  props: ["tab_index", "division"],
  data: () => ({
    formHasErrors: true,
    errorMessages: null,
    loader: null,
    loading: false,
    password: null,
  }),
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
      const formData = {
        id: this.division.id,
        divisionname: this.division.divisionname,
      };

      this.$store
        .dispatch("division/updatedivision", formData)
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
    isNumber(evt) {
      evt = evt || window.event;
      let charCode = evt.which || evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
      return false;
    },
  },
};
</script>

<style></style>
