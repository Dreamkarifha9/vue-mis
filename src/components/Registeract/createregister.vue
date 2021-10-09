<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          เพิม่ข้อมูลกิจกรรม
        </v-card-subtitle>
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
              v-model="register.machinegroupid"
              :items="listmachinegroup"
              :item-text="(item) => `${item.name}`"
              :item-value="(item) => `${item.id}`"
              :error-messages="errorMessages"
              :rules="[() => !!register.machinegroupid || '*']"
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
              :item-text="(item) => `${item.idmachine}`"
              label="ชื่อเครื่องจักร"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="machinedetailsid"
              v-model="register.machinedetailsid"
              :items="listmachindetails"
              :item-text="
                (item) => `${item.idmachine} - ${item.orders} - ${item.name}`
              "
              :item-value="(item) => `${item.id}`"
              :error-messages="errorMessages"
              :rules="[() => !!register.machinedetailsid || '*']"
              required
              label="ชิ้นส่วนอะไหล่"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="description"
              v-model="register.description"
              :rules="[() => !!register.description || '*']"
              :error-messages="errorMessages"
              label="กิจกรรมตรวจเช็ค"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="standard"
              v-model="register.standard"
              :rules="[() => !!register.standard || '*']"
              :error-messages="errorMessages"
              label="มาตรฐานการตรวจเช็ค"
              required
              outlined
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="sizemachine"
              :items="items"
              :item-text="item => `${item.text}`"
              :item-value="item => `${item.text}`"
              v-model="sizemachine"
              :rules="[() => !!sizemachine || '*']"
              label="ขนาดเครื่องจักร"
              
              outlined
            ></v-autocomplete>
          </v-col> -->

          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="duratypeid"
              v-model="register.duratypeid"
              :items="listduratype"
              :item-text="(item) => `${item.description}`"
              :item-value="(item) => `${item.id}`"
              :error-messages="errorMessages"
              :rules="[() => !!register.duratypeid || '*']"
              required
              label="ความถี่"
              outlined
              @change="(event) => onChangeduratype(event)"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              v-model="selected"
              :items="items"
              :item-text="(items) => `${items.value}`"
              :item-value="(items) => `${items.id}`"
              :error-messages="errorMessages"
              :rules="[() => !!selected || '*']"
              required
              label="ผลการตรวจเช็คเครื่องจักร"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col v-if="false" cols="12" sm="12" md="4">
            <v-autocomplete
              v-model="selecteddate"
              :items="itemsdate"
              :error-messages="errorMessages"
              :rules="[() => !!selecteddate || '*']"
              required
              label="วันที่จะทำกิจกรรมของเดือน"
              outlined
              @change="(event) => daysInMonth(2020, 2)"
            ></v-autocomplete>
          </v-col>
          <v-col v-if="this.checkyearcombobox" cols="12" sm="12" md="4">
            <v-autocomplete
              v-model="selectmonth"
              :items="itemsyear"
              :error-messages="errorMessages"
              :rules="[() => !!selectmonth || '*']"
              required
              label="เดือนที่ทำกิจกรรมของปี"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4">
            <v-autocomplete
              ref="division"
              v-model="seasonmachine.id"
              :items="listseason"
              :item-text="(item) => `${item.name}`"
              :item-value="(item) => `${item.id}`"
              :rules="[() => !!register.standard || '*']"
              :error-messages="errorMessages"
              label="แผนการผลิต"
              outlined
            ></v-autocomplete>
          </v-col>
          <!--<v-col cols="12" sm="12" md="4">
          <v-autocomplete ref="capacity" :items="listcapacityname" :item-text="item => `${item.capacityname}`" :item-value="item => `${item.id}`" v-model="machine.capacity" :rules="[() => !!machine.capacity || '*']" :error-messages="errorMessages" label="capacity"  outlined></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-autocomplete ref="power" :items="listpowername" :item-text="item => `${item.powername}`" :item-value="item => `${item.id}`" v-model="machine.power" :error-messages="errorMessages" :rules="[() => !!machine.power || '*']" label="Power"  required outlined></v-autocomplete>
        </v-col>-->
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
  props: ["tab_index"],
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
    register: {
      actcode: "",
      description: "",
      standard: "",
      duratypeid: "",
      is_active: false,
      machinedetailsid: "",
      machinegroupid: "",
    },
    registerRules: [
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
    form() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        description: this.register.description,
        duratypeid: this.register.duratypeid,
        machinedetailsid: this.register.machinedetailsid,
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
    listmachinegroupid() {
      var data = [];

      for (let item of this.listmachinegroupid) {
        data.push(item.idmachine);
      }
      this.txtidmachine = this.listmachinegroupid[0].idmachine;
      this.$store.dispatch("tpm/listmachinedetailbyid", data);
    },
  },
  methods: {
    async onChangeduratype(val) {
      // const year = year.of(2020,2);
      // const daysInMonth = year.lengthOfMonth();

      for (let step = 1; step < 13; step++) {
        this.daysInMonth(this.getyear(), step);
      }
      if (val == 5) {
        this.checkyearcombobox = true;
      } else {
        this.checkyearcombobox = false;
      }
    },
    daysInMonth: function(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getyear() {
      return new Date().getUTCFullYear();
    },
    async onChange(val) {
      this.$store.dispatch("tpm/listmachinegroupbyid", val);
    },
    async onChange_tabIndex() {
      this.$emit("changetabindex", 1);
    },
    async MachineHandlerSubmit() {
      const formData = {
        actcode: this.register.actcode,
        description: this.register.description,
        standard: this.register.standard,
        duratypeid: this.register.duratypeid,
        is_active: this.register.is_active,
        machinedetailsid: this.register.machinedetailsid,
        checkyear: this.selecteddate,
        machinegroupid: this.register.machinegroupid,
        result_type: this.selected,
        monthcurrent: this.selectmonth,
        season_id: this.seasonmachine.id,
      };
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.$refs[f].validate(true);
      });
      this.formHasErrors = false;
      //ถ้าไม่มี error ให้ กด ส่งข้อมูล
      if (!this.formHasErrors) {
        // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
        this.$store
          .dispatch("registeract/addregisteract", formData)
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
              {
                root: true,
              }
            );
            // clear element
            // Object.keys(this.form).forEach(f => {
            //   this.$refs[f].reset();
            // });
            this.onChange_tabIndex();
          })
          .catch((error) => {
            // let stasave = this.$store.state("tpm/statussave");
            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "error",
                showing: true,
                timeout: 10000,
                text: `${error.response.data.error}   ${error.response.status}`,
              },
              {
                root: true,
              }
            );

            this.error = true;
          });
      }
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
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
