<template>
  <v-form
    ref="formimage"
    v-model="formHasErrorsdetails"
    @submit.prevent="MachineuploadHandlerSubmit()"
  >
    <v-row>
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
      <v-col cols="12" sm="4"> </v-col>
      <v-col cols="12" sm="4"> </v-col>
      <v-flex xs12 md12>
        <v-container fill-height fluid>
          <v-card primary-title class="justify-center text-center">
            <v-window v-model="onboarding" reverse>
              <v-window-item v-for="n in length" :key="`card-${n}`">
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  class="white--text align-end"
                  max-width="1400"
                  max-height="850"
                  :src="image"
                >
                  <v-card-title>รายละเอียดรูป {{ n }}</v-card-title>
                </v-img>
              </v-window-item>
            </v-window>

            <v-card-actions class="justify-space-between ">
              <v-btn text @click="prev">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-item-group v-model="onboarding" class="text-center" mandatory>
                <v-item
                  v-for="n in length"
                  :key="`btn-${n}`"
                  v-slot:default="{ active, toggle }"
                >
                  <v-btn :input-value="active" icon @click="toggle">
                    <v-icon>mdi-record</v-icon>
                  </v-btn>
                </v-item>
              </v-item-group>
              <v-btn text @click="next">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>
    </v-row>
    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="!formHasErrorsdetails"
      color="success"
      type="submit"
    >
      <v-icon>mdi mdi-content-save</v-icon>
      บันทึกรูปภาพ
    </v-btn>
    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="!formHasErrorsdetails"
      color="error"
      v-on:click="onDeleteimg"
    >
      <v-icon>mdi-delete</v-icon>
      ลบรูปภาพ
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    length: 0,
    onboarding: 0,
    image: "",
    formHasErrorsdetails: true,
    loader: null,
    files: [],
    loading: false,
    // urldefualt: "http://192.168.14.22:8000/",
    urldefualt: process.env.VUE_APP_URL
  }),
  created() {
    this.active_tab = 6;
  },
  props: ["tab_index", "machine", "machinedetails"],
  computed: {
    ...mapGetters({
      listmachinedetails: "tpm/listmachinedetailsall",
      listimage: "tpm/listimages",
      resultdialog: "ui/resultdialog",
      activetab: "ui/resultactive"
    })
  },
  watch: {
    listimage() {
      this.length = this.listimage.length;
    },
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
    onboarding(val) {
      //รับค่ามาค้นหาใน arrayimage เพื่อที่จะเอาbase64 ไปใช้ต่อ
      var newarray = this.listimage.filter(el => {
        return el.index == val;
      });
      // console.log("arraytest  " + newarray[0].id);

      this.image = "";
      this.image = `${this.urldefualt}api/images/`.concat(
        this.listimage[val].pathimage
      );
    }
  },
  mounted() {
    if (this.listimage.length != 0) {
      this.image = `${this.urldefualt}api/images/`.concat(
        this.listimage[0].pathimage
      );
      this.length = this.listimage.length;
    }
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    onDeleteimg() {
      this.$store.commit("ui/set_dialog", {
        display: true,
        text: "คุณต้องการลบข้อมูลใช่หรือไม่1 ?",
        header: "แจ้งเตือน",
        class: "confirm"
      });
      this.$store.commit("ui/set_activetab", "tabmachineimage");
    },
    async MachineuploadHandlerSubmit() {
      const userId = localStorage.getItem("userId");
      let formDatapic = new FormData();
      for (let file of this.files) {
        formDatapic.append("files", file, file.name);
        formDatapic.append("idmachine", this.machine.idmachine);
        formDatapic.append("pathname", "uploads/" + file.name);
        formDatapic.append("create_by", userId);
      }
      this.$store
        .dispatch("tpm/createimages", formDatapic)
        .then(res => {
          // this.$store.dispatch("customer/listcustomer");
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
          this.$store.dispatch("tpm/getimages", this.machine.idmachine);

          this.$refs.formimage.reset();
          this.active_tab = 6;
        })
        .catch(error => {
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "error",
              showing: true,
              timeout: 3000,
              text: error
            },
            { root: true }
          );

          this.error = true;
        });
    },
    confirmdelete(value) {
      if (this.activetab == "tabmachineimage") {
        if (value.resultdialogs == true) {
          var newarray = this.listimage.filter(el => {
            return el.index == this.onboarding;
          });
          this.$store
            .dispatch("tpm/deleteimages", newarray[0].id)
            .then(res => {
              this.$store.dispatch("tpm/getimages", this.machine.idmachine);
              this.$store.dispatch(
                "snackbar/setSnackbar",
                {
                  color: "info",
                  showing: true,
                  timeout: 2000,
                  text: "ลบข้อมูลสำเร็จ !!"
                },
                { root: true }
              );
            })
            .catch(error => {
              this.$store.dispatch(
                "snackbar/setSnackbar",
                {
                  color: "error",
                  showing: true,
                  timeout: 3000,
                  text: error
                },
                { root: true }
              );
              this.error = true;
            });
        }
      }
    }
  }
};
</script>

<style></style>
