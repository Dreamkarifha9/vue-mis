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
                  แผนบำรุงรักษา
                </v-card-title>
              </v-sheet>
            </v-container>
            <v-slide-x-transition mode="out-in">
              <plantable
                v-if="tabindex === 1"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                @receivedata="ondata_receive"
              ></plantable>
              <planmachine
                v-else-if="tabindex === 2"
                :tab_index="tabindex"
                @receivedatadetails="onchangetab"
                @ondatadetails_receive="ondatadetails_receive"
                :machinedetails="editmachinedetails_data"
                :machine="editmachine_data"
              ></planmachine>
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
import plantable from "../components/Plan/plantable";
import Dialog from "../components/ui/dialogconfirm";
import planmachine from "../components/Plan/plandetaillmachin";
export default {
  data: () => {
    return {
      search: "",
      tabindex: 1,
      editmachine_data: {},
      editmachinedetails_data: {}
    };
  },
  methods: {
    onchangetab(index) {
      this.tabindex = index;
    },
    async ondata_receive(data) {
      this.editmachine_data = data;
    },
    async ondatadetails_receive(data) {
      this.editmachinedetails_data = data;
    }
  },
  components: {
    plantable,
    Dialog,
    planmachine
  }
};
</script>

<style></style>
