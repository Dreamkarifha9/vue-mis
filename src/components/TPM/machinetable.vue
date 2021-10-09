<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md6>
        <v-btn
          v-if="$can('view_createmachinetpm')"
          class="ma-2 blue darken-4"
          color="primary"
          @click="onchangetabCreate(2)"
        >
          <v-icon px-2>mdi mdi-plus-circle</v-icon>เพิ่มข้อมูล
        </v-btn>
      </v-flex>

      <v-flex xs12 md3>
        <v-autocomplete
          v-model="divisionFilterValue"
          label="ค้นหาตามแผนก"
          :items="listdivision"
          :item-value="(item) => `${item.id}`"
          :item-text="(item) => `${item.divisionname}`"
          outlined
          single-line
          hide-details
          @change="divisionFilter()"
        ></v-autocomplete>
      </v-flex>
      <v-flex xs12 md3 px-2>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาทั้งหมด"
          outlined
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
    </v-card-title>
    <v-container>
      <v-data-table
        dense
        :headers="headers"
        :items="itemsWithIndex"
        :items-per-page="15"
        :class="responsive"
        sort-by="index"
        :search="search"
        item-key="id"
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-icon
            v-if="$can('view_editmachinetpm')"
            small
            class="mr-2"
            color="primary"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon> -->
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
                elevation="4"
                fab
                class="mr-2"
                color="success"
                x-small
                v-bind="attrs"
                v-on="on"
                @click="detailItem(item)"
              >
                <v-icon color="grey lighten-5">
                  mdi-image-filter-vintage
                </v-icon>
              </v-btn>
            </template>
            <span>รายละเอียด</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import LocalStorageService from "../../service/LocalStorageService";

export default {
  data() {
    return {
      resultconfirm: false,
      showDialog: false,
      search: "",
      headers: [
        {
          text: "ลำดับ",
          value: "index",
          sortable: true,
          width: "8%",
        },
        {
          text: "หมายเลขเครื่อง",
          align: "start",
          sortable: false,
          value: "idmachine",
          width: "30%",
        },
        {
          text: "ชื่อเครื่องจักร",
          value: "namethai",
          sortable: false,
          width: "30%",
        },
        // {
        //   text: "ขนาด",
        //   value: "sizename",
        //   sortable: false
        // },
        // {
        //   text: "Capacity",
        //   value: "capacityname",
        //   sortable: false
        // },
        // {
        //   text: "Power",
        //   value: "powername",
        //   sortable: false
        // },
        {
          text: "แผนก",
          value: "divisionname",
          width: "20%",
          // filter: this.divisionFilter
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      loading: false,
      editedIndex: -1,
      editmachine: {
        idmachine: "",
        namethai: "",
        nameeng: "",
        sizemachine: "",
        capacity: "",
        power: "",
        division: "",
        point: "",
        model: "",
        nummachine: "",
        usejob: "",
        capability: "",
        manufacturer: "",
        machineinclude: "",
        genration: "",
        energy: "",
      },
      divisionFilterValue: null,
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      listmachine: "tpm/listall",
      resultdialog: "ui/resultdialog",
      listdivision: "tpm/listdivisions",
    }),
    itemsWithIndex() {
      return this.listmachine.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
  props: ["tab_index"],
  watch: {
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
  },
  methods: {
    itemRowBackground: function(item) {
      let num = item.index % 2;
      return num === 1
        ? "cyan lighten-5 !important;"
        : "cyan lighten-4 !important;";
    },
    responsive: function() {},
    divisionFilter() {
      // If this filter has no value we just skip the entire filter.

      this.divisionFilterValue != 0
        ? this.$store.dispatch(
            "tpm/listdivisionallbyid",
            this.divisionFilterValue
          )
        : this.$store.dispatch("tpm/listmachineAll");

      if (!this.divisionFilterValue) {
        return true;
      }
      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return this.divisionFilterValue;
    },
    Getdivision() {},
    onchangetabCreate(tab) {
      this.$emit("changetabindex", tab);
    },
    initialize() {
      this.$store.dispatch("tpm/listmachineFristpage").catch((err) => {
        this.$store.commit("LOADER", false);
      });
      this.$store.dispatch("tpm/listsizemachine").catch((err) => {
        this.$store.commit("LOADER", false);
      });
      this.$store.dispatch("tpm/listcapacitymachine").catch((err) => {
        this.$store.commit("LOADER", false);
      });
      this.$store.dispatch("tpm/listpowermachine").catch((err) => {
        this.$store.commit("LOADER", false);
      });
      this.$store.dispatch("tpm/listdivision").catch((err) => {
        this.$store.commit("LOADER", false);
      });
      this.$store.dispatch("tpm/listseason").catch((err) => {
        this.$store.commit("LOADER", false);
      });
    },
    editItem(item) {
      // go to updateform customer (tabindex=3)
      this.$emit("changetabindex", 3);

      this.editedIndex = this.listmachine.indexOf(item);
      this.editmachine = Object.assign({}, item);
      this.$emit("receivedata", this.editmachine);
    },
    detailItem(item) {
      this.$emit("changetabindex", 4);
      this.editedIndex = this.listmachine.indexOf(item);
      this.editmachine = Object.assign({}, item);
      var currentyear = LocalStorageService.getYear();
      var Obj = {
        idmachine: this.editmachine.idmachine,
        year: currentyear,
      };
      console.log("Obj", Obj);
      this.$store
        .dispatch("tpm/listmachinedetails", this.editmachine.idmachine)
        .catch((err) => {
          this.$store.commit("LOADER", false);
        });
      console.log("this.editmachine.idmachine", this.editmachine.idmachine);
      this.$store
        .dispatch("tpm/getimages", this.editmachine.idmachine)
        .catch((err) => {
          this.$store.commit("LOADER", false);
        });

      //*** โหลดข้อมูลการทำกิจกรรมของเครื่องจักรนั้นๆ ถ้า season1 ไม่สำเร็จ ให้โหลด season2 ต่อได้เลย*/
      this.$store
        .dispatch("machineact/listactseason1", Obj)
        .then((res) => {
          this.$store
            .dispatch("machineact/listactseason2", Obj)
            .catch((err) => {
              this.$store.commit("LOADER", false);
            });
        })
        .catch((err) => {
          this.$store
            .dispatch("machineact/listactseason2", Obj)
            .catch((err) => {
              this.$store.commit("LOADER", false);
            });
          console.log("err");
          this.$store.commit("LOADER", false);
        });
      this.$store.dispatch("user/loadUserall");
      this.$store.dispatch("ncr/listncrfristpage", this.editmachine.idmachine);
      // this.$store.dispatch("machineact/listactseason2", Obj).catch((err) => {
      //   this.$store.commit("LOADER", false);
      // });
      // this.$store.dispatch(
      //   "machineact/listactseason1",
      //   this.editmachine.idmachine
      // );
      // this.$store.dispatch(
      //   "machineact/listactseason2",
      //   this.editmachine.idmachine
      // );
      this.$emit("receivedata", this.editmachine);
    },
    deleteItem(item) {
      this.editedIndex = this.listmachine.indexOf(item);
      this.editmachine = Object.assign({}, item);

      this.$store.commit("ui/set_dialog", {
        display: true,
        text: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
        header: "แจ้งเตือน",
        class: "confirm",
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    confirmdelete(value) {
      if (value.resultdialogs == true) {
        this.$store
          .dispatch("tpm/deletemachine", this.editmachine)
          .then((res) => {
            this.$store.dispatch("tpm/listmachine");
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
    },
  },
};
</script>

<style scoped>
.style-1 {
  background-color: rgb(215, 215, 44);
}
.style-2 {
  background-color: rgb(114, 114, 67);
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

.v-data-table >>> .v-data-table-header {
  background-color: #212121;
}
.headerbg {
  background-color: #212121;
}
.headerbg span {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}
.v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
