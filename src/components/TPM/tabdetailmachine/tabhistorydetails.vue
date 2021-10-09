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
                item-key="id"
                class="elevation-1"
                :loading="loading"
              >
                <template v-slot:header="{}">
                  <thead class="mobile">
                    <tr>
                      <th colspan="2" class="headerbg"></th>
                      <th colspan="2" class="headerbg"></th>

                      <th colspan="2" class="headerbg text-start">
                        <span>ประเภทงานซ่อม</span>
                      </th>

                      <th colspan="2" class="headerbg"></th>
                    </tr>
                  </thead>
                </template>
                <template v-slot:[`item.pm`]="{ item }">
                  <v-icon color="primary">
                    {{ getConvertCheckIcon_(item.pm) }}
                  </v-icon>
                </template>
                <template v-slot:[`item.breakdown`]="{ item }">
                  <v-icon color="red">
                    {{ getConvertCheckIcon_(item.breakdown) }}
                  </v-icon>
                </template>
                <template v-slot:[`item.createrepair`]="{ item }">
                  {{ getConvertDate(item.createrepair) }}
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
                    <v-text-field
                      v-model="editedItem.cause"
                      label="สาเหตุ/อาการเสีย"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-combobox
                      v-model="selecmachinedetail"
                      :items="listmachinedetails"
                      :item-text="(item) => `${item.name}`"
                      :item-value="(item) => `${item.id}`"
                      return-object
                      label="รายการซ่อม"
                      multiple
                      required
                      outlined
                    ></v-combobox>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="editedItem.detail"
                      label="รายการซ่อม/อื่นๆ"
                      outlined
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      v-model="editedItem.userid"
                      :items="useralls"
                      :item-text="(item) => `${item.name}  ${item.username}`"
                      :item-value="(item) => `${item.user_id}`"
                      required
                      label="ผู้รับรองการซ่อม"
                      outlined
                    ></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6 md4 class="flex row ml-2">
                    <v-checkbox
                      v-model="editedItem.pm"
                      :label="`PM`"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="editedItem.breakdown"
                      class="ml-4"
                      :label="`Breakdown`"
                    ></v-checkbox>
                  </v-flex>

                  <v-flex xs12 sm6 md4 class="ml-1">
                    <v-text-field
                      v-model="editedItem.remarks"
                      label="หมายเหตุ"
                      outlined
                    ></v-text-field>
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
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" locale="th"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-file-input
                      v-model="documentimg"
                      :rules="rules"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="อัพโหลดรูปเอกสารที่เกี่ยวข้อง"
                    ></v-file-input>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-file-input
                      v-model="moreimg"
                      :rules="rules"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera"
                      label="อัพโหลดรูปภาพเพิ่มเติม"
                    ></v-file-input>
                  </v-flex>

                  <v-flex v-if="editedItem.documentimg != null" xs12 sm6 md6>
                    <v-card color="#385F73" dark height="100%">
                      <v-card-title class="text-h5">
                        รูปภาพเอกสารที่เกี่ยวข้อง
                      </v-card-title>

                      <v-card-subtitle
                        >รายละเอียด
                        <v-img
                          height="500px"
                          max-height="500px"
                          lazy-src="https://picsum.photos/id/11/10/6"
                          :src="
                            `${urldefualt}api/sendimagerepairhistory/${editedItem.documentimg}`
                          "
                        ></v-img>
                      </v-card-subtitle>

                      <v-card-actions>
                        <v-btn
                          class="ma-2 red accent-4"
                          color="error"
                          @click.prevent="deletedocumentimg(editedItem)"
                        >
                          <v-icon>mdi-delete</v-icon>
                          ลบรูปภาพ
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                  <v-flex v-if="editedItem.moreimg != null" xs12 sm6 md6>
                    <v-card color="#385F73" dark height="100%">
                      <v-card-title class="text-h5">
                        รูปภาพเพิ่มเติม
                      </v-card-title>

                      <v-card-subtitle>
                        รายละเอียด
                        <v-img
                          height="500px"
                          max-height="1000px"
                          lazy-src="https://picsum.photos/id/11/10/6"
                          :src="
                            `${urldefualt}api/sendimagerepairhistory/${editedItem.moreimg}`
                          "
                        ></v-img>
                      </v-card-subtitle>
                      <v-card-actions>
                        <v-btn
                          class="ma-2 red accent-4"
                          color="error"
                          @click.prevent="deletemoreimg(editedItem)"
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
import moment from "moment";
import { mapGetters, mapState } from "vuex";
export default {
  props: ["machine"],
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    documentimg: null,
    selecmachinedetail: [],
    moreimg: null,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "ขนาดไฟล์ต้องมีขนาดน้อยกว่าหรือเท่ากับ 2 MB!",
    ],
    headers: [
      {
        text: "ลำดับ",
        value: "index",
        sortable: true,
        width: "8%",
      },
      {
        text: "วันที่บันทึก",
        value: "createrepair",
        sortable: false,
        width: "8%",
      },
      {
        text: "สาเหตุ/อาการเสีย",
        align: "start",
        sortable: false,
        value: "cause",
        width: "25%",
      },
      // {
      //   text: "รายการซ่อม",
      //   value: "detail",
      //   sortable: false,
      //   width: "25%",
      // },
      {
        text: "ผู้รับรองการซ่อม",
        value: "name",
        sortable: false,
        width: "25%",
      },
      {
        text: "PM",
        value: "pm",
        sortable: false,
        width: "5%",
      },
      {
        text: "BreakDown",
        value: "breakdown",
        sortable: false,
        width: "5%",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        width: "5%",
      },
    ],
    loading: false,
    dialog: false,
    editedIndex: -1,
    editedItem: {
      cause: "",
      detail: "",
      userid: "",
      pm: false,
      breakdown: false,
      documentimg: null,
      moreimg: null,
      remarks: "",
      createrepair: null,
      idmachine: "",
    },
    urldefualt: process.env.VUE_APP_URL,
  }),
  watch: {
    date(val) {
      console.log(val);
      this.editedItem.createrepair = val;
    },
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      listmachinedetails: "tpm/listmachinedetailsall",
      useralls: "user/useralls",
      repairhistorylistall: "repairhistorymachine/listrepairhistorymachines",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    itemsWithIndex() {
      return this.repairhistorylistall.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
  },
  methods: {
    showmodal: function() {
      this.dialog = true;
    },
    getConvertDate: function(date) {
      if (date) {
        return moment(date).format("DD-MM-YYYY");
      }
    },
    getConvertCheckIcon_: function(Input_) {
      if (Input_ == true) {
        return "mdi-checkbox-marked-circle";
      } else {
        return "mdi-close-circle";
      }
    },
    deletedocumentimg(item) {
      this.$store
        .dispatch("repairhistorymachine/deletedocumentimg", item.id)
        .then((res) => {
          this.initialize();
          this.editedItem.documentimg = null;
        })
        .catch((err) => {
          this.$store.commit("LOADER", false);
        });
    },
    deletemoreimg(item) {
      this.$store
        .dispatch("repairhistorymachine/deletemoreimg", item.id)
        .then((res) => {
          this.initialize();
          this.editedItem.moreimg = null;
        })
        .catch((err) => {
          this.$store.commit("LOADER", false);
        });
    },
    clearstate() {
      this.editedItem = {};
      this.selecmachinedetail = [];
      this.documentimg = null;
      this.moreimg = null;
      this.editedIndex = -1;
      this.dialog = false;
    },
    editItem(item) {
      console.log("edititem", item);
      console.log("this.repairhistorylistall", this.repairhistorylistall);
      // this.editedIndex = this.repairhistorylistall.indexOf(item);
      this.editedIndex = this.repairhistorylistall
        .map(function(e) {
          return e.idmachine;
        })
        .indexOf(item.idmachine);
      console.log("this.editedIndex ", this.editedIndex);
      this.editedItem = Object.assign({}, item);

      // copy Object array list รายการซ่อม
      var string = item.machinedetail;
      var array = string.split(",");
      this.listmachinedetails.forEach((e) => {
        array.forEach((a) => {
          if (e.name === a) {
            this.selecmachinedetail.push(Object.assign({}, e));
          }
        });
      });
      this.dialog = true;
    },
    initialize() {
      this.$store
        .dispatch(
          "repairhistorymachine/listrepairhistorymachineall",
          this.machine.idmachine
        )
        .catch((err) => {
          this.$store.commit("LOADER", false);
        });
    },
    MachineHandlerSubmit() {
      if (this.editedIndex == -1) {
        const userId = localStorage.getItem("userId");
        let formDatapic = new FormData();
        let data = [];
        for (let item of this.selecmachinedetail) {
          data.push(item.name);
        }
        if (this.moreimg) {
          console.log("this.moreimg", this.moreimg);

          formDatapic.append("moreimgfiles", this.moreimg, this.moreimg.name);
        }
        if (this.documentimg) {
          formDatapic.append(
            "documentimgfiles",
            this.documentimg,
            this.documentimg.name
          );
        }
        formDatapic.append("cause", this.editedItem.cause);
        formDatapic.append("detail", this.editedItem.detail);
        formDatapic.append("userid", this.editedItem.userid);
        formDatapic.append("pm", this.editedItem.pm);
        formDatapic.append("breakdown", this.editedItem.breakdown);
        formDatapic.append("remarks", this.editedItem.remarks);
        formDatapic.append("createrepair", this.date);
        formDatapic.append("idmachine", this.machine.idmachine);
        formDatapic.append("machinedetail", data.toString());
        formDatapic.append("createby", userId);
        console.log("formDatapic", formDatapic);
        this.$store
          .dispatch(
            "repairhistorymachine/createrepairhistorymachine",
            formDatapic
          )
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
            // this.dialog = false;
            this.initialize();
            this.clearstate();
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
        const userId = localStorage.getItem("userId");
        let formDatapic = new FormData();
        let data = [];
        for (let item of this.selecmachinedetail) {
          data.push(item.name);
        }
        if (this.moreimg) {
          console.log("this.moreimg", this.moreimg);

          formDatapic.append("moreimgfiles", this.moreimg, this.moreimg.name);
        }
        if (this.documentimg) {
          formDatapic.append(
            "documentimgfiles",
            this.documentimg,
            this.documentimg.name
          );
        }
        formDatapic.append("id", this.editedItem.id);
        formDatapic.append("cause", this.editedItem.cause);
        formDatapic.append("detail", this.editedItem.detail);
        formDatapic.append("userid", this.editedItem.userid);
        formDatapic.append("pm", this.editedItem.pm);
        formDatapic.append("breakdown", this.editedItem.breakdown);
        formDatapic.append("remarks", this.editedItem.remarks);
        formDatapic.append("createrepair", this.editedItem.createrepair);
        formDatapic.append("machinedetail", data.toString());
        formDatapic.append("idmachine", this.machine.idmachine);
        formDatapic.append("createby", userId);

        this.$store
          .dispatch(
            "repairhistorymachine/updaterepairhistorymachine",
            formDatapic
          )
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
      }
    },
  },
};
</script>

<style scope>
.no-border {
  border: 0 !important;
}

.border-bottom-1 {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

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
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 480) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 600) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
  .mobile {
    display: none;
  }
}

.v-data-table-header span {
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
}
.v-data-table-header {
  background-color: #3d3333;
}
.headerbg {
  background-color: #3d3333;
}
.headerbg span {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
