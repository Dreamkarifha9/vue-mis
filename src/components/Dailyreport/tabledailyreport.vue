<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md10 pl-2>
        <v-btn
          v-if="$can('view_createdailyreport')"
          class="blue darken-4"
          color="primary"
          @click="onchangetabCreate(2)"
        >
          <v-icon px-2>mdi mdi-plus-circle</v-icon>เพิ่มข้อมูล
        </v-btn>

        <v-btn
          v-if="$can('view_readdailyreport')"
          class="blue darken-4 ml-2"
          color="primary"
          @click="ondivision_dailyreportall()"
        >
          <v-icon px-2>mdi-account-search</v-icon>ค้นหาข้อมูลรวมทั้งหมด
        </v-btn>
      </v-flex>

      <v-flex xs12 md2>
        <v-menu
          :close-on-content-click="true"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="ค้นหาตามวันที่"
              prepend-icon="event"
              outlined
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            locale="th"
            @change="datecurrentfindOne(date)"
          ></v-date-picker>
        </v-menu>
        <!-- <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหาทั้งหมด" single-line hide-details></v-text-field> -->
      </v-flex>
    </v-card-title>
    <v-container>
      <v-data-table
        dense
        :headers="headers"
        :items="itemsWithIndex"
        :items-per-page="15"
        sort-by="index"
        :search="search"
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:[`item.datecurrent`]="{ item }">
          {{ getConvertDate(item.datecurrent) }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top color="black">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="
                  $can('view_editdailyreport') || $can('view_readdailyreport')
                "
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
          <!-- <v-icon medium class="mr-2" color="error" @click="deleteItem(item)">
            mdi-delete
          </v-icon> -->
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
import moment from "moment";
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      resultconfirm: false,
      showDialog: false,
      search: "",
      headers: [
        {
          text: "ลำดับ",
          value: "index",
          sortable: true,
          width: "2%",
        },
        {
          text: "วันที่",
          align: "start",
          sortable: false,
          value: "datecurrent",
          width: "50%",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "8%",
        },
      ],
      editedIndex: -1,
      dailyreportedit: {
        id: "",
        datecurrent: "",
        create_date: "",
        create_by: "",
        update_date: "",
        update_by: "",
      },
      divisionFilterValue: null,
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      listdailyreport: "dailyreport/listdailyreportalls",
      resultdialog: "ui/resultdialog",
    }),
    itemsWithIndex() {
      return this.listdailyreport.map((items, index) => ({
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
    ondivision_dailyreportall: function() {
      this.$store.dispatch("dailyreport/listdailyreport");
    },
    datecurrentfindOne: function(item) {
      this.$store.dispatch("dailyreport/getdailyreportone", item);
    },
    itemRowBackground: function(item) {
      let num = item.index % 2;

      return num === 1
        ? "cyan lighten-5 !important;"
        : "cyan lighten-4 !important;";
    },
    getConvertDate: function(date) {
      if (date) {
        return moment(date).format("DD-MM-YYYY");
      }
    },
    divisionFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.divisionFilterValue) {
        return true;
      }

      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return value === this.divisionFilterValue;
    },
    Getdivision() {},
    onchangetabCreate(tab) {
      this.$emit("changetabindex", tab);
    },
    initialize() {
      this.$store.dispatch("dailyreport/listdailyreportfristpage");
    },
    editItem(item) {
      // go to updateform customer (tabindex=3)
      this.$emit("changetabindex", 3);
      console.log("item", item);
      console.log("listdailyreport", this.listdailyreport);

      this.editedIndex = this.listdailyreport.indexOf(item);
      this.dailyreportedit = Object.assign({}, item);
      console.log("showid", this.dailyreportedit.id);
      this.$store.dispatch("dailyreport/getimages", this.dailyreportedit.id);

      this.$emit("receivedata", this.dailyreportedit);
    },
    // detailItem(item) {
    //   this.$emit("changetabindex", 4);
    //   this.editedIndex = this.listmachine.indexOf(item);
    //   this.editmachine = Object.assign({}, item);
    //   this.$store
    //     .dispatch("tpm/listmachinedetails", this.editmachine.idmachine)
    //     .then(() => {
    //       this.$store.dispatch("tpm/getimages", this.editmachine.idmachine);
    //     })
    //     .then(() => {
    //       this.$store.dispatch("tpm/getimagesplan", this.editmachine.idmachine); //Read images All in one
    //     });

    //   this.$emit("receivedata", this.editmachine);
    // },
    // deleteItem(item) {
    //   console.log(this.listmachine.indexOf(item));
    //   this.editedIndex = this.listmachine.indexOf(item);
    //   this.editmachine = Object.assign({}, item);

    //   this.$store.commit("ui/set_dialog", {
    //     display: true,
    //     text: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
    //     header: "แจ้งเตือน",
    //     class: "confirm"
    //   });
    // },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
