<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md8>
        <div>
          <v-btn
            ml-6
            class="blue darken-4"
            color="primary"
            @click="onchangetabCreate(2)"
          >
            <v-icon px-2>mdi mdi-plus-circle</v-icon>เพิ่มข้อมูล
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาทั้งหมด"
          outlined
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
      <!-- <v-flex xs12 md2>
      <div>
        <v-btn  class="primary btn" v-on:click="ondivision_dailyreportall()">
          <v-icon px-2>mdi-account-search</v-icon>ค้นหาข้อมูลรวมทั้งหมด
        </v-btn>
      </div>
    </v-flex> -->
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top color="black">
            <template v-slot:activator="{ on, attrs }">
              <div class="my-1">
                <v-btn
                  elevation="2"
                  fab
                  class="teal"
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
              </div>
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
          sortable: false,
          width: "2%",
        },
        {
          text: "แผนก",
          align: "start",
          sortable: false,
          value: "divisionname",
          width: "100%",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "10%",
        },
      ],
      editedIndex: -1,
      division: {
        id: "",
        divisionname: "",
      },
      divisionFilterValue: null,
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      listdivision: "division/listdivisions",
      resultdialog: "ui/resultdialog",
    }),
    itemsWithIndex() {
      return this.listdivision.map((items, index) => ({
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
      this.$store.dispatch("dailyreport/listuser");
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
      this.$store.dispatch("division/listdivisionall");
    },
    editItem(item) {
      // go to updateform customer (tabindex=3)
      this.$emit("changetabindex", 3);

      this.editedIndex = this.listdivision.indexOf(item);
      this.division = Object.assign({}, item);
      console.log("this.division", this.division);
      this.$emit("receivedata", this.division);
    },
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
