<template>
<v-layout row>
  <v-flex xs12 md12>
    <v-container>
      <v-flex>
        <v-card class="ma-5  mt-8" elevation="7">
          <v-container shaped>
            <v-sheet class="mt-n9 mx-auto" color="#FFFFFF" width="90%" elevation="5">
              <v-card-title class="layout justify-center">
                Security
              </v-card-title>
            </v-sheet>
          </v-container>
          <v-slide-x-transition mode="out-in">
            <security v-if="tabindex === 1" :tab_index="tabindex" @changetabindex="onchangetab" @receivedata="ondata_receive"></security>
            <createusermenu v-else-if="tabindex === 2" :tab_index="tabindex" @changetabindex="onchangetab"></createusermenu>
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
import security from "../components/Managerpermission/security";
import createusermenu from "../components/Managerpermission/createusermenu";
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
    security,
    createusermenu,
    Dialog,
  }
};
</script>

<style></style>
