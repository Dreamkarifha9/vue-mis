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
                  ข้อมูลKPIหลัก
                </v-card-title>
              </v-sheet>
            </v-container>
            <v-slide-x-transition mode="out-in">
              <tablekpi
                v-if="tabindex === 1"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                @receivedata="ondata_receive"
              ></tablekpi>
              <Createkpimain
                v-else-if="tabindex === 2"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
              ></Createkpimain>
              <updatekpimain
                v-else-if="tabindex === 3"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                :kpimain="editkapimainedit_data"
              >
              </updatekpimain>
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
import Createkpimain from "../components/Kpimain/createkpimain";
import tablekpi from "../components/Kpimain/tablekpi";
import Dialog from "../components/ui/dialogconfirm";
import updatekpimain from "../components/Kpimain/updatekpimain";
export default {
  data: () => {
    return {
      search: "",
      tabindex: 1,
      editkapimainedit_data: {}
    };
  },
  methods: {
    onchangetab(index) {
      this.tabindex = index;
    },
    async ondata_receive(data) {
      this.editkapimainedit_data = data;
    }
  },
  components: {
    Createkpimain,
    tablekpi,
    Dialog,
    updatekpimain
  }
};
</script>

<style></style>
