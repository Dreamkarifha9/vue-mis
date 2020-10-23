<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          เพิ่มข้อมูลเครื่องจักร</v-card-subtitle
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
          <v-col cols="12" sm="4">
            <v-text-field
              ref="idmachine"
              v-model="machine.idmachine"
              :rules="machineRules"
              :error-messages="errorMessages"
              label="รหัสเครื่องจักร"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="namethai"
              v-model="machine.namethai"
              :rules="[() => !!machine.namethai || '*']"
              :error-messages="errorMessages"
              label="ชื่อเครื่องจักร"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="nameeng"
              v-model="machine.nameeng"
              :rules="[() => !!machine.nameeng || '*']"
              :error-messages="errorMessages"
              label="ชื่อภาษาอังกฤษ"
              prepend-icon="mdi mdi-pencil"
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
              prepend-icon="mdi mdi-pencil"
              outlined
            ></v-autocomplete>
          </v-col> -->
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="sizemachine"
              :items="listsizename"
              :item-text="item => `${item.sizename}`"
              :item-value="item => `${item.id}`"
              v-model="machine.sizemachine"
              :error-messages="errorMessages"
              :rules="[() => !!machine.sizemachine || '*']"
              required
              label="ขนาดเครื่องจักร"
              prepend-icon="mdi mdi-pencil"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="capacity"
              :items="listcapacityname"
              :item-text="item => `${item.capacityname}`"
              :item-value="item => `${item.id}`"
              v-model="machine.capacity"
              :rules="[() => !!machine.capacity || '*']"
              :error-messages="errorMessages"
              label="capacity"
              prepend-icon="mdi mdi-pencil"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="power"
              :items="listpowername"
              :item-text="item => `${item.powername}`"
              :item-value="item => `${item.id}`"
              v-model="machine.power"
              :error-messages="errorMessages"
              :rules="[() => !!machine.power || '*']"
              label="Power"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-autocomplete
              ref="division"
              :items="listdivision"
              :item-text="item => `${item.divisionname}`"
              :item-value="item => `${item.id}`"
              v-model="machine.division"
              :error-messages="errorMessages"
              :rules="[() => !!machine.division || '*']"
              label="แผนก"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              ref="point"
              v-model="machine.point"
              :error-messages="errorMessages"
              :rules="[() => !!machine.point || '*']"
              label="Point"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-text-field
              ref="model"
              v-model="machine.model"
              :error-messages="errorMessages"
              :rules="[() => !!machine.model || '*']"
              label="Model"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="nummachine"
              v-model="machine.nummachine"
              :rules="[() => !!machine.nummachine || '*']"
              :error-messages="errorMessages"
              label="Nummachine"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="usejob"
              v-model="machine.usejob"
              :rules="[() => !!machine.usejob || '*']"
              :error-messages="errorMessages"
              label="Usejob"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="capability"
              v-model="machine.capability"
              :rules="[() => !!machine.capability || '*']"
              :error-messages="errorMessages"
              label="Capability"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="manufacturer"
              v-model="machine.manufacturer"
              :rules="[() => !!machine.manufacturer || '*']"
              :error-messages="errorMessages"
              label="manufacturer"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="machineineinclude"
              v-model="machine.machineineinclude"
              :rules="[() => !!machine.machineineinclude || '*']"
              :error-messages="errorMessages"
              label="Machineineinclude"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="genration"
              v-model="machine.genration"
              :rules="[() => !!machine.genration || '*']"
              :error-messages="errorMessages"
              label="Genration"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              ref="energy"
              v-model="machine.energy"
              :rules="[() => !!machine.energy || '*']"
              :error-messages="errorMessages"
              label="Energy"
              prepend-icon="mdi mdi-pencil"
              required
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="!formHasErrors"
          color="success"
          type="submit"
        >
          <v-icon>mdi mdi-content-save</v-icon>
          บันทึกข้อมูล
        </v-btn>
        <v-btn class="ma-2" color="error" v-on:click="onChange_tabIndex">
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
  data: () => ({
    items: ["นาย", "นาง", "นางสาว"],
    formHasErrors: true,
    errorMessages: null,
    loader: null,
    loading: false,
    machine: {
      idmachine: "",
      namethai: "",
      nameeng: "",
      sizemachine: "",
      capacity: "",
      power: "",
      division: "",
      point: "",
      model: "",
      nummachine: "",
      usejob: "",
      capability: "",
      manufacturer: "",
      machineineinclude: "",
      genration: "",
      energy: ""
    },
    machineRules: [
      v => !!v || "*",
      v => (v && v.length >= 6) || "กรุณากรอกรหัสเครื่องจักร"
    ]
  }),
  props: ["tab_index"],
  computed: {
    ...mapGetters({
      listsizename: "tpm/listsizenames",
      listcapacityname: "tpm/listcapacitynames",
      listpowername: "tpm/listpowernames",
      listdivision: "tpm/listdivisions"
    }),
    form() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machine.idmachine,
        namethai: this.machine.namethai,
        nameeng: this.machine.nameeng,
        sizemachine: this.machine.sizemachine,
        capacity: this.machine.capacity,
        power: this.machine.power,
        division: this.machine.division,
        point: this.machine.point,
        model: this.machine.model,
        nummachine: this.machine.nummachine,
        usejob: this.machine.usejob,
        capability: this.machine.capability,
        manufacturer: this.machine.manufacturer,
        machineineinclude: this.machine.machineineinclude,
        genration: this.machine.genration,
        energy: this.machine.energy
      };
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  methods: {
    async onChange_tabIndex() {
      this.$emit("changetabindex", 1);
    },
    async MachineHandlerSubmit() {
      const formData = {
        idmachine: this.machine.idmachine,
        namethai: this.machine.namethai,
        nameeng: this.machine.nameeng,
        sizemachine: this.machine.sizemachine,
        capacity: this.machine.capacity,
        power: this.machine.power,
        division: this.machine.division,
        point: this.machine.point,
        model: this.machine.model,
        nummachine: this.machine.nummachine,
        usejob: this.machine.usejob,
        capability: this.machine.capability,
        manufacturer: this.machine.manufacturer,
        machineinclude: this.machine.machineineinclude,
        genration: this.machine.genration,
        energy: this.machine.energy
      };

      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        console.log(f);
        this.$refs[f].validate(true);
      });
      //ถ้าไม่มี error ให้ กด ส่งข้อมูล
      if (!this.formHasErrors) {
        // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
        this.$store
          .dispatch("tpm/addmachine", formData)
          .then(res => {
            // this.$store.dispatch("customer/listcustomer");

            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "info",
                showing: true,
                timeout: 2000,
                text: "บันทึกข้อมูลสำเร็จ !!"
              },
              { root: true }
            );
            // clear element
            // Object.keys(this.form).forEach(f => {
            //   this.$refs[f].reset();
            // });
            this.onChange_tabIndex();
          })
          .catch(error => {
            console.log(error.response.data.error);
            // let stasave = this.$store.state("tpm/statussave");
            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "error",
                showing: true,
                timeout: 10000,
                text: `${error.response.data.error}   ${error.response.status}`
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
    }
  }
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
