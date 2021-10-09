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
                  ทำกิจกรรมย้อนหลัง
                </v-card-title>
              </v-sheet>
            </v-container>
            <v-slide-x-transition mode="out-in">
              <tablemachineactreport_security
                v-if="tabindex === 1"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                @receivedata="ondata_receive"
              ></tablemachineactreport_security>
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
import tablemachineactreport_security from "../components/Dailyreport/tablemachineactreport_security.vue";
import Dialog from "../components/ui/dialogconfirm";
export default {
  components: {
    tablemachineactreport_security,
    Dialog,
  },
  data: () => {
    return {
      search: "",
      tabindex: 1,
      editregister_data: {},
    };
  },
  methods: {
    onchangetab(index) {
      this.tabindex = index;
    },
    async ondata_receive(data) {
      this.editregister_data = data;
    },
  },
};
</script>

<style></style>
