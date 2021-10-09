<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          แก้ไขข้อมูลกิจกรรม</v-card-subtitle
        >
      </v-flex>
    </v-card-title>
    <v-container>
      <v-form
        ref="form"
        v-model="formHasErrors"
        @submit.prevent="MachineHandlerSubmit()"
      >
        <v-row>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="machinegroupid"
              v-model="machinegroup"
              disabled
              :items="listmachinegroup"
              :item-text="(item) => `${item.name}`"
              :item-value="(item) => `${item.id}`"
              :error-messages="errorMessages"
              :rules="[() => !!machinegroup || '*']"
              required
              label="กลุ่มเครื่องจักร"
              outlined
              @change="(event) => onChange(event)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              v-model="txtidmachine"
              :items="listmachinegroupid"
              disabled
              :item-text="(item) => `${item.idmachine}`"
              label="ชื่อเครื่องจักร"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="machinedetailsid"
              v-model="machinedetailsid"
              disabled
              :items="listmachindetails"
              :item-text="
                (item) => `${item.idmachine} - ${item.orders} - ${item.name}`
              "
              :item-value="(item) => `${item.id}`"
              :error-messages="errorMessages"
              :rules="[() => !!registeract.machinedetailsid || '*']"
              required
              label="ชิ้นส่วนอะไหล่"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="description"
              v-model="registeract.actdescription"
              :rules="[() => !!registeract.actdescription || '*']"
              :error-messages="errorMessages"
              label="กิจกรรมตรวจเช็ค"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="standard"
              v-model="registeract.standard"
              :rules="[() => !!registeract.standard || '*']"
              :error-messages="errorMessages"
              label="มาตรฐานการตรวจเช็ค"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          class="ma-2 green accent-4"
          :loading="loading"
          :disabled="!formHasErrors"
          color="success"
          type="submit"
        >
          <v-icon>mdi mdi-content-save</v-icon>
          บันทึกข้อมูล
        </v-btn>
        <v-btn
          class="ma-2 red accent-4"
          color="error"
          @click="onChange_tabIndex"
        >
          <v-icon>mdi mdi-undo</v-icon>
          กลับ
        </v-btn>
      </v-form>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["tab_index", "registeract", "images"],
  data: () => ({
    items: [
      { id: 1, value: "ปกติ/ไม่ปกติ" },
      { id: 2, value: "ใส่ตัวเลข" },
    ],
    itemsdate: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ],
    itemsyear: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    formHasErrors: true,
    errorMessages: null,
    loader: null,
    loading: false,
    selected: null,
    selecteddate: null,
    selectmonth: null,
    checkyearcombobox: false,
    txtidmachine: "",
    registeractRules: [
      (v) => !!v || "*",
      (v) => (v && v.length >= 6) || "กรุณากรอกรหัสกิจกรรม",
    ],
    seasonmachine: {
      id: "",
      name: "",
    },
  }),
  computed: {
    ...mapGetters({
      listmachinegroup: "machinegroup/listmachinegroups",
      listcapacityname: "tpm/listcapacitynames",
      listmachinegroupid: "tpm/listmachinegroupbyid",
      listduratype: "duratype/listduratypes",
      listmachindetails: "tpm/listmachinedetailsall",
      listseason: "tpm/listseasons",
    }),
    machinedetailsid: {
      get() {
        let data = `${this.registeract.machinedetailsid}`;
        return data;
      },
      set(newVlue) {
        return newVlue.id;
      },
    },
    machinegroup: {
      get() {
        let data = `${this.registeract.machinegroupid}`;
        return data;
      },
      set(newVlue) {
        return newVlue.id;
      },
    },
    form() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        description: this.registeract.description,
        duratypeid: this.registeract.duratypeid,
        machinedetailsid: this.registeract.machinedetailsid,
      };
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
    registeract() {},
    listmachinegroupid() {
      var data = [];
      for (let item of this.listmachinegroupid) {
        data.push(item.idmachine);
      }
      this.txtidmachine = this.listmachinegroupid[0].idmachine;
      this.$store.dispatch("tpm/listmachinedetailbyid", data);
    },
  },
  created() {
    this.$store
      .dispatch("tpm/listmachinegroupbyid", this.registeract.machinegroupid)
      .then((res) => {});
  },
  methods: {
    async onChange(val) {
      this.$store.dispatch("tpm/listmachinegroupbyid", val);
    },
    async onChange_tabIndex() {
      this.$emit("changetabindex", 1);
    },
    async MachineHandlerSubmit() {
      const formData = {
        description: this.registeract.actdescription,
        standard: this.registeract.standard,
        id: this.registeract.id,
      };
      // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
      this.$store
        .dispatch("registeract/updateregisteract", formData)
        .then((res) => {
          // this.$store.dispatch("customer/listcustomer");
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "info",
              showing: true,
              timeout: 2000,
              text: "บันทึกข้อมูลสำเร็จ !!",
            },
            { root: true }
          );
          // clear element
          // Object.keys(this.form).forEach(f => {
          //   this.$refs[f].reset();
          // });
          this.onChange_tabIndex();
        })
        .catch((error) => {
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "error",
              showing: true,
              timeout: 3000,
              text: error,
            },
            { root: true }
          );

          this.error = true;
        });
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

<style></style>
