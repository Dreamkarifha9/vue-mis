<template>
  <v-card flat class="mx-auto" max-width="auto">
    <v-container>
      <v-row justify="start">
        <v-btn
          class="ma-2 mt-5 md:mt-5 blue darken-4"
          color="primary"
          @click.prevent="showmodal()"
        >
          <v-icon px-2>mdi mdi-plus-circle</v-icon>เพิ่มข้อมูล
        </v-btn>
        <v-chip
          class="ma-2 mt-3"
          large
          color="grey darken-4"
          label
          text-color="white"
        >
          <v-icon left>
            mdi-label
          </v-icon>
          {{ `${machine.namethai}/${machine.idmachine}` }}
        </v-chip>
        <v-dialog v-model="dialog" persistent max-width="1600">
          <template v-slot:activator="{}">
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
          </template>

          <v-card>
            <v-card-title class="text-h5">
              {{ formTitle }}
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-file-input
                      v-model="ncrimg"
                      multiple
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="รูปภาพ"
                    ></v-file-input>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-menu
                      :close-on-content-click="true"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="date"
                          label="วันที่"
                          prepend-icon="event"
                          outlined
                          readonly
                          v-bind="attrs"
                          :disabled="editedIndex == -1 ? false : true"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" locale="th"></v-date-picker>
                    </v-menu>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.detail"
                      label="รายละเอียด"
                      outlined
                    ></v-text-field>
                  </v-flex>

                  <v-flex
                    v-for="item in listimgencr"
                    v-if="editedIndex == 0"
                    :key="item.id"
                    xs12
                    sm6
                    md6
                  >
                    <v-card color="#385F73" dark height="100%">
                      <v-card-title class="text-h5">
                        รูปภาพประกอบ
                      </v-card-title>

                      <v-card-subtitle
                        >รายละเอียด
                        <v-img
                          height="500px"
                          max-height="500px"
                          lazy-src="https://picsum.photos/id/11/10/6"
                          aspect-ratio="1.7"
                          :src="`${urldefualt}api/imagesncr/${item.patimg}`"
                        ></v-img>
                      </v-card-subtitle>

                      <v-card-actions>
                        <v-btn
                          class="ma-2 red accent-4"
                          color="error"
                          @click.prevent="deleteimg(item.id, item.ncr_id)"
                        >
                          <v-icon>mdi-delete</v-icon>
                          ลบรูปภาพ
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                class="ma-2 green accent-4"
                color="success"
                @click.prevent="MachineHandlerSubmit()"
              >
                <v-icon>mdi mdi-content-save</v-icon>
                <span class="pl-2">
                  บันทึก
                </span>
              </v-btn>

              <v-btn
                class="ma-2 red accent-4"
                color="error"
                @click="clearstate()"
              >
                <span class="material-icons">
                  reply
                </span>
                <span class="pl-2">
                  ยกเลิก
                </span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      loading: false,
      dialog: false,
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
          width: "7%",
        },
        {
          text: "รายละเอียด",
          align: "start",
          sortable: false,
          value: "detail",
          width: "35%",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          width: "5%",
        },
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        datecurrent: "",
        create_date: "",
        create_by: "",
        update_date: "",
        update_by: "",
        ncrimg: [],
        detail: "",
      },
      ncrimg: [],
      divisionFilterValue: null,
      urldefualt: process.env.VUE_APP_URL,
    };
  },
  computed: {
    ...mapGetters({
      listncralls: "ncr/listncralls",
      resultdialog: "ui/resultdialog",
      listimgencr: "ncr/listimgencrs",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsWithIndex() {
      return this.listncralls.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
  props: ["tab_index", "machine"],
  watch: {
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
  },
  methods: {
    showmodal() {
      this.dialog = true;
    },
    clearstate() {
      Object.assign(this.editedItem, {});
      this.ncrimg = null;
      this.editedIndex = -1;
      this.dialog = false;
      console.log("this.listimgencr", this.listimgencr);
    },
    initialize() {
      this.$store.dispatch("ncr/listncrfristpage", this.machine.idmachine);
    },
    ondivision_dailyreportall: function() {
      this.$store.dispatch("dailyreport/listdailyreport");
    },
    datecurrentfindOne: function(item) {
      this.$store.dispatch("dailyreport/getdailyreportone", item);
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
    MachineHandlerSubmit() {
      if (this.editedIndex == -1) {
        /// Edit Ncr
        const userId = localStorage.getItem("userId");
        let formDatapic = new FormData();
        let uuid = this.uuidv4();

        if (this.ncrimg) {
          console.log("this.ncrimg", this.ncrimg);
          for (let file of this.ncrimg) {
            console.log("file", file);
            formDatapic.append("files", file, file.name);
            formDatapic.append("pathname", "uploadncr/" + file.name);
            formDatapic.append("create_by", userId);
            formDatapic.append("uuid", uuid);
            formDatapic.append("create_by", userId);
            formDatapic.append("idmachine", this.machine.idmachine);
          }
        }
        const formData = {
          datecurrent: this.date,
          id: uuid,
          create_by: userId,
          idmachine: this.machine.idmachine,
          detail: this.editedItem.detail,
        };
        console.log("formDatapic", formDatapic);
        console.log("formData", formData);

        this.$store
          .dispatch("ncr/addncr", formData)
          .then((res) => {
            this.$store
              .dispatch("ncr/createimagesncr", formDatapic)
              .then((res) => {
                this.$store.dispatch(
                  "snackbar/setSnackbar",
                  {
                    color: "info",
                    showing: true,
                    timeout: 2000,
                    text: "บันทึกข้อมูลสำเร็จ !!",
                  },
                  { root: true }
                );
                this.dialog = false;
                this.initialize();
                this.clearstate();
              });
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
              { root: true }
            );

            this.error = true;
          });
      } else {
        // Create NCR New
        const userId = localStorage.getItem("userId");
        var formDatapic = new FormData();
        if (this.ncrimg) {
          console.log("this.ncrimg", this.ncrimg);
          for (let file of this.ncrimg) {
            console.log("file", file);
            formDatapic.append("files", file, file.name);
            formDatapic.append("pathname", "uploadncr/" + file.name);
            formDatapic.append("create_by", userId);
            formDatapic.append("uuid", this.editedItem.id);
            formDatapic.append("create_by", userId);
            formDatapic.append("idmachine", this.machine.idmachine);
          }
        }

        console.log("formDatapic", formDatapic);

        this.$store.dispatch("ncr/createimagesncr", formDatapic).then((res) => {
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "info",
              showing: true,
              timeout: 2000,
              text: "บันทึกข้อมูลสำเร็จ !!",
            },
            { root: true }
          );
          this.dialog = false;
          this.initialize();
          this.clearstate();
        });
      }
    },
    editItem(item) {
      console.log("edititem", item);
      console.log("this.listncralls", this.listncralls);

      this.editedIndex = this.listncralls
        .map(function(e) {
          return e.id;
        })
        .indexOf(item.id);
      // this.editedIndex = this.listncralls.indexOf(item);
      console.log("this.editedIndex ", this.editedIndex);

      this.$store.dispatch("ncr/getimages", item.id);

      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteimg(item, idncr) {
      this.$store
        .dispatch("ncr/deletencrimages", item)
        .then((res) => {
          // ลบข้อมูลเสดให้ reload ncrimage ใหม่
          this.$store.dispatch("ncr/getimages", idncr);
          this.editedItem.ncrimg = null;
        })
        .catch((err) => {
          this.$store.commit("LOADER", false);
        });
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
  },
};
</script>

<style scoped>
.img {
  width: 100%;
  height: 100%;
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

.v-data-table >>> .v-data-table-header span {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}
.v-data-table >>> .v-data-table-header {
  background-color: #3d3333;
}
.v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
