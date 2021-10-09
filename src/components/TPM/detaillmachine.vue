<template>
  <v-sheet>
    <v-container>
      <v-btn class="ma-2 red accent-4" color="error" @click="onChange_tabIndex">
        <v-icon>mdi mdi-undo-variant</v-icon>
        กลับ
      </v-btn>
      <v-btn
        v-if="activetabs == 'tab-2' && $can('view_createmachinetpm')"
        class="ma-2 blue darken-4"
        color="primary"
        @click="onAddtab"
      >
        <v-icon>mdi-plus-circle</v-icon>
        เพิ่มประวัติ
      </v-btn>
      <v-btn
        v-if="activetabs == 'tab-2' && $can('view_createmachinetpm')"
        class="ma-2 blue darken-4"
        color="primary"
        @click="onAddtabimage"
      >
        <v-icon>mdi-plus-circle</v-icon>
        เพิ่มรูปภาพเครื่องจักร
      </v-btn>
      <!-- <v-btn  class="ma-2" color="primary" v-on:click="onAddtabimageplan" v-if="activetabs == 'tab-2' && $can('view_createmachinetpm')">
      <v-icon>mdi-plus-circle</v-icon>
      เพิ่มรูปภาพแผน
    </v-btn>
    <v-btn class="ma-2" color="primary" v-on:click="onAddtabhistoryimg" v-if="activetabs == 'tab-2' && $can('view_createmachinetpm')">
      <v-icon>mdi-plus-circle</v-icon>
      เพิ่มรูปประวัติการซ่อม
    </v-btn>
    <v-btn class="ma-2" color="primary" v-on:click="onAddtabsavepm" v-if="activetabs == 'tab-2' && $can('view_createmachinetpm')">
      <v-icon>mdi-plus-circle</v-icon>
      บันทึกผล PM
    </v-btn> -->

      <v-tabs
        v-model="activetabs"
        background-color="grey darken-4"
        center-active
        dark
      >
        <v-tab
          v-for="item in items"
          :key="item.value"
          :href="'#tab-' + item.value"
        >
          {{ item.label }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="activetabs" :touchless="true">
        <v-tab-item :value="'tab-1'">
          <tabmachine :machine="machine"></tabmachine>
        </v-tab-item>
        <v-tab-item :value="'tab-2'">
          <tabtabledetails
            :machine="machine"
            @ondatadetails_receive="ondatadetails_receive"
          ></tabtabledetails>
        </v-tab-item>
        <v-tab-item :value="'tab-3'">
          <planrepair :machine="machine"></planrepair>
        </v-tab-item>
        <v-tab-item :value="'tab-4'">
          <planproduct :machine="machine"></planproduct>
        </v-tab-item>
        <v-tab-item :value="'tab-5'">
          <tabhistory :machine="machine"></tabhistory>
        </v-tab-item>
        <v-tab-item :value="'tab-6'">
          <tabmachinedetails
            :machine="machine"
            @onsavedetail_receive="onsavedetail_receive"
          ></tabmachinedetails>
        </v-tab-item>
        <v-tab-item :value="'tab-7'">
          <tabmachinupdate
            :machinedetails="editmachinedetails_data"
            @onsavedetail_receive="onsavedetail_receive"
          ></tabmachinupdate>
        </v-tab-item>
        <v-tab-item :value="'tab-8'">
          <tabmachineimage :machine="machine"></tabmachineimage>
        </v-tab-item>
        <v-tab-item :value="'tab-9'">
          <planimages :machine="machine"></planimages>
        </v-tab-item>
        <v-tab-item :value="'tab-10'">
          <tabcreatehistory :machine="machine"></tabcreatehistory>
        </v-tab-item>
        <v-tab-item :value="'tab-11'">
          <tabsavepm></tabsavepm>
        </v-tab-item>
        <v-tab-item :value="'tab-12'">
          <tabncr :machine="machine"></tabncr>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-sheet>
</template>

<script>
import tabmachine from "../../components/TPM/tabdetailmachine/tabmachine";
import tabtabledetails from "../../components/TPM/tabdetailmachine/tabtabledetails";
import planrepair from "../../components/TPM/tabdetailmachine/planrepair";
import planproduct from "../../components/TPM/tabdetailmachine/planproduct";
import tabmachinedetails from "../../components/TPM/tabdetailmachine/tabmachinedetails";
import tabmachinupdate from "../../components/TPM/tabdetailmachine/tabmachineupdate";
import tabmachineimage from "../../components/TPM/tabdetailmachine/tabmachineimage";
import planimages from "../../components/TPM/tabdetailmachine/planimage";
import tabhistory from "../../components/TPM/tabdetailmachine/tabhistorydetails";
import tabcreatehistory from "../../components/TPM/tabdetailmachine/tabcreatehistory";
import tabsavepm from "../../components/TPM/tabdetailmachine/tabsavepm";
import tabncr from "../../components/TPM/tabdetailmachine/ncr";

import { mapGetters, mapState } from "vuex";
export default {
  components: {
    tabmachine,
    tabtabledetails,
    planrepair,
    planproduct,
    tabmachinedetails,
    tabmachinupdate,
    tabmachineimage,
    planimages,
    tabhistory,
    tabcreatehistory,
    tabsavepm,
    tabncr,
  },
  props: ["tab_index", "machine", "machinedetails"],
  data: () => ({
    items: [
      {
        label: "รายละเอียดเครื่องจักร",
        value: 1,
      },
      {
        label: "ชิ้นส่วนอะไหล่",
        value: 2,
      },
      {
        label: "แผนช่วงซ่อม",
        value: 3,
      },
      {
        label: "แผนช่วงผลิต",
        value: 4,
      },
      {
        label: "ประวัติการซ่อม",
        value: 5,
      },
      {
        label: "NCR",
        value: 12,
      },
    ],
    editmachinedetails_data: {},
    activetabs: "tab-1",
    loader: null,
    loading: false,
    urldefualt: "http://192.168.14.22:8000/",
    resultconfirm: false,
    showDialog: false,
    search: "",
  }),
  computed: {
    ...mapGetters({
      listsizename: "tpm/listsizenames",
      listcapacityname: "tpm/listcapacitynames",
      listpowername: "tpm/listpowernames",
      listmachinedetails: "tpm/listmachinedetailsall",
      listimage: "tpm/listimages",
      listdivision: "tpm/listdivisions",
    }),
  },
  watch: {
    activetabs(value) {
      // ลบ tabs active id = 5
      if (
        this.items.length == 7 &&
        value != "tab-6" &&
        value != "tab-7" &&
        value != "tab-8" &&
        value != "tab-9" &&
        value != "tab-10" &&
        value != "tab-11"
      ) {
        let indextabs = this.items.findIndex((c) => c.value == 6);
        this.items.splice(indextabs, 1);
      }
    },
  },
  methods: {
    async ondatadetails_receive(data) {
      this.editmachinedetails_data = data;
      this.items.push({
        label: "แก้ไขประวัติเครื่องจักร",
        value: 7,
      });
      this.activetabs = "tab-7";
    },
    async onsavedetail_receive() {
      this.activetabs = "tab-2";
    },
    async onChange_tabIndex() {
      this.$emit("receivedatadetails", 1);
    },
    onAddtab() {
      this.items.push({
        label: "เพิ่มประวัติเครื่องจักร",
        value: 6,
      });
      this.activetabs = "tab-6";
    },
    onAddtabhistoryimg() {
      this.items.push({
        label: "เพิ่มรูปภาพประวัติการซ่อม",
        value: 10,
      });
      this.activetabs = "tab-10";
    },
    onAddtabsavepm() {
      this.items.push({
        label: "บันทึกผล PM",
        value: 11,
      });
      this.activetabs = "tab-11";
    },
    onAddtabimageplan() {
      this.items.push({
        label: "เพิ่มรูปภาพแผน",
        value: 9,
      });
      this.activetabs = "tab-9";
    },
    onAddtabimage() {
      this.items.push({
        label: "เพิ่มรูปภาพเครื่องจักร",
        value: 8,
      });
      this.activetabs = "tab-8";
    },
    isNumber(evt) {
      evt = evt || window.event;
      let charCode = evt.which || evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.v-slide-group__content >>> .v-tab .v-tab--active {
  background-color: rgb(215, 215, 44);
}

.v-tab,
.v-tab:hover {
  font-size: 1rem;

  color: white;
}
</style>
