<template>
  <v-card flat>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          เอกสารแสดงรายละเอียดเครื่องจักร</v-card-subtitle
        >
      </v-flex>
    </v-card-title>
    <v-container>
      <v-form>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <v-autocomplete
              ref="division"
              v-model="defualtdivision"
              :items="listdivision"
              :item-text="item => `${item.divisionname}`"
              :item-value="item => `${item.id}`"
              return-object
              label="แผนก"
              prepend-icon="mdi mdi-pencil"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="idmachine"
              v-model="machine.idmachine"
              label="รหัส"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="prefnamethaiix"
              v-model="machine.namethai"
              label="ชื่อเครื่องจักร"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="nameeng"
              v-model="machine.nameeng"
              label="ชื่อภาษาอังกฤษ"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              ref="point"
              v-model="machine.point"
              label="จุดใช้งาน"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-text-field
              ref="model"
              v-model="machine.model"
              label="แบบ"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="nummachine"
              v-model="machine.nummachine"
              label="หมายเลขเครื่อง"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <v-autocomplete
              ref="sizemachine"
              v-model="defualtsize"
              :items="listsizename"
              :item-text="item => `${item.sizename}`"
              :item-value="item => `${item.id}`"
              return-object
              label="ขนาดเครื่องจักร"
              prepend-icon="mdi mdi-pencil"
              outlined
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="energy"
              v-model="machine.energy"
              label="Energy"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="usejob"
              v-model="machine.usejob"
              label="ใช้ในงาน"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="capability"
              v-model="machine.capability"
              label="ขนาดความสามารถ"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="manufacturer"
              v-model="machine.manufacturer"
              label="ผู้ผลิต"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="machineineinclude"
              v-model="machine.machineinclude"
              label="เครื่องจักรประกอบด้วย"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              ref="genration"
              v-model="machine.genration"
              label="รุ่น"
              prepend-icon="mdi mdi-pencil"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    defualtsizedata: "",
    defualtcapacitydata: "",
    defualtpowerdata: "",
    urldefualt: "http://192.168.14.22:8000/"
  }),
  created() {},
  props: ["tab_index", "machine", "machinedetails"],
  computed: {
    ...mapGetters({
      listsizename: "tpm/listsizenames",
      listdivision: "tpm/listdivisions"
    }),
    defualtsize: {
      get() {
        let data = `${this.machine.sizemachine}`;
        return data;
      },
      set(newVlue) {
        return newVlue.id;
      }
    },
    defualtdivision: {
      get() {
        let data = `${this.machine.division}`;

        return data;
      },
      set(newVlue) {
        return newVlue.id;
      }
    }
  }
};
</script>

<style></style>
