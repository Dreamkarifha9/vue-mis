<template>
<v-layout row>
  <v-flex xs12 md12>
    <v-container>
      <v-flex>
        <v-card class="ma-5  mt-8" elevation="7">
          <v-container shaped>
            <v-sheet class="mt-n9 mx-auto" color="#FFFFFF" width="90%" elevation="5">
              <v-card-title class="layout justify-center">
                User Manager
              </v-card-title>
            </v-sheet>
          </v-container>
          <v-slide-x-transition mode="out-in">
            <Usertable v-if="tabindex === 1" :tab_index="tabindex" @changetabindex="onchangetab" @receivedata="ondata_receive"></Usertable>
            <Userregister v-else-if="tabindex === 2" :tab_index="tabindex" @changetabindex="onchangetab"></Userregister>
            <Useredit v-else-if="tabindex === 3" :tab_index="tabindex"  :user="edituser_data" @changetabindex="onchangetab"></Useredit>
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
import Usertable from "../components/User/Usertable";
import Userregister from "../components/User/Register";
import Useredit from "../components/User/Useredit";


import Dialog from "../components/ui/dialogconfirm";
export default {
  data: () => {
    return {
      search: "",
      tabindex: 1,
      edituser_data: {}
    };
  },
  methods: {
    onchangetab(index) {
      this.tabindex = index;
    },
    async ondata_receive(data) {
      this.edituser_data = data;
    }
  },
  components: {
    Usertable,
    Userregister,
    Dialog,
    Useredit
  }
};
</script>

<style></style>
