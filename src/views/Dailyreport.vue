<template>
  <v-layout row>
    <v-flex xs12 md12>
      <v-container>
        <v-flex>
          <v-card class="ma-5  mt-8" elevation="7">
            <v-container shaped>
              <v-sheet
                class="mt-n9 mx-auto"
                color="#FFFFFF"
                width="90%"
                elevation="5"
              >
                <v-card-title class="layout justify-center">
                  ข้อมูล Daily Report
                </v-card-title>
              </v-sheet>
            </v-container>
            <v-slide-x-transition mode="out-in">
              <tabledailyreport
                v-if="tabindex === 1"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                @receivedata="ondata_receive"
              ></tabledailyreport>
              <Createdailyreport
                v-else-if="tabindex === 2"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
              ></Createdailyreport>
              <updatedailyreport
                v-else-if="tabindex === 3"
                :tab_index="tabindex"
                :dailyreport="editdailyreportdit_data"
                @changetabindex="onchangetab"
              >
              </updatedailyreport>
              <tablemachineactreport
                v-else-if="tabindex === 4"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
              ></tablemachineactreport>
            </v-slide-x-transition>
          </v-card>
        </v-flex>
      </v-container>
    </v-flex>
    <!-- dialog confirm -->
    <Dialog></Dialog>
  </v-layout>
</template>

<script>
import Createdailyreport from "../components/Dailyreport/createdailyreport";
import tabledailyreport from "../components/Dailyreport/tabledailyreport";
import Dialog from "../components/ui/dialogconfirm";
import updatedailyreport from "../components/Dailyreport/updatedailyreport";
import tablemachineactreport from "../components/Dailyreport/tablemachineactreport";

export default {
  components: {
    Dialog,
    Createdailyreport,
    tabledailyreport,
    updatedailyreport,
    tablemachineactreport,
  },
  data: () => {
    return {
      search: "",
      tabindex: 1,
      editdailyreportdit_data: {},
    };
  },
  methods: {
    onchangetab(index) {
      this.tabindex = index;
    },
    async ondata_receive(data) {
      this.editdailyreportdit_data = data;
    },
  },
};
</script>

<style></style>
