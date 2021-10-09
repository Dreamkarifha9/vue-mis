<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          แก้ไขข้อมูลเครื่องจักร</v-card-subtitle
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
          <v-col cols="12" sm="2">
            <v-text-field
              ref="idmachine"
              v-model="machine.idmachine"
              label="รหัสเครื่องจักร"
              required
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              ref="namethai"
              v-model="machine.namethai"
              :rules="[() => !!machine.namethai || '*']"
              :error-messages="errorMessages"
              label="ชื่อเครื่องจักร"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              ref="nameeng"
              v-model="machine.nameeng"
              :rules="[() => !!machine.nameeng || '*']"
              :error-messages="errorMessages"
              label="ชื่อภาษาอังกฤษ"
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
              ref="sizemachine"
              v-model="defualtsize"
              :items="listsizename"
              :item-text="(item) => `${item.sizename}`"
              :item-value="(item) => `${item.id}`"
              return-object
              label="ขนาดเครื่องจักร"
              outlined
              @input="sizechange"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="capacity"
              v-model="defualtcapacity"
              :items="listcapacityname"
              :item-text="(item) => `${item.capacityname}`"
              :item-value="(item) => `${item.id}`"
              return-object
              label="capacity"
              outlined
              @input="capacitychange"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="power"
              :items="listpowername"
              :item-text="(item) => `${item.powername}`"
              :item-value="(item) => `${item.id}`"
              :value="defualtpower"
              return-object
              label="Power"
              outlined
              @input="powerchange"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="division"
              v-model="defualtdivision"
              :items="listdivision"
              :item-text="(item) => `${item.divisionname}`"
              :item-value="(item) => `${item.id}`"
              return-object
              label="แผนก"
              outlined
              @input="divisionchange"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              ref="point"
              v-model="machine.point"
              label="Point"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              ref="model"
              v-model="machine.model"
              label="Model"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="nummachine"
              v-model="machine.nummachine"
              label="Nummachine"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="usejob"
              v-model="machine.usejob"
              label="Usejob"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="capability"
              v-model="machine.capability"
              label="Capability"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="manufacturer"
              v-model="machine.manufacturer"
              label="manufacturer"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="machineineinclude"
              v-model="machine.machineineinclude"
              label="Machineineinclude"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="genration"
              v-model="machine.genration"
              label="Genration"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="energy"
              v-model="machine.energy"
              label="Energy"
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
  props: ["tab_index", "machine", "images"],
  data: () => ({
    items: ["นาย", "นาง", "นางสาว"],
    formHasErrors: true,
    errorMessages: null,
    loader: null,
    loading: false,
    defualtsizedata: "",
    defualtcapacitydata: "",
    defualtpowerdata: "",
    defualtdivisiondata: "",
    machineRules: [
      (v) => !!v || "*",
      (v) => (v && v.length >= 6) || "กรุณากรอกรหัสเครื่องจักร",
    ],
  }),
  computed: {
    ...mapGetters({
      listsizename: "tpm/listsizenames",
      listcapacityname: "tpm/listcapacitynames",
      listpowername: "tpm/listpowernames",
      listdivision: "tpm/listdivisions",
    }),
    defualtsize: {
      get() {
        let data = `${this.machine.sizemachine}`;

        return data;
      },
      set(newVlue) {
        return newVlue.id;
      },
    },
    defualtcapacity: {
      get() {
        let data = `${this.machine.capacity}`;

        return data;
      },
      set(newVlue) {
        return newVlue.id;
      },
    },
    defualtdivision: {
      get() {
        let data = `${this.machine.division}`;

        return data;
      },
      set(newVlue) {
        return newVlue.id;
      },
    },
    defualtpower() {
      return `${this.machine.power}`;
    },
    form() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machine.idmachine,
        namethai: this.machine.namethai,
        nameeng: this.machine.nameeng,
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
  },
  methods: {
    async sizechange(value) {
      if (typeof value.id !== "undefined" && value.id !== null) {
        this.defualtsizedata = value.id;
      } else {
        this.defualtsizedata = value.id;
      }
    },
    async capacitychange(value) {
      if (typeof value.id !== "undefined" && value.id !== null) {
        this.defualtcapacitydata = value.id;
      } else {
        this.defualtcapacitydata = value.id;
      }
    },
    async powerchange(value) {
      if (typeof value.id !== "undefined" && value.id !== null) {
        this.defualtpowerdata = value.id;
      } else {
        this.defualtpowerdata = value.id;
      }
    },
    async divisionchange(value) {
      if (typeof value.id !== "undefined" && value.id !== null) {
        this.defualtdivisiondata = value.id;
      } else {
        this.defualtdivisiondata = value.id;
      }
    },
    async onChange_tabIndex() {
      this.$emit("changetabindex", 1);
    },
    async MachineHandlerSubmit() {
      const formData = {
        idmachine: this.machine.idmachine,
        namethai: this.machine.namethai,
        nameeng: this.machine.nameeng,
        sizemachine:
          this.defualtsizedata === ""
            ? this.machine.sizemachine
            : this.defualtsizedata,
        capacity:
          this.defualtcapacitydata === ""
            ? this.machine.capacity
            : this.defualtcapacitydata,
        power:
          this.defualtpowerdata === ""
            ? this.machine.power
            : this.defualtpowerdata,
        division:
          this.defualtdivisiondata === ""
            ? this.machine.division
            : this.defualtdivisiondata,
        point: this.machine.point,
        model: this.machine.model,
        nummachine: this.machine.nummachine,
        usejob: this.machine.usejob,
        capability: this.machine.capability,
        manufacturer: this.machine.manufacturer,
        machineineinclude: this.machine.machineineinclude,
        genration: this.machine.genration,
        energy: this.machine.energy,
      };

      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      //ถ้าไม่มี error ให้ กด ส่งข้อมูล
      if (!this.formHasErrors) {
        // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
        this.$store
          .dispatch("tpm/updatemachine", formData)
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

<style></style>
