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
                  Department Manager
                </v-card-title>
              </v-sheet>
            </v-container>
            <v-slide-x-transition mode="out-in">
              <DivisionTable
                v-if="tabindex === 1"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
                @receivedata="ondata_receive"
              ></DivisionTable>
              <Divisioncreate
                v-else-if="tabindex === 2"
                :tab_index="tabindex"
                @changetabindex="onchangetab"
              ></Divisioncreate>
              <Divisionedit
                v-else-if="tabindex === 3"
                :tab_index="tabindex"
                :division="editdivision_data"
                @changetabindex="onchangetab"
              ></Divisionedit>
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
import DivisionTable from "../components/Division/divisiontable";
import Divisioncreate from "../components/Division/divisioncreate";
import Divisionedit from "../components/Division/divisionupdate";

import Dialog from "../components/ui/dialogconfirm";
export default {
  components: {
    DivisionTable,
    Divisioncreate,
    Dialog,
    Divisionedit,
  },
  data: () => {
    return {
      search: "",
      tabindex: 1,
      editdivision_data: {},
    };
  },
  methods: {
    onchangetab(index) {
      this.tabindex = index;
    },
    async ondata_receive(data) {
      this.editdivision_data = data;
    },
  },
};
</script>

<style></style>
