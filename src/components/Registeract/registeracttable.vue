<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md1>
        <v-btn
          v-if="$can('view_createacttivitymachine')"
          class="blue darken-4"
          color="primary"
          @click="onchangetabCreate(2)"
        >
          <v-icon px-2>mdi mdi-plus-circle</v-icon>เพิ่มข้อมูล
        </v-btn>
      </v-flex>
      <v-flex xs12 md8>
        <div>
          <v-btn
            v-if="$can('view_readacttivitymachine')"
            class="blue darken-4"
            color="primary"
            @click="ondivision_registerall()"
          >
            <v-icon px-2>mdi-account-search</v-icon>ค้นหาข้อมูลรวมทั้งหมด
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs12 md2>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นตามคำ"
          single-line
          outlined
          hide-details
        ></v-text-field>
      </v-flex>
    </v-card-title>
    <v-container>
      <v-data-table
        dense
        :headers="headers"
        :items="listregisteract"
        :items-per-page="15"
        sort-by="index"
        :search="search"
        item-key="id"
        class="elevation-"
        :loading="loading"
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
          <!-- <v-icon small class="mr-2" color="success" @click="detailItem(item)">
          mdi-image-filter-vintage
        </v-icon> -->

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
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      resultconfirm: false,
      showDialog: false,
      search: "",
      headers: [
        {
          text: "ลำดับ",
          value: "id",
          sortable: true,
          width: "8%",
        },
        {
          text: "รายละเอียด",
          value: "actdescription",
          sortable: false,
        },
        {
          text: "ประเภทเครื่องจักร",
          value: "machinegroupname",
          sortable: false,
        },
        {
          text: "จำนวนวัน",
          value: "dura_day",
          sortable: false,
        },
        {
          text: "ประเภทวัน/เดือน/ปี",
          value: "description",
          sortable: false,
        },
        {
          text: "ชื่อเครื่องจักร",
          value: "name",
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      loading: false,
      editedIndex: -1,
      registeract: {
        id: "",
      },
      divisionFilterValue: null,
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      listregisteract: "registeract/listregisteracts",
      listmachindetails: "tpm/listmachinedetailsall",
      resultdialog: "ui/resultdialog",
    }),
  },
  props: ["tab_index"],
  watch: {
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
  },
  methods: {
    ondivision_registerall: function() {
      this.$store.dispatch("registeract/listregisteractall");
    },
    itemRowBackground: function(item) {
      let num = item.id % 2;
      return num === 1
        ? "cyan lighten-5 !important;"
        : "cyan lighten-4 !important;";
    },
    addtest() {
      let data = [
        [
          "TEST03",
          "เช็คความร้อน",
          1,
          true,
          "2020-12-08 08:17:33.719",
          "462d1b6c-2704-49f1-a1bf-c615e34ae999",
          "test",
          {
            Result: false,
          },
          1,
          null,
          "1. โกเวอร์เนอร์วาล์วต้องไม่มรอยรั่วของไอน้ำ",
        ],
        [
          "TEST04",
          "เช็คความร้อน1",
          1,
          true,
          "2020-12-08 08:17:33.719",
          "462d1b6c-2704-49f1-a1bf-c615e34ae879",
          "test",
          {
            Result: false,
          },
          1,
          null,
          "1. โกเวอร์เนอร์วาล์วต้องไม่มรอยรั่วของไอน้ำ",
        ],
      ];
      let data1 = [];
      for (let item of data) {
        data1.push(item);
      }

      this.$store.dispatch("registeract/testadd", data1);
    },
    divisionFilter() {
      // If this filter has no value we just skip the entire filter.

      this.$store.dispatch("tpm/listmachinfinbyid", this.divisionFilterValue);
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
    async initialize() {
      this.$store
        .dispatch("registeract/listregisteractfristpage")
        .catch((err) => {
          this.$store.commit("LOADER", false);
        });
      this.$store
        .dispatch("machinegroup/listremachinegroupall")
        .catch((err) => {
          this.$store.commit("LOADER", false);
        });
      this.$store.dispatch("duratype/listduratypealll").catch((err) => {
        this.$store.commit("LOADER", false);
      });
      this.$store.dispatch("tpm/listseason").catch((err) => {
        this.$store.commit("LOADER", false);
      });
    },
    editItem(item) {
      // go to updateform customer (tabindex=3)
      this.$emit("changetabindex", 3);
      this.editmachine = Object.assign({}, item);
      this.$emit("receivedata", this.editmachine);
    },
    detailItem(item) {
      this.$emit("changetabindex", 4);
      this.editedIndex = this.listmachine.indexOf(item);
      this.editmachine = Object.assign({}, item);
      this.$store
        .dispatch("tpm/listmachinedetails", this.editmachine.idmachine)
        .then(() => {
          this.$store.dispatch("tpm/getimages", this.editmachine.idmachine);
        })
        .then(() => {
          this.$store.dispatch("tpm/getimagesplan", this.editmachine.idmachine); //Read images All in one
        });

      this.$emit("receivedata", this.editmachine);
    },
    deleteItem(item) {
      this.editedIndex = this.listregisteract.indexOf(item);
      this.registeract = Object.assign({}, item);
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
          .dispatch("registeract/deleteregisteract", this.registeract.id)
          .then((res) => {
            this.$store.dispatch("registeract/listregisteractall");
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

/* .v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgb(33, 191, 240);
} */
.v-data-table >>> .v-data-table-header span {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}
.v-data-table >>> .v-data-table-header {
  background-color: #212121;
}
.v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
