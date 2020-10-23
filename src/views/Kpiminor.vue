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
                  ข้อมูลKPIรอง
                </v-card-title>
              </v-sheet>
            </v-container>
            <v-slide-x-transition mode="out-in">
              <tablekpiminor
                v-if="tabindex === 1"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                @receivedata="ondata_receive"
              ></tablekpiminor>
              <Createkpiminor
                v-else-if="tabindex === 2"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
              ></Createkpiminor>
              <updatekpiminor
                v-else-if="tabindex === 3"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                :kpiminor="editkapiminoredit_data"
              >
              </updatekpiminor>
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
import Createkpiminor from "../components/Kpiminor/createkpiminor";
import tablekpiminor from "../components/Kpiminor/tablekpiminor";
import Dialog from "../components/ui/dialogconfirm";
import updatekpiminor from "../components/Kpiminor/updatekpiminor";
export default {
  data: () => {
    return {
      search: "",
      tabindex: 1,
      editkapiminoredit_data: {}
    };
  },
  methods: {
    onchangetab(index) {
      this.tabindex = index;
    },
    async ondata_receive(data) {
      this.editkapiminoredit_data = data;
    }
  },
  components: {
    Dialog,
    Createkpiminor,
    tablekpiminor,
    updatekpiminor
  }
};
</script>

<style></style>
