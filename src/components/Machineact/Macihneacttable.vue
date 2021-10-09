<template>
  <v-sheet>
    <v-card-title>
      <v-container>
        <v-row>
          <!-- <v-col cols="12" sm="6" md="3">
          <v-autocomplete ref="machinedetailsid" :items="listmachine" :item-text="item => `${item.idmachine} / ${item.namethai}`" :item-value="item => `${item.idmachine}`" v-model="machineact.idmachine"  label="รหัสเครื่องจักร" outlined></v-autocomplete>
        </v-col> -->
          <!-- <v-col cols="12" sm="2">
          <v-autocomplete
            ref="division"
            v-model="seasonmachine.id"
            :items="listseason"
            :item-text="item => `${item.name}`"
            :item-value="item => `${item.id}`"
            label="แผนการผลิต"
            outlined
            @change="(event) => onChangeact(event)"
          ></v-autocomplete>
        </v-col> -->
          <v-col cols="12" sm="3" md="3">
            <v-autocomplete
              ref="machineact"
              v-model="year"
              :items="items"
              :item-text="(item) => `${item.year}`"
              :item-value="(item) => `${item.year}`"
              label="ปีการผลิต"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-btn
              v-if="$can('view_createacttivitymachine')"
              class="primary justify-center"
              px-2
              :disabled="!haserror"
              @click="onSubmitHandle()"
            >
              เริ่มกิจกรรม
            </v-btn>
            <v-btn
              v-if="$can('view_createacttivitymachine')"
              class="primary justify-center ml-4"
              @click="onSubmitHandle1()"
            >
              ค้นหากิจกรรมที่จะสร้าง
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="offset"
              label="เริ่มที่"
              placeholder="Placeholder"
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="limit"
              label="ถึง"
              placeholder="Placeholder"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- <v-row>
        <v-col cols="12" sm="3" md="1">
            <v-btn class="primary justify-center" v-on:click="onSerach()">
            ค้นหาข้อมูล
            </v-btn>
        </v-col>
      </v-row> -->
        <v-data-table
          v-if="listregisteract.length > 0"
          :headers="headers"
          :items="listregisteract"
          sort-by="index"
          :search="search"
          item-key="id"
          class="elevation-"
          :loading="loading"
        >
          <template v-slot:[`item.actions`]="">
            <!-- <v-icon small class="mr-2" color="primary" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" color="success" @click="detailItem(item)">
          mdi-image-filter-vintage
        </v-icon>
 
        <v-icon medium class="mr-2" color="error" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
               !-->
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-card-title>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import { genrateofday } from "./logic/genrateact";

export default {
  data() {
    return {
      haserror: false,
      resultconfirm: false,
      showDialog: false,
      search: "",
      year: "",
      items: [
        {
          year: "2563",
        },
        {
          year: "2564",
        },
        {
          year: "2565",
        },
        {
          year: "2566",
        },
        {
          year: "2567",
        },
        {
          year: "2568",
        },
        {
          year: "2569",
        },
        {
          year: "2570",
        },
        {
          year: "2571",
        },
        {
          year: "2572",
        },
        // { title: "แผนบำรุงรักษา", link: "Plan" },
        // { title: "ประวัติการซ่อม" },
        // { title: "ประสิทธิผลโดยรวมเครื่องจักรOEE" }
      ],
      headers: [
        {
          text: "ลำดับ",
          value: "id",
          sortable: true,
          width: "5%",
        },
        {
          text: "กิจกรรมตรวจเช็ค",
          value: "actdescription",
          sortable: false,
        },
        {
          text: "มาตรฐานการตรวจเช็ค",
          value: "standard",
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
      ],
      loading: false,
      editedIndex: -1,
      machineact: {
        id: "",
        idmachine: "",
      },
      divisionFilterValue: null,
      seasonmachine: {
        id: "",
        name: "",
      },
      offset: 0,
      limit: 0,
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      listregisteract: "registeract/listregisteractmachinegroupids",
      listregisterall: "registeract/listregisteracts",
      listmachine: "tpm/listall",
      resultdialog: "ui/resultdialog",
      listseason: "tpm/listseasons",
    }),
  },
  props: ["tab_index"],
  watch: {
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
    year() {
      this.haserror = true;
    },
  },
  mounted() {
    this.$store.dispatch("registeract/clearregistermachinegroupid");
  },
  methods: {
    onChangeact(val) {
      let machinegroupid = this.listmachine.filter((item) => {
        return item.idmachine == this.machineact.idmachine;
      });

      const payload = {
        machinegroupid: machinegroupid[0].machinegroupid,
        seasonid: val,
      };
      console.log("payload", payload);
      this.$store.dispatch("registeract/listregistermachinegroupid", payload);
    },
    onSubmitHandle1() {
      const offsetlimit = {
        offset: this.offset,
        limit: this.limit,
      };
      this.$store.dispatch("registeract/listregisteractofsetall", offsetlimit);
      console.log(this.listregisterall);
    },
    onSubmitHandle() {
      var data = [];

      const userId = localStorage.getItem("userId");
      for (let item of this.listregisterall) {
        //*** พอได้ กิจกรรมทั้งหมด ให้ ไปหา groupid ใน historymachine และวนลูป เอา idmachine ที่อยู่ในกลุ่มนั้นๆมาเจน */
        let machinegroupid = this.listmachine.filter((items) => {
          return items.machinegroupid == item.machinegroupid;
        });

        for (let itemhistory of machinegroupid) {
          if (item.duratypeid === 1) {
            //รายวัน
            for (let step = 1; step < 13; step++) {
              //วนให้ครบ 12 เดือน
              if (step === 2) {
                if (this.daysInMonth(this.getyear(), step) === 29) {
                  data.push({
                    actid: item.id,
                    actyear: this.year,
                    actmonth: step,
                    d1: ["P", ""],
                    d2: ["P", ""],
                    d3: ["P", ""],
                    d4: ["P", ""],
                    d5: ["P", ""],
                    d6: ["P", ""],
                    d7: ["P", ""],
                    d8: ["P", ""],
                    d9: ["P", ""],
                    d10: ["P", ""],
                    d11: ["P", ""],
                    d12: ["P", ""],
                    d13: ["P", ""],
                    d14: ["P", ""],
                    d15: ["P", ""],
                    d16: ["P", ""],
                    d17: ["P", ""],
                    d18: ["P", ""],
                    d19: ["P", ""],
                    d20: ["P", ""],
                    d21: ["P", ""],
                    d22: ["P", ""],
                    d23: ["P", ""],
                    d24: ["P", ""],
                    d25: ["P", ""],
                    d26: ["P", ""],
                    d27: ["P", ""],
                    d28: ["P", ""],
                    d29: ["P", ""],
                    d30: ["P", ""],
                    d31: ["P", ""],
                    update_by: userId,
                    idmachine: itemhistory.idmachine,
                    season_id: item.season_id,
                  });
                } else {
                  data.push({
                    actid: item.id,
                    actyear: this.year,
                    actmonth: step,
                    d1: ["P", ""],
                    d2: ["P", ""],
                    d3: ["P", ""],
                    d4: ["P", ""],
                    d5: ["P", ""],
                    d6: ["P", ""],
                    d7: ["P", ""],
                    d8: ["P", ""],
                    d9: ["P", ""],
                    d10: ["P", ""],
                    d11: ["P", ""],
                    d12: ["P", ""],
                    d13: ["P", ""],
                    d14: ["P", ""],
                    d15: ["P", ""],
                    d16: ["P", ""],
                    d17: ["P", ""],
                    d18: ["P", ""],
                    d19: ["P", ""],
                    d20: ["P", ""],
                    d21: ["P", ""],
                    d22: ["P", ""],
                    d23: ["P", ""],
                    d24: ["P", ""],
                    d25: ["P", ""],
                    d26: ["P", ""],
                    d27: ["P", ""],
                    d28: ["P", ""],
                    d29: ["P", ""],
                    d30: ["P", ""],
                    d31: ["P", ""],
                    update_by: userId,
                    idmachine: itemhistory.idmachine,
                    season_id: item.season_id,
                  });
                }
              } else {
                data.push({
                  actid: item.id,
                  actyear: this.year,
                  actmonth: step,
                  d1: ["P", ""],
                  d2: ["P", ""],
                  d3: ["P", ""],
                  d4: ["P", ""],
                  d5: ["P", ""],
                  d6: ["P", ""],
                  d7: ["P", ""],
                  d8: ["P", ""],
                  d9: ["P", ""],
                  d10: ["P", ""],
                  d11: ["P", ""],
                  d12: ["P", ""],
                  d13: ["P", ""],
                  d14: ["P", ""],
                  d15: ["P", ""],
                  d16: ["P", ""],
                  d17: ["P", ""],
                  d18: ["P", ""],
                  d19: ["P", ""],
                  d20: ["P", ""],
                  d21: ["P", ""],
                  d22: ["P", ""],
                  d23: ["P", ""],
                  d24: ["P", ""],
                  d25: ["P", ""],
                  d26: ["P", ""],
                  d27: ["P", ""],
                  d28: ["P", ""],
                  d29: ["P", ""],
                  d30: ["P", ""],
                  d31: ["P", ""],
                  update_by: userId,
                  idmachine: itemhistory.idmachine,
                  season_id: item.season_id,
                });
              }
            }
          } else if (item.duratypeid === 2) {
            //รายวีค
            for (let step = 1; step < 13; step++) {
              data.push({
                actid: item.id,
                actyear: this.year,
                actmonth: step,
                d1: ["P", ""],
                d2: ["E", ""],
                d3: ["E", ""],
                d4: ["E", ""],
                d5: ["E", ""],
                d6: ["E", ""],
                d7: ["E", ""],
                d8: ["E", ""],
                d9: ["E", ""],
                d10: ["E", ""],
                d11: ["E", ""],
                d12: ["E", ""],
                d13: ["E", ""],
                d14: ["E", ""],
                d15: ["E", ""],
                d16: ["P", ""],
                d17: ["E", ""],
                d18: ["E", ""],
                d19: ["E", ""],
                d20: ["E", ""],
                d21: ["E", ""],
                d22: ["E", ""],
                d23: ["E", ""],
                d24: ["E", ""],
                d25: ["E", ""],
                d26: ["E", ""],
                d27: ["E", ""],
                d28: ["E", ""],
                d29: ["E", ""],
                d30: ["E", ""],
                d31: ["E", ""],
                update_by: userId,
                idmachine: itemhistory.idmachine,
                season_id: item.season_id,
              });
            }
          } else if (item.duratypeid === 3) {
            //รายเดือน
            for (let step = 1; step < 13; step++) {
              data.push({
                actid: item.id,
                actyear: this.year,
                actmonth: step,
                d1: ["E", ""],
                d2: ["E", ""],
                d3: ["E", ""],
                d4: ["E", ""],
                d5: ["E", ""],
                d6: ["E", ""],
                d7: ["E", ""],
                d8: ["E", ""],
                d9: ["E", ""],
                d10: ["E", ""],
                d11: ["E", ""],
                d12: ["E", ""],
                d13: ["E", ""],
                d14: ["E", ""],
                d15: ["P", ""],
                d16: ["E", ""],
                d17: ["E", ""],
                d18: ["E", ""],
                d19: ["E", ""],
                d20: ["E", ""],
                d21: ["E", ""],
                d22: ["E", ""],
                d23: ["E", ""],
                d24: ["E", ""],
                d25: ["E", ""],
                d26: ["E", ""],
                d27: ["E", ""],
                d28: ["E", ""],
                d29: ["E", ""],
                d30: ["E", ""],
                d31: ["E", ""],
                update_by: userId,
                idmachine: itemhistory.idmachine,
                season_id: item.season_id,
              });
            }
          } else if (item.duratypeid === 4) {
            //รายปี
            data.push({
              actid: item.id,
              actyear: this.year,
              actmonth: "1",
              d1: ["E", ""],
              d2: ["E", ""],
              d3: ["E", ""],
              d4: ["E", ""],
              d5: ["E", ""],
              d6: ["E", ""],
              d7: ["E", ""],
              d8: ["E", ""],
              d9: ["E", ""],
              d10: ["E", ""],
              d11: ["E", ""],
              d12: ["E", ""],
              d13: ["E", ""],
              d14: ["E", ""],
              d15: ["P", ""],
              d16: ["E", ""],
              d17: ["E", ""],
              d18: ["E", ""],
              d19: ["E", ""],
              d20: ["E", ""],
              d21: ["E", ""],
              d22: ["E", ""],
              d23: ["E", ""],
              d24: ["E", ""],
              d25: ["E", ""],
              d26: ["E", ""],
              d27: ["E", ""],
              d28: ["E", ""],
              d29: ["E", ""],
              d30: ["E", ""],
              d31: ["E", ""],
              update_by: userId,
              idmachine: itemhistory.idmachine,
              season_id: item.season_id,
            });
          } else if (item.duratypeid === 6) {
            // รายสัปดาห์
            for (let step = 1; step < 13; step++) {
              data.push({
                actid: item.id,
                actyear: this.year,
                actmonth: step,
                d1: ["E", ""],
                d2: ["E", ""],
                d3: ["E", ""],
                d4: ["E", ""],
                d5: ["E", ""],
                d6: ["E", ""],
                d7: ["P", ""],
                d8: ["E", ""],
                d9: ["E", ""],
                d10: ["E", ""],
                d11: ["E", ""],
                d12: ["E", ""],
                d13: ["E", ""],
                d14: ["P", ""],
                d15: ["P", ""],
                d16: ["E", ""],
                d17: ["E", ""],
                d18: ["E", ""],
                d19: ["E", ""],
                d20: ["E", ""],
                d21: ["P", ""],
                d22: ["E", ""],
                d23: ["E", ""],
                d24: ["E", ""],
                d25: ["E", ""],
                d26: ["E", ""],
                d27: ["E", ""],
                d28: ["P", ""],
                d29: ["E", ""],
                d30: ["E", ""],
                d31: ["E", ""],
                update_by: userId,
                idmachine: itemhistory.idmachine,
                season_id: item.season_id,
              });
            }
          } else if (item.duratypeid === 7) {
            // ราย 2 เดือน
            for (let step = 1; step < 13; step += 2) {
              data.push({
                actid: item.id,
                actyear: this.year,
                actmonth: step,
                d1: ["E", ""],
                d2: ["E", ""],
                d3: ["E", ""],
                d4: ["E", ""],
                d5: ["E", ""],
                d6: ["E", ""],
                d7: ["E", ""],
                d8: ["E", ""],
                d9: ["E", ""],
                d10: ["E", ""],
                d11: ["E", ""],
                d12: ["E", ""],
                d13: ["E", ""],
                d14: ["E", ""],
                d15: ["P", ""],
                d16: ["E", ""],
                d17: ["E", ""],
                d18: ["E", ""],
                d19: ["E", ""],
                d20: ["E", ""],
                d21: ["E", ""],
                d22: ["E", ""],
                d23: ["E", ""],
                d24: ["E", ""],
                d25: ["E", ""],
                d26: ["E", ""],
                d27: ["E", ""],
                d28: ["E", ""],
                d29: ["E", ""],
                d30: ["E", ""],
                d31: ["E", ""],
                update_by: userId,
                idmachine: itemhistory.idmachine,
                season_id: item.season_id,
              });
            }
          } else if (item.duratypeid === 8) {
            for (let step = 1; step < 13; step += 3) {
              data.push({
                actid: item.id,
                actyear: this.year,
                actmonth: step,
                d1: ["E", ""],
                d2: ["E", ""],
                d3: ["E", ""],
                d4: ["E", ""],
                d5: ["E", ""],
                d6: ["E", ""],
                d7: ["E", ""],
                d8: ["E", ""],
                d9: ["E", ""],
                d10: ["E", ""],
                d11: ["E", ""],
                d12: ["E", ""],
                d13: ["E", ""],
                d14: ["E", ""],
                d15: ["P", ""],
                d16: ["E", ""],
                d17: ["E", ""],
                d18: ["E", ""],
                d19: ["E", ""],
                d20: ["E", ""],
                d21: ["E", ""],
                d22: ["E", ""],
                d23: ["E", ""],
                d24: ["E", ""],
                d25: ["E", ""],
                d26: ["E", ""],
                d27: ["E", ""],
                d28: ["E", ""],
                d29: ["E", ""],
                d30: ["E", ""],
                d31: ["E", ""],
                update_by: userId,
                idmachine: itemhistory.idmachine,
                season_id: item.season_id,
              });
            }
          }
        }
      }
      console.log("data", data);
      this.$store
        .dispatch("machineact/addmachineact", data)
        .then((res) => {
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "info",
              showing: true,
              timeout: 2000,
              text: "บันทึกข้อมูลสำเร็จ !!",
            },
            {
              root: true,
            }
          );
        })
        .catch((err) => {
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "error",
              showing: true,
              timeout: 10000,
              text: `รหัสเครื่องจักรนี้ได้ถูกเจนไปแล้ว`,
            },
            {
              root: true,
            }
          );
        });
    },
    daysInMonth: function(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getyear() {
      return new Date().getUTCFullYear();
    },
    onSerach(tab) {
      let machinegroupid = this.listmachine.filter((item) => {
        return item.idmachine == this.machineact.idmachine;
      });

      const payload = {
        machinegroupid: machinegroupid[0].machinegroupid,
        seasonid: this.seasonmachine.id,
      };
      this.$store.dispatch("registeract/listregistermachinegroupid", payload);
      // this.$emit("changetabindex", tab);
    },
    initialize() {
      this.$store.dispatch("tpm/listmachineAll").then((res) => {
        this.$store.dispatch("tpm/listseason");
      });
      this.$store.dispatch("registeract/listregisteractall");
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

<style></style>
