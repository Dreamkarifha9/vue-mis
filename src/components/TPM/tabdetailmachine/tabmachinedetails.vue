<template>
  <v-form
    ref="form"
    v-model="formHasErrors"
    @submit.prevent="MachinedetailsHandlerSubmit()"
  >
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="idmachine"
          v-model="machinedetail.idmachine"
          :rules="machineRules"
          label="รหัสเครื่องจักร"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="orders"
          v-model="machinedetail.orders"
          :rules="[() => !!machinedetail.orders || '*']"
          label="Orders"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="name"
          v-model="machinedetail.name"
          :rules="[() => !!machinedetail.name || '*']"
          label="ชื่อ"
          prepend-icon="mdi mdi-pencil"
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
        <v-text-field
          ref="unit"
          v-model="machinedetail.unit"
          label="Unit"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="idproduct"
          v-model="machinedetail.idproduct"
          label="Idproduct"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="w3"
          v-model="machinedetail.w3"
          label="W3"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="m1"
          v-model="machinedetail.m1"
          label="M1"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="m3"
          v-model="machinedetail.m3"
          label="M3"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="y1"
          v-model="machinedetail.y1"
          label="Y1"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="y2"
          v-model="machinedetail.y2"
          label="Y2"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="y3"
          v-model="machinedetail.y3"
          label="Y3"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="oh"
          v-model="machinedetail.oh"
          label="Oh"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="number"
          v-model="machinedetail.number"
          label="Number"
          prepend-icon="mdi mdi-pencil"
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
  </v-form>
</template>

<script>
export default {
  data: () => ({
    machinedetail: {
      id: "",
      idmachine: "",
      orders: "",
      name: "",
      unit: "",
      idproduct: "",
      w3: "",
      m1: "",
      m3: "",
      y1: "",
      y2: "",
      y3: "",
      oh: "",
      number: ""
    },
    formHasErrors: true,
    formHasErrorsdetails: true,
    errorMessages: null,
    loader: null,
    loading: false,
    machineRules: [
      v => !!v || "*",
      v => (v && v.length >= 6) || "กรุณากรอกรหัสเครื่องจักร"
    ]
  }),
  props: ["tab_index", "machine", "machinedetails"],
  computed: {
    form() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machinedetail.idmachine,
        name: this.machinedetail.name,
        orders: this.machinedetail.orders
      };
    }
  },
  methods: {
    async MachinedetailsHandlerSubmit() {
      const formData = {
        idmachine: this.machinedetail.idmachine,
        orders: this.machinedetail.orders,
        name: this.machinedetail.name,
        unit: this.machinedetail.unit,
        idproduct: this.machinedetail.idproduct,
        w3: this.machinedetail.w3,
        m1: this.machinedetail.m1,
        m3: this.machinedetail.m3,
        y1: this.machinedetail.y1,
        y2: this.machinedetail.y2,
        y3: this.machinedetail.y3,
        oh: this.machinedetail.oh,
        number: this.machinedetail.number
      };
      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });

      //ถ้าไม่มี error ให้ กด ส่งข้อมูล
      if (!this.formHasErrors) {
        // dispatch หมายถึงสั่งให้ vuex  action ทำงาน

        this.$store
          .dispatch("tpm/addmachinedetails", formData)
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
            this.$store
              .dispatch("tpm/listmachinedetails", this.machinedetail.idmachine)
              .then(() => {
                this.$store.dispatch("tpm/getimages", this.machine.idmachine);
              });

            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.$emit("onsavedetail_receive");
          })
          .catch(error => {
            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "error",
                showing: true,
                timeout: 3000,
                text: error
              },
              { root: true }
            );

            this.error = true;
          });
      }
    }
  }
};
</script>

<style></style>
