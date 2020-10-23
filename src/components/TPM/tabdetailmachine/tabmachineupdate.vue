<template>
  <v-form
    ref="form2"
    v-model="formHasErrorsdetails"
    @submit.prevent="MachineupdateHandlerSubmit()"
  >
    <v-row>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="idmachine"
          v-model="machinedetails.idmachine"
          label="รหัสเครื่องจักร"
          prepend-icon="mdi mdi-pencil"
          outlined
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="orders"
          v-model="machinedetails.orders"
          label="Orders"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="name"
          v-model="machinedetails.name"
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
          v-model="machinedetails.unit"
          label="Unit"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="idproduct"
          v-model="machinedetails.idproduct"
          label="Idproduct"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="w3"
          v-model="machinedetails.w3"
          label="W3"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="m1"
          v-model="machinedetails.m1"
          label="M1"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="m3"
          v-model="machinedetails.m3"
          label="M3"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          ref="y1"
          v-model="machinedetails.y1"
          label="Y1"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="y2"
          v-model="machinedetails.y2"
          label="Y2"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="y3"
          v-model="machinedetails.y3"
          label="Y3"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="oh"
          v-model="machinedetails.oh"
          label="Oh"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          ref="number"
          v-model="machinedetails.number"
          label="Number"
          prepend-icon="mdi mdi-pencil"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4"> </v-col>
    </v-row>
    <v-btn
      class="ma-2"
      :loading="loading"
      :disabled="!formHasErrorsdetails"
      color="success"
      type="submit"
    >
      <v-icon>mdi mdi-content-save</v-icon>
      บันทึกแก้ไข
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    formHasErrorsdetails: true,
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
    }
  }),
  props: ["tab_index", "machine", "machinedetails"],
  computed: {
    form2() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machinedetails.idmachine,
        name: this.machinedetails.name,
        orders: this.machinedetails.orders
      };
    }
  },
  methods: {
    async MachineupdateHandlerSubmit() {
      const formData = {
        id: this.machinedetails.id,
        idmachine: this.machinedetails.idmachine,
        orders: this.machinedetails.orders,
        name: this.machinedetails.name,
        unit: this.machinedetails.unit,
        idproduct: this.machinedetails.idproduct,
        w3: this.machinedetails.w3,
        m1: this.machinedetails.m1,
        m3: this.machinedetails.m3,
        y1: this.machinedetails.y1,
        y2: this.machinedetails.y2,
        y3: this.machinedetails.y3,
        oh: this.machinedetails.oh,
        number: this.machinedetails.number
      };
      this.formHasErrorsdetails = false;
      Object.keys(this.form2).forEach(f => {
        if (!this.form2[f]) this.formHasErrorsdetails = true;
        this.$refs[f].validate(true);
      });
      //ถ้าไม่มี error ให้ กด ส่งข้อมูล
      if (!this.formHasErrorsdetails) {
        // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
        this.$store
          .dispatch("tpm/updatemachinedetails", formData)
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
            this.$store.dispatch(
              "tpm/listmachinedetails",
              this.machinedetails.idmachine
            );
            this.$refs.form2.reset();
            this.$refs.form2.resetValidation();
            this.formHasErrorsdetails = true;
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
