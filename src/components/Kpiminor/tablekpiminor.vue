<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md8>
        <v-btn class="primary" @click="onchangetabCreate(2)">
          <v-icon px-2>mdi mdi-plus-circle</v-icon>เพิ่มข้อมูล
        </v-btn>
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาทั้งหมด"
          single-line
          hide-details
        ></v-text-field>
      </v-flex>
    </v-card-title>
    <v-container>
      <v-data-table
        dense
        :headers="headers"
        :items="listkpiminor"
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
          <v-icon small class="mr-2" color="primary" @click="editItem(item)">
            mdi-pencil
          </v-icon>
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
          width: "90%",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "8%",
        },
      ],
      editedIndex: -1,
      kpiminoredit: {
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
      listkpiminor: "kpiminor/listkpiminoralls",
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
      this.$store.dispatch("kpiminor/listkpiminorall").catch((err) => {
        this.$store.commit("LOADER", false);
      });
    },
    editItem(item) {
      // go to updateform customer (tabindex=3)
      this.$emit("changetabindex", 3);

      this.editedIndex = this.listkpiminor.indexOf(item);
      this.kpiminoredit = Object.assign({}, item);
      this.$store.dispatch("kpiminor/getimages", this.kpiminoredit.id);

      this.$emit("receivedata", this.kpiminoredit);
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

<style></style>
