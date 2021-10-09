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
      <v-col cols="12" sm="4">
        <v-autocomplete
          ref="division"
          v-model="seasonmachine.id"
          :items="listseason"
          :item-text="(item) => `${item.name}`"
          :item-value="(item) => `${item.id}`"
          label="แผนการผลิต"
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="4"> </v-col>
      <v-flex xs12 md12>
        <v-container fill-height fluid>
          <v-card primary-title class="justify-center text-center">
            <v-window v-model="onboarding" reverse>
              <v-window-item v-for="n in length" :key="`card-${n}`">
                <v-img
                  class="white--text align-end"
                  width="1400"
                  height="850"
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
      class="ma-2  green accent-4"
      :loading="loading"
      :disabled="!formHasErrorsdetails"
      color="success"
      type="submit"
    >
      <v-icon>mdi mdi-content-save</v-icon>
      บันทึกรูปภาพ
    </v-btn>
    <v-btn
      class="ma-2 red accent-4"
      :loading="loading"
      :disabled="!formHasErrorsdetails"
      color="error"
      @click="onDeleteimgplan"
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
    active_tab: 7,
    length: 0,
    onboarding: 0,
    image: "",
    formHasErrorsdetails: true,
    loader: null,
    files: [],
    loading: false,
    // urldefualt: "http://192.168.14.22:8000/",
    urldefualt: process.env.VUE_APP_URL,
    seasonmachine: {
      id: "",
      name: "",
    },
  }),
  computed: {
    ...mapGetters({
      resultdialog: "ui/resultdialog",
      listimageplan: "tpm/listimagesplans",
      listseason: "tpm/listseasons",
      activetab: "ui/resultactive",
    }),
    formimage() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machinedetail.idmachine,
        name: this.machinedetail.name,
        orders: this.machinedetail.orders,
        seasonid: this.seasonmachine.id,
      };
    },
  },
  watch: {
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
    listimageplan() {
      this.length = this.listimageplan.length;
    },
    onboarding(val) {
      //รับค่ามาค้นหาใน arrayimage เพื่อที่จะเอาbase64 ไปใช้ต่อ
      var newarray = this.listimageplan.filter((el) => {
        return el.index == val;
      });
      // console.log("arraytest  " + newarray[0].id);

      this.image = "";
      this.image = `${this.urldefualt}api/imagesplan/`.concat(
        this.listimageplan[val].pathimage
      );
    },
  },
  mounted() {
    if (this.listimageplan.length != 0) {
      this.image = `${this.urldefualt}api/imagesplan/`.concat(
        this.listimageplan[0].pathimage
      );
    }
    this.length = this.listimageplan.length;
  },
  props: ["tab_index", "machine", "machinedetails"],
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    onDeleteimgplan() {
      this.$store.commit("ui/set_dialog", {
        display: true,
        text: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
        header: "แจ้งเตือน",
        class: "confirm",
      });
      this.$store.commit("ui/set_activetab", "planimage");
    },
    async MachineuploadHandlerSubmit() {
      const userId = localStorage.getItem("userId");
      let formDatapic = new FormData();
      for (let file of this.files) {
        formDatapic.append("files", file, file.name);
        formDatapic.append("idmachine", this.machine.idmachine);
        formDatapic.append("seasonid", this.seasonmachine.id);
        formDatapic.append("pathname", "uploadplan/" + file.name);
        formDatapic.append("create_by", userId);
      }
      this.$store
        .dispatch("tpm/createimagesplan", formDatapic)
        .then((res) => {
          // this.$store.dispatch("customer/listcustomer");
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
          // clear element
          // Object.keys(this.form).forEach(f => {
          //   this.$refs[f].reset();
          // });

          this.$store.dispatch("tpm/getimagesplan", this.machine.idmachine);

          this.$refs.formimage.reset();
        })
        .catch((error) => {
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "error",
              showing: true,
              timeout: 3000,
              text: error,
            },
            { root: true }
          );

          this.error = true;
        });
    },
    confirmdelete(value) {
      if (this.activetab == "planimage") {
        if (value.resultdialogs == true) {
          //ลบรูปtabที่4เท่านั้น
          var newarray = this.listimageplan.filter((el) => {
            return el.index == this.onboarding;
          });
          this.$store
            .dispatch("tpm/deleteimagesplan", newarray[0].id)
            .then((res) => {
              this.$store.dispatch("tpm/getimagesplan", this.machine.idmachine);
              this.$store.dispatch(
                "snackbar/setSnackbar",
                {
                  color: "info",
                  showing: true,
                  timeout: 2000,
                  text: "ลบข้อมูลสำเร็จ !!",
                },
                { root: true }
              );
            })
            .catch((error) => {
              this.$store.dispatch(
                "snackbar/setSnackbar",
                {
                  color: "error",
                  showing: true,
                  timeout: 3000,
                  text: error,
                },
                { root: true }
              );
              this.error = true;
            });
        }
      }
    },
  },
};
</script>

<style></style>
