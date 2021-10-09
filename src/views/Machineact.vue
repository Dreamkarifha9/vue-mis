<template>
<v-layout row>
  <v-flex xs12 md12>
    <v-container>
      <v-flex>
        <v-card class="ma-5  mt-8" elevation="7">
          <v-container shaped>
            <v-sheet class="mt-n9 mx-auto" color="#FFFFFF" width="90%" elevation="5">
              <v-card-title class="layout justify-center">
                เริ่มกิจกรรม
              </v-card-title>
            </v-sheet>
          </v-container>
          <v-slide-x-transition mode="out-in">
            <Machinetable v-if="tabindex === 1" :tab_index="tabindex" @changetabindex="onchangetab" @receivedata="ondata_receive"></Machinetable>
  
            <!--<updatemachine v-else-if="tabindex === 3" :tab_index="tabindex" @changetabindex="onchangetab" :machine="editmachine_data"></updatemachine>
            <detaillmachine v-else-if="tabindex === 4" :tab_index="tabindex" @receivedatadetails="onchangetab" :machinedetails="editmachinedetails_data" :machine="editmachine_data"></detaillmachine>-->
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
import Machinetable from "../components/Machineact/Macihneacttable";
import Dialog from "../components/ui/dialogconfirm";
export default {
  data: () => {
    return {
      search: "",
      tabindex: 1,
      editregister_data: {}
    };
  },
  methods: {
    onchangetab(index) {
      this.tabindex = index;
    },
    async ondata_receive(data) {
      this.editregister_data = data;
    }
  },
  components: {
    Machinetable,
    Dialog,
  }
};
</script>

<style></style>
