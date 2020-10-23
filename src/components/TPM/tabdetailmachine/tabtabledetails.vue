<template>
<v-card flat class="mx-auto" max-width="auto">
  <v-card-title>
    <v-flex xs12 md4>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-flex>
  </v-card-title>

  <v-container>
    <v-form>
      <v-row>
        <v-flex xs12 md12>
          <v-data-table :headers="headers" :items="listmachinedetails" sort-by="orders" :search="search" item-key="id" class="elevation-" loading loading-text="Loading... Please wait">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon medium class="mr-2" color="primary" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon medium class="mr-2" color="error" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-flex>
        <v-flex xs12 md12>
          <v-container fill-height fluid>
            <v-card primary-title class="justify-center text-center">
              <v-window v-model="onboarding" reverse>
                <v-window-item v-for="n in length" :key="`card-${n}`">
                  <v-img lazy-src="https://picsum.photos/id/11/10/6" class="white--text align-end" max-width="1400" max-height="850" :src="image">
                    <v-card-title>รายละเอียดรูป</v-card-title>
                  </v-img>
                </v-window-item>
              </v-window>

              <v-card-actions class="justify-space-between ">
                <v-btn text @click="prev">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-item-group v-model="onboarding" class="text-center" mandatory>
                  <v-item v-for="n in length" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
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
    </v-form>
  </v-container>
</v-card>
</template>

<script>
import {
  mapGetters,
  mapState
} from "vuex";
export default {
  data: () => ({
    length: 0,
    onboarding: 0,
    active_tab: 0,
    image: "",
    search: "",
    // urldefualt: "http://192.168.14.22:8000/",
    urldefualt: process.env.VUE_APP_URL,
    headers: [{
        text: "ลำดับ",
        value: "orders",
        sortable: true,
        width: "2%",
        align: "center"
      },
      {
        text: "รายการ",
        value: "name",
        sortable: false
      },
      {
        text: "จำนวน",
        value: "number",
        sortable: false,
        width: "2%",
        align: "center"
      },
      {
        text: "หน่วย",
        value: "unit",
        sortable: false,
        width: "2%",
        align: "center"
      },
      {
        text: "รหัสสินค้า",
        value: "idproduct",
        sortable: false,
        align: "center"
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        width: "8%",
        align: "center"
      }
    ],
    machinedetail: {
      id: "",
      idmachine: "",
      orders: "",
      name: "",
      unit: "",
      idproduct: "",
      w3: "",
      m1: "",
      m3: "",
      y1: "",
      y2: "",
      y3: "",
      oh: "",
      number: ""
    }
  }),
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
  computed: {
    ...mapGetters({
      listmachinedetails: "tpm/listmachinedetailsall",
      listimage: "tpm/listimages",
      resultdialog: "ui/resultdialog",
      activetab: "ui/resultactive"
    })
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
    editItem(item) {
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
      this.$store.commit("ui/set_activetab", "tatabledetails");
    },
    confirmdelete(value) {
      if (this.activetab == "tatabledetails") {
        if (value.resultdialogs == true) {
          // ลบข้อมูลทั่วไป
          this.$store
            .dispatch("tpm/deletedetailsmachine", this.machinedetail)
            .then(res => {
              this.$store.dispatch(
                "tpm/listmachinedetails",
                this.machinedetail.idmachine
              );
              this.$store.dispatch(
                "snackbar/setSnackbar", {
                  color: "info",
                  showing: true,
                  timeout: 2000,
                  text: "ลบข้อมูลสำเร็จ !!"
                }, {
                  root: true
                }
              );
            })
            .catch(error => {
              this.$store.dispatch(
                "snackbar/setSnackbar", {
                  color: "error",
                  showing: true,
                  timeout: 3000,
                  text: error
                }, {
                  root: true
                }
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
