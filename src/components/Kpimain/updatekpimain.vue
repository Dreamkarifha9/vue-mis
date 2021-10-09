<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          แก้ไขข้อมูลKPIหลัก
        </v-card-subtitle>
      </v-flex>
    </v-card-title>
    <v-container>
      <v-form
        ref="form"
        v-model="formHasErrors"
        @submit.prevent="MachineupdateHandlerSubmit()"
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
                  :value="getConvertDate(kpimain.datecurrent)"
                  label="วันที่บันทึกรูปภาพ"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  disabled
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
          <v-col cols="12" sm="4"></v-col>
          <v-flex xs12 md8>
            <v-container fill-height fluid>
              <v-card
                v-if="listimagekpimain.length > 0"
                primary-title
                class="justify-center text-center"
              >
                <v-window v-model="onboarding" reverse>
                  <v-window-item v-for="n in length" :key="`card-${n}`">
                    <VuePureLightbox
                      style="width: 20em"
                      :thumbnail="image"
                      :images="images"
                    />
                  </v-window-item>
                </v-window>

                <!-- <v-card-actions class="justify-space-between ">
                <v-btn text @click="prev">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-item-group v-model="onboarding" class="text-center" mandatory>
                  <v-item v-for="n in length" :key="`btn-${n}`">
   
                  </v-item>
                </v-item-group>
                <v-btn text @click="next">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions> -->
              </v-card>
            </v-container>
          </v-flex>
        </v-row>
        <v-btn
          v-if="$can('view_editkpimain')"
          class="ma-2 green accent-4"
          :loading="loading"
          :disabled="!formHasErrors"
          color="success"
          type="submit"
        >
          <v-icon>mdi mdi-content-save</v-icon>
          บันทึกแก้ไขข้อมูล
        </v-btn>

        <v-btn
          v-if="$can('view_deletekpimain')"
          class="ma-2 red accent-4"
          :loading="loading"
          :disabled="!formHasErrors"
          color="error"
          @click="onDeleteimg"
        >
          <v-icon>mdi-delete</v-icon>
          ลบรูปภาพ
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
import moment from "moment";
import VuePureLightbox from "vue-pure-lightbox";

import { mapGetters, mapState } from "vuex";
export default {
  components: {
    VuePureLightbox,
  },
  props: ["tab_index", "kpimain"],
  data: () => ({
    images: [],
    index: 0,
    loading: false,
    formHasErrors: true,
    errorMessages: null,
    loader: null,
    files: [],
    date: new Date().toISOString().substr(0, 10),
    length: 0,
    onboarding: 0,
    image: "",
    // urldefualt: "http://192.168.14.22:8000/",
    urldefualt: process.env.VUE_APP_URL,
  }),
  computed: {
    ...mapGetters({
      resultdialog: "ui/resultdialog",
      listimagekpimain: "kpimain/listimgekpimains",
    }),
  },
  watch: {
    date(val) {
      this.kpimain.datecurrent = val;
    },
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
    listimagekpimain() {
      if (this.listimagekpimain.length == 0) {
        this.images = [];
        this.image = null;
      } else {
        this.image = `${this.urldefualt}api/imageskpimain/`.concat(
          this.listimagekpimain[0].pathimg
        );
        this.images = [];
        for (let i = 0; i < this.listimagekpimain.length; i++) {
          this.images.push(
            `${this.urldefualt}api/imageskpimain/`.concat(
              this.listimagekpimain[i].pathimg
            )
          );
        }

        this.length = this.listimagekpimain.length;
      }
    },
    onboarding(val) {
      //รับค่ามาค้นหาใน arrayimage เพื่อที่จะเอาbase64 ไปใช้ต่อ
      var newarray = this.listimagekpimain.filter((el) => {
        return el.index == val;
      });
      this.index = val;
      // console.log("arraytest  " + newarray[0].id);
      // this.image = "";
      // this.image = `${this.urldefualt}api/imageskpimain/`.concat(
      //   this.listimagekpimain[val].pathimg
      // );
    },
  },
  mounted() {
    if (this.listimagekpimain.length != 0) {
      this.image = `${this.urldefualt}api/imageskpimain/`.concat(
        this.listimagekpimain[0].pathimg
      );
      for (let i = 0; i < this.listimagekpimain.length; i++) {
        this.images.push(
          `${this.urldefualt}api/imageskpimain/`.concat(
            this.listimagekpimain[i].pathimg
          )
        );
      }
      this.length = this.listimagekpimain.length;
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
    getConvertDate: function(date) {
      if (date) {
        return moment(date).format("DD-MM-YYYY");
      }
    },
    onDeleteimg() {
      this.$store.commit("ui/set_dialog", {
        display: true,
        text: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
        header: "แจ้งเตือน",
        class: "confirm",
      });
    },
    async onChange_tabIndex() {
      this.$emit("changetabindex", 1);
    },
    async MachineupdateHandlerSubmit() {
      const userId = localStorage.getItem("userId");
      let formDatapic = new FormData();
      for (let file of this.files) {
        formDatapic.append("files", file, file.name);
        formDatapic.append("pathname", "Kpimain/" + file.name);
        formDatapic.append("update_by", userId);
        formDatapic.append("uuid", this.kpimain.id);
      }

      // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
      this.$store
        .dispatch("kpimain/createimageskpimain", formDatapic)
        .then((res) => {
          // this.$store.dispatch("customer/listcustomer");
          this.$store.dispatch("kpimain/getimages", this.kpimain.id);
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "info",
              showing: true,
              timeout: 2000,
              text: "บันทึกข้อมูลสำเร็จ !!",
            },
            {
              root: true,
            }
          );
          this.files = [];
          // clear element
          // Object.keys(this.form).forEach(f => {
          //   this.$refs[f].reset();
          // });
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
            {
              root: true,
            }
          );

          this.error = true;
        });
    },
    confirmdelete(value) {
      if (value.resultdialogs == true) {
        //ลบรูปtabที่4เท่านั้น
        this.$store
          .dispatch(
            "kpimain/deletekpimainimages",
            this.listimagekpimain[this.onboarding].id
          )
          .then((res) => {
            this.$store.dispatch("kpimain/getimages", this.kpimain.id);

            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "info",
                showing: true,
                timeout: 2000,
                text: "ลบข้อมูลสำเร็จ !!",
              },
              {
                root: true,
              }
            );
          })
          .catch((error) => {
            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "error",
                showing: true,
                timeout: 3000,
                text: `${error.response.data.message}   ${error.response.status}`,
              },
              {
                root: true,
              }
            );
            this.image = "";
            this.images = [];
            this.error = true;
          });
      }
    },
  },
};
</script>

<style src="vue-pure-lightbox/dist/VuePureLightbox.css"></style>
<style scoped>
.image {
  width: 300px;
  height: 400px;
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}
.lightbox__image img {
  height: auto !important;
}
</style>
