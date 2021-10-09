<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs3 md2>
        <v-btn
          class="blue darken-4"
          color="primary"
          @click="onchangetabCreate(2)"
        >
          <v-icon px-2>mdi mdi-plus-circle</v-icon>เพิ่มข้อมูล
        </v-btn>
      </v-flex>
      <v-flex xs12 md3> </v-flex>
    </v-card-title>
    <v-container> </v-container>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      resultconfirm: false,
      showDialog: false,
      loading: false,
      editedIndex: -1,
      registeract: {
        id: "",
      },
      divisionFilterValue: null,
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapGetters({
      listregisteract: "registeract/listregisteracts",
      listmachindetails: "tpm/listmachinedetailsall",
      resultdialog: "ui/resultdialog",
      listpermission: "permission/listpermissions",
    }),
  },
  props: ["tab_index"],
  watch: {
    //ดูการเปลี่ยนค่าแล้ว
  },
  methods: {
    onchangetabCreate(tab) {
      this.$emit("changetabindex", tab);
    },
    initialize() {
      this.$store.dispatch("permission/listmenuall").then((res) => {
        this.$store.dispatch("permission/listmenuchildall").then((res) => {
          this.$store.dispatch("user/loadUserall");
        });
      });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 320) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 480) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 600) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 768px) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}

.v-data-table >>> span {
  font-size: 1rem;
  font-weight: bold;
  color: black;
}
</style>
