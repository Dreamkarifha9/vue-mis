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
                  ข้อมูลเครื่องจักร
                </v-card-title>
              </v-sheet>
            </v-container>
            <v-slide-x-transition mode="out-in">
              <machinetable
                v-if="tabindex === 1"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                @receivedata="ondata_receive"
              ></machinetable>
              <Registermachine
                v-else-if="tabindex === 2"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
              ></Registermachine>
              <updatemachine
                v-else-if="tabindex === 3"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                :machine="editmachine_data"
              ></updatemachine>
              <detaillmachine
                v-else-if="tabindex === 4"
                :tab_index="tabindex"
                @receivedatadetails="onchangetab"
                :machinedetails="editmachinedetails_data"
                :machine="editmachine_data"
              ></detaillmachine>
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
import Registermachine from "../components/TPM/createmachine";
import machinetable from "../components/TPM/machinetable";
import Dialog from "../components/ui/dialogconfirm";
import updatemachine from "../components/TPM/updatemachine";
import detaillmachine from "../components/TPM/detaillmachine";
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
    }
  },
  components: {
    Registermachine,
    machinetable,
    Dialog,
    updatemachine,
    detaillmachine
  }
};
</script>

<style></style>
