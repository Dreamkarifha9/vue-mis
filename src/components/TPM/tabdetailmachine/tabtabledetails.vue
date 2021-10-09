<template>
  <v-card flat class="mx-auto" max-width="auto">
    <v-card-title>
      <v-flex xs12 md3 ml-2>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          outlined
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md4 ml-3>
        <!-- <v-chip class="ma-2" color="red" outlined>
          <v-icon left>
            grade
          </v-icon>
          {{ machine.namethai }}
        </v-chip> -->

        <v-chip large color="grey darken-4" label text-color="white">
          <v-icon left>
            mdi-label
          </v-icon>
          {{ `${machine.namethai}/${machine.idmachine}` }}
        </v-chip>
      </v-flex>
    </v-card-title>

    <v-container>
      <v-form>
        <v-row>
          <v-flex xs12 md12>
            <v-data-table
              dense
              :headers="headers"
              :items="listmachinedetails"
              :items-per-page="15"
              sort-by="orders"
              :search="search"
              item-key="id"
              class="elevation-1"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip top color="black">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="$can('view_editmachinetpm')"
                      elevation="2"
                      fab
                      class="teal mr-2 my-1"
                      x-small
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="editItem(item)"
                    >
                      <v-icon color="grey lighten-5">
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>แก้ไข</span>
                </v-tooltip>

                <v-tooltip top color="black">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="$can('view_deletemachinetpm')"
                      elevation="2"
                      fab
                      class="white mr-2 my-1"
                      x-small
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="deleteItem(item)"
                    >
                      <v-icon color="red">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>ลบ</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-flex>

          <v-flex xs12 md12>
            <v-container fill-height fluid>
              <v-card primary-title class="justify-center text-center">
                <v-window v-model="onboarding" reverse>
                  <v-window-item v-for="n in length" :key="`card-${n}`">
                    <viewer :images="images" class="images clearfix">
                      <img :src="images[index]" class="image" />
                    </viewer>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-container>
          </v-flex>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  props: ["machine"],
  data: () => ({
    images: [],
    index: 0,
    length: 0,
    onboarding: 0,
    active_tab: 0,
    image: "",
    search: "",
    // urldefualt: "http://192.168.14.22:8000/",
    urldefualt: process.env.VUE_APP_URL,
    headers: [
      {
        text: "ลำดับ",
        value: "orders",
        sortable: false,
        width: "2%",
        align: "center",
      },
      {
        text: "รายการ",
        value: "name",
        width: "30%",
        align: "left",
        sortable: false,
      },
      {
        text: "จำนวน",
        value: "number",
        sortable: false,
        width: "2%",
        align: "center",
      },
      {
        text: "หน่วย",
        value: "unit",
        sortable: false,
        width: "2%",
        align: "center",
      },
      {
        text: "รหัสสินค้า",
        value: "idproduct",
        width: "10%",

        sortable: false,
        align: "center",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        width: "8%",
        align: "center",
      },
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
      number: "",
    },
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
      var newarray = this.listimage.filter((el) => {
        return el.index == val;
      });
      this.index = val;
      // console.log("arraytest  " + newarray[0].id);
      // this.image = "";
      // this.image = `${this.urldefualt}api/images/`.concat(
      //   this.listimage[val].pathimage
      // );
    },
  },
  computed: {
    ...mapGetters({
      listmachinedetails: "tpm/listmachinedetailsall",
      listimage: "tpm/listimages",
      resultdialog: "ui/resultdialog",
      activetab: "ui/resultactive",
    }),
  },
  mounted() {
    if (this.listimage.length != 0) {
      this.image = `${this.urldefualt}api/images/`.concat(
        this.listimage[0].pathimage
      );
      this.images.push(
        `${this.urldefualt}api/images/`.concat(this.listimage[0].pathimage)
      );
      console.log("this.images", this.images);
      this.length = this.listimage.length;
    }
  },
  methods: {
    itemRowBackground: function(item) {
      let num = item.index % 2;
      return num === 1
        ? "cyan lighten-5 !important;"
        : "cyan lighten-4 !important;";
    },
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
        class: "confirm",
      });
      this.$store.commit("ui/set_activetab", "tatabledetails");
    },
    confirmdelete(value) {
      if (this.activetab == "tatabledetails") {
        if (value.resultdialogs == true) {
          // ลบข้อมูลทั่วไป
          this.$store
            .dispatch("tpm/deletedetailsmachine", this.machinedetail)
            .then((res) => {
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
                  text: error,
                },
                {
                  root: true,
                }
              );
              this.error = true;
            });
        }
      }
    },
  },
};
</script>

<style scoped>
.image {
  width: 300px;
  height: 400px;
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}

@media screen and (max-width: 320) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 480) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 600) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 768px) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}

.v-data-table >>> span {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.v-text-field >>> label {
  font-size: 1em;
  font-weight: bold;
  color: black;
}
.v-data-table >>> .v-data-table-header {
  background-color: #3d3333;
}
.v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
