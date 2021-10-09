<template>
  <v-sheet>
    <v-card-title>
      <!-- <v-flex xs12 md5>
        <v-btn class="primary" v-on:click="onchangetabCreate(2)"
          ><v-icon px-2>mdi mdi-plus-circle</v-icon>เพิ่มข้อมูล</v-btn
        >
      </v-flex> -->
      <!-- <v-flex xs12 md3>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ค้นหาทั้งหมด"
          single-line
          hide-details
        ></v-text-field>
      </v-flex> -->
      <v-flex xs12 md4></v-flex>
      <v-flex xs12 md3>
        <v-autocomplete
          label="ค้นหาตามแผนก"
          :items="listdivision"
          :item-value="item => `${item.divisionname}`"
          :item-text="item => `${item.divisionname}`"
          v-model="divisionFilterValue"
          single-line
          hide-details
        ></v-autocomplete>
      </v-flex>
    </v-card-title>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="listmachine"
        sort-by="index"
        :search="search"
        item-key="id"
        class="elevation-"
        loading
        loading-text="Loading... Please wait"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <!-- <v-icon small class="mr-2" color="primary" @click="editItem(item)">
            mdi-pencil
          </v-icon> -->
          <v-icon small class="mr-2" color="success" @click="detailItem(item)">
            mdi-image-filter-vintage
          </v-icon>
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

export default {
  created() {
    this.initialize();
  },
  data() {
    return {
      resultconfirm: false,
      showDialog: false,
      search: "",
      headers: [
        { text: "ลำดับ", value: "index", sortable: true, width: "2%" },
        {
          text: "หมายเลขเครื่อง",
          align: "start",
          sortable: true,
          value: "idmachine",
          width: "10%"
        },
        { text: "ชื่อเครื่องจักร", value: "namethai", sortable: false },

        {
          text: "แผนก",
          value: "divisionname",
          filter: this.divisionFilter,
          width: "10%"
        },
        { text: "Actions", value: "actions", sortable: false, width: "5%" }
      ],
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
        energy: ""
      },
      divisionFilterValue: null
    };
  },
  computed: {
    ...mapGetters({
      listmachine: "tpm/listall",
      resultdialog: "ui/resultdialog",
      listdivision: "tpm/listdivisions"
    })
  },
  props: ["tab_index"],
  watch: {
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    }
  },
  methods: {
    divisionFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.divisionFilterValue) {
        return true;
      }

      // Check if the current loop value (The calories value)
      // equals to the selected value at the <v-select>.
      return value === this.divisionFilterValue;
    },
    Getdivision() {
   
    },
    onchangetabCreate(tab) {
      this.$emit("changetabindex", tab);
    },
    initialize() {
      this.$store.dispatch("tpm/listmachine");
      this.$store.dispatch("tpm/listdivision");
      this.$store.dispatch("tpm/listseason");
    },
    editItem(item) {
      // go to updateform customer (tabindex=3)
      this.$emit("changetabindex", 3);

      this.editedIndex = this.listmachine.indexOf(item);
      this.editmachine = Object.assign({}, item);
      this.$emit("receivedata", this.editmachine);
    },
    detailItem(item) {
      this.$emit("changetabindex", 2);
      this.editedIndex = this.listmachine.indexOf(item);
      this.editmachine = Object.assign({}, item);
      this.$store
        .dispatch("tpm/listmachinedetails", this.editmachine.idmachine)
        .then(() => {
          this.$store.dispatch("tpm/getimagesplan", this.editmachine.idmachine); //Read images All in one
        });
      this.$emit("receivedata", this.editmachine);
    },
    deleteItem(item) {

      this.editedIndex = this.listmachine.indexOf(item);
      this.editmachine = Object.assign({}, item);

      this.$store.commit("ui/set_dialog", {
        display: true,
        text: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
        header: "แจ้งเตือน",
        class: "confirm"
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
          .then(res => {
            this.$store.dispatch("tpm/listmachine");
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
};
</script>

<style></style>
