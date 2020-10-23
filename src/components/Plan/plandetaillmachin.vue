<template>
  <v-sheet>
    <v-container>
      <v-btn class="ma-2" color="error" v-on:click="onChange_tabIndex">
        <v-icon>mdi mdi-undo-variant</v-icon>
        กลับ
      </v-btn>
      <v-btn class="ma-2" color="primary" v-on:click="onAddtabimageplan">
        <v-icon>mdi-plus-circle</v-icon>
        เพิ่มรูปภาพ
      </v-btn>
      <v-divider></v-divider>
      <v-tabs v-model="active_tab">
        <v-tab v-for="tab of tabs" :key="tab.id">
          {{ tab.name }}
        </v-tab>

        <v-tab-item>
          <v-card flat class="mx-auto" max-width="auto">
            <v-container>
              <v-form>
                <v-row>
                  <v-flex xs12 md8>
                    <v-container fill-height fluid>
                      <v-card primary-title class="justify-center text-center">
                        <v-window v-model="onboarding1" reverse>
                          <v-window-item
                            v-for="n in lengthimg1"
                            :key="`card-${n}`"
                          >
                            <v-img
                              class="white--text align-end"
                              width="1200"
                              height="550"
                              :src="image1"
                            >
                              <v-card-title>รายละเอียดรูป</v-card-title>
                            </v-img>
                          </v-window-item>
                        </v-window>

                        <v-card-actions class="justify-space-between ">
                          <v-btn text @click="prev1">
                            <v-icon>mdi-chevron-left</v-icon>
                          </v-btn>
                          <v-item-group
                            v-model="onboarding1"
                            class="text-center"
                            mandatory
                          >
                            <v-item
                              v-for="n in lengthimg1"
                              :key="`btn-${n}`"
                              v-slot:default="{ active, toggle }"
                            >
                              <v-btn :input-value="active" icon @click="toggle">
                                <v-icon>mdi-record</v-icon>
                              </v-btn>
                            </v-item>
                          </v-item-group>
                          <v-btn text @click="next1">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-container>
                  </v-flex>
                </v-row>
              </v-form>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat class="mx-auto" max-width="auto">
            <v-container>
              <v-form>
                <v-row>
                  <v-flex xs12 md8>
                    <v-container fill-height fluid>
                      <v-card primary-title class="justify-center text-center">
                        <v-window v-model="onboarding2" reverse>
                          <v-window-item
                            v-for="n in lengthimg2"
                            :key="`card-${n}`"
                          >
                            <v-img
                              class="white--text align-end"
                              width="1200"
                              height="550"
                              :src="image2"
                            >
                              <v-card-title>รายละเอียดรูป</v-card-title>
                            </v-img>
                          </v-window-item>
                        </v-window>

                        <v-card-actions class="justify-space-between ">
                          <v-btn text @click="prev2">
                            <v-icon>mdi-chevron-left</v-icon>
                          </v-btn>
                          <v-item-group
                            v-model="onboarding2"
                            class="text-center"
                            mandatory
                          >
                            <v-item
                              v-for="n in lengthimg2"
                              :key="`btn-${n}`"
                              v-slot:default="{ active, toggle }"
                            >
                              <v-btn :input-value="active" icon @click="toggle">
                                <v-icon>mdi-record</v-icon>
                              </v-btn>
                            </v-item>
                          </v-item-group>
                          <v-btn text @click="next2">
                            <v-icon>mdi-chevron-right</v-icon>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-container>
                  </v-flex>
                </v-row>
              </v-form>
            </v-container>
          </v-card>
        </v-tab-item>
        <v-tab-item>
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
                  :item-text="item => `${item.name}`"
                  :item-value="item => `${item.id}`"
                  label="แผนการผลิต"
                  prepend-icon="mdi mdi-pencil"
                  outlined
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4"> </v-col>
              <v-flex xs12 md8>
                <v-container fill-height fluid>
                  <v-card primary-title class="justify-center text-center">
                    <v-window v-model="onboarding" reverse>
                      <v-window-item v-for="n in length" :key="`card-${n}`">
                        <v-img
                          class="white--text align-end"
                          width="1200"
                          height="550"
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
                      <v-item-group
                        v-model="onboarding"
                        class="text-center"
                        mandatory
                      >
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
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    length: 0,
    lengthimg1: 0,
    lengthimg2: 0,
    onboarding: 0,
    onboarding1: 0,
    onboarding2: 0,
    active_tab: 0,
    tabs: [
      { id: 1, name: "แผนช่วงซ่อม" },
      { id: 2, name: "แผนช่วงผลิต" }
    ],
    formHasErrors: true,
    formHasErrorsdetails: true,
    errorMessages: null,
    loader: null,
    files: [],
    image: "",
    image1: "",
    image2: "",
    loading: false,
    urldefualt: "http://192.168.14.22:8000/",
    resultconfirm: false,
    showDialog: false,
    editedIndex: -1,
    seasonmachine: {
      id: "",
      name: ""
    }
  }),
  props: ["tab_index", "machine", "machinedetails"],
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      listsizename: "tpm/listsizenames",
      listcapacityname: "tpm/listcapacitynames",
      listpowername: "tpm/listpowernames",
      listmachinedetails: "tpm/listmachinedetailsall",
      resultdialog: "ui/resultdialog",
      listimageplan: "tpm/listimagesplans",
      listdivision: "tpm/listdivisions",
      listseason: "tpm/listseasons",
      listplanseason1: "tpm/listplanseason1",
      listplanseason2: "tpm/listplanseason2"
    }),
    formimage() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machinedetail.idmachine,
        name: this.machinedetail.name,
        orders: this.machinedetail.orders,
        seasonid: this.seasonmachine.id
      };
    },
    form2() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machinedetails.idmachine,
        name: this.machinedetails.name,
        orders: this.machinedetails.orders
      };
    }
  },
  mounted() {
    if (this.listimageplan.length > 0) {
      this.image = `${this.urldefualt}api/imagesplan/`.concat(
        this.listimageplan[0].pathimage
      );
    }
    if (this.listplanseason1.length > 0) {
      this.image1 = `${this.urldefualt}api/imagesplan/`.concat(
        this.listplanseason1[0].pathimage
      );
    }
    if (this.listplanseason2.length > 0) {
      this.image2 = `${this.urldefualt}api/imagesplan/`.concat(
        this.listplanseason2[0].pathimage
      );
    }

    this.lengthimg1 = this.listplanseason1.length;
    this.lengthimg2 = this.listplanseason2.length;
    this.length = this.listimageplan.length;
  },
  watch: {
    listimageplan() {
      var listimg1 = this.listimageplan.filter(el => {
        return el.seasonid == 1;
      });
      var listimg2 = this.listimageplan.filter(el => {
        return el.seasonid == 2;
      });

      this.lengthimg1 = listimg1.length;
      this.lengthimg2 = listimg2.length;
      this.length = this.listimageplan.length;
    },
    onboarding(val) {
      //รับค่ามาค้นหาใน arrayimage เพื่อที่จะเอาbase64 ไปใช้ต่อ
      var newarray = this.listimageplan.filter(el => {
        return el.index == val;
      });
      // console.log("arraytest  " + newarray[0].id);

      this.image = "";
      this.image = `${this.urldefualt}api/imagesplan/`.concat(
        this.listimageplan[val].pathimage
      );
    },
    onboarding1(val) {
      // console.log("arraytest  " + newarray[0].id);
      if (val < this.listplanseason1.length) {
        this.image1 = "";
        this.image1 = `${this.urldefualt}api/imagesplan/`.concat(
          this.listplanseason1[val].pathimage
        );
      }
    },
    onboarding2(val) {
      if (val < this.listplanseason1.length) {
        this.image2 = "";
        this.image2 = `${this.urldefualt}api/imagesplan/`.concat(
          this.listplanseason2[val].pathimage
        );
      }
    },
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
    active_tab() {
      const alltab = this.tabs.length;
      if (this.active_tab == 1 && alltab == 3) {
        this.tabs.pop({ id: 3 });
      } else if (this.active_tab == 0 && alltab == 3) {
        this.tabs.pop({ id: 3 });
      }
    }
  },
  methods: {
    initialize() {},
    onDeleteimg() {
      this.$store.commit("ui/set_dialog", {
        display: true,
        text: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
        header: "แจ้งเตือน",
        class: "confirm"
      });
    },
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    next1() {
      this.onboarding1 =
        this.onboarding1 + 1 === this.length1 ? 0 : this.onboarding1 + 1;
    },
    prev1() {
      this.onboarding1 =
        this.onboarding1 - 1 < 0 ? this.length1 - 1 : this.onboarding1 - 1;
    },
    next2() {
      this.onboarding2 =
        this.onboarding2 + 1 === this.length2 ? 0 : this.onboarding2 + 1;
    },
    prev2() {
      this.onboarding2 =
        this.onboarding2 - 1 < 0 ? this.length2 - 1 : this.onboarding2 - 1;
    },
    async onChange_tabIndex() {
      this.$emit("receivedatadetails", 1);
    },
    editItem(item) {
      // go to updateform customer (tabindex=3)
      const newtab1 = { id: 3, name: "เพิ่มชิ้นส่วนอะไหล่" };
      const newtab = { id: 4, name: "แก้ไขชิ้นส่วนอะไหล่" };
      this.tabs.push(newtab1);
      this.tabs.push(newtab);
      this.active_tab = 3;
      this.machinedetail = Object.assign({}, item);
      this.$emit("ondatadetails_receive", this.machinedetail);
    },
    deleteItem(item) {
      this.editedIndex = this.listmachinedetails.indexOf(item);
      this.machinedetail = Object.assign({}, item);

      this.$store.commit("ui/set_dialog", {
        display: true,
        text: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
        header: "แจ้งเตือน",
        class: "confirm"
      });
    },
    onAddtabimageplan() {
      const newtab = { id: 3, name: "เพิ่มรูปภาพ" };
      this.tabs.push(newtab);
      this.active_tab = 2;
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
      console.log(formDatapic);
      this.$store
        .dispatch("tpm/createimagesplan", formDatapic)
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

          this.$store.dispatch("tpm/getimagesplan", this.machine.idmachine);

          this.$refs.formimage.reset();
          this.active_tab = 0;
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
    async MachineupdateHandlerSubmit() {
      const userId = localStorage.getItem("userId");
      let formDatapic = new FormData();
      for (let file of this.files) {
        formDatapic.append("files", file, file.name);
        formDatapic.append("idmachine", this.machine.idmachine);
        formDatapic.append("update_by", userId);
      }
      const formData = {
        id: this.machinedetails.id,
        idmachine: this.machinedetails.idmachine,
        orders: this.machinedetails.orders,
        name: this.machinedetails.name,
        unit: this.machinedetails.unit,
        idproduct: this.machinedetails.idproduct,
        w3: this.machinedetails.w3,
        m1: this.machinedetails.m1,
        m3: this.machinedetails.m3,
        y1: this.machinedetails.y1,
        y2: this.machinedetails.y2,
        y3: this.machinedetails.y3,
        oh: this.machinedetails.oh,
        number: this.machinedetails.number
      };
      this.formHasErrorsdetails = false;
      Object.keys(this.form2).forEach(f => {
        if (!this.form2[f]) this.formHasErrorsdetails = true;
        this.$refs[f].validate(true);
      });
      //ถ้าไม่มี error ให้ กด ส่งข้อมูล
      if (!this.formHasErrorsdetails) {
        // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
        this.$store
          .dispatch("tpm/updatemachinedetails", formData)
          .then(res => {
            this.$store.dispatch("tpm/updateimages", formDatapic);
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
            this.$store.dispatch(
              "tpm/listmachinedetails",
              this.machinedetails.idmachine
            );
            this.$refs.form2.reset();
            this.$refs.form2.resetValidation();
            this.formHasErrorsdetails = true;
            this.active_tab = 1;
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
    },
    async MachinedetailsHandlerSubmit() {
      const formData = {
        idmachine: this.machinedetail.idmachine,
        orders: this.machinedetail.orders,
        name: this.machinedetail.name,
        unit: this.machinedetail.unit,
        idproduct: this.machinedetail.idproduct,
        w3: this.machinedetail.w3,
        m1: this.machinedetail.m1,
        m3: this.machinedetail.m3,
        y1: this.machinedetail.y1,
        y2: this.machinedetail.y2,
        y3: this.machinedetail.y3,
        oh: this.machinedetail.oh,
        number: this.machinedetail.number
      };
      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      //ถ้าไม่มี error ให้ กด ส่งข้อมูล
      if (!this.formHasErrors) {
        // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
        this.$store
          .dispatch("tpm/addmachinedetails", formData)
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
            this.$store
              .dispatch("tpm/listmachinedetails", this.machinedetail.idmachine)
              .then(() => {
                this.$store.dispatch("tpm/getimages", this.machine.idmachine);
              });

            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.active_tab = 1;
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
    },
    confirmdelete(value) {
      if (value.resultdialogs == true) {
        if (this.active_tab == 2) {
          //ลบรูปtabที่4เท่านั้น
          var newarray = this.listimageplan.filter(el => {
            return el.index == this.onboarding;
          });
          console.log(newarray[0].id);
          this.$store
            .dispatch("tpm/deleteimagesplan", newarray[0].id)
            .then(res => {
              this.$store.dispatch("tpm/getimagesplan", this.machine.idmachine);
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
        } else {
          // ลบข้อมูลทั่วไป
          this.$store
            .dispatch("tpm/deletedetailsmachine", this.machinedetail)
            .then(res => {
              this.$store.dispatch(
                "tpm/listmachinedetails",
                this.machinedetail.idmachine
              );
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
