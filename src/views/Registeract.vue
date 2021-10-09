<template>
<v-layout row>
  <v-flex xs12 md12>
    <v-container>
      <v-flex>
        <v-card class="ma-5  mt-8" elevation="7">
          <v-container shaped>
            <v-sheet class="mt-n9 mx-auto" color="#FFFFFF" width="90%" elevation="5">
              <v-card-title class="layout justify-center">
                ข้อมูลกิจกรรม
              </v-card-title>
            </v-sheet>
          </v-container>
          <v-slide-x-transition mode="out-in">
            <registeracttable v-if="tabindex === 1" :tab_index="tabindex" @changetabindex="onchangetab" @receivedata="ondata_receive"></registeracttable>
            <Registeract v-else-if="tabindex === 2" :tab_index="tabindex" @changetabindex="onchangetab"></Registeract>
            <updateregister v-else-if="tabindex === 3" :tab_index="tabindex" @changetabindex="onchangetab" :registeract="editregister_data"></updateregister>
            <!-- <detaillmachine v-else-if="tabindex === 4" :tab_index="tabindex" @receivedatadetails="onchangetab" :machinedetails="editmachinedetails_data" :machine="editmachine_data"></detaillmachine> -->
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
import Registeract from "../components/Registeract/createregister";
import registeracttable from "../components/Registeract/registeracttable";
import Dialog from "../components/ui/dialogconfirm";
import updateregister from "../components/Registeract/updateregister";
import detaillmachine from "../components/TPM/detaillmachine";
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

      console.log('ondata_receive', data)
      this.editregister_data = data;
    }
  },
  components: {
    Registeract,
    registeracttable,
    Dialog,
    updateregister
  }
};
</script>

<style></style>
