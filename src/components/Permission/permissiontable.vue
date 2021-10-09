<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md6>
        <v-btn
          class="blue darken-4"
          color="primary"
          @click="onchangetabCreate(2)"
        >
          <v-icon px-2>mdi mdi-plus-circle</v-icon>บันทึกข้อมูล
        </v-btn>
      </v-flex>

      <v-flex xs12 md3> </v-flex>
      <v-flex xs12 md3>
        <v-autocomplete
          ref="userid"
          v-model="userid"
          :items="useralls"
          :item-text="(item) => `${item.name}  ${item.username}`"
          :item-value="(item) => `${item.user_id}`"
          :error-messages="errorMessages"
          :rules="[() => !!userid || '*']"
          required
          label="ผู้ใช้งานในระบบ"
          outlined
          @change="(event) => onChangeuserid(event)"
        ></v-autocomplete>
      </v-flex>
    </v-card-title>
    <v-container>
      <v-data-table
        dense
        :headers="headers"
        :items="listpermissiontables"
        :items-per-page="15"
        sort-by="index"
        :search="search"
        item-key="id"
        class="elevation-1"
        :loading="loading"
      >
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
        <template v-slot:[`item.view_read`]="{ item }">
          <v-checkbox v-model="item.view_read" dense />
        </template>
        <template v-slot:[`item.view_create`]="{ item }">
          <v-checkbox v-model="item.view_create" dense />
        </template>
        <template v-slot:[`item.view_edit`]="{ item }">
          <v-checkbox v-model="item.view_edit" dense />
        </template>
        <template v-slot:[`item.view_delete`]="{ item }">
          <v-checkbox v-model="item.view_delete" dense />
        </template>
      </v-data-table>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      formHasErrors: true,
      errorMessages: null,
      resultconfirm: false,
      showDialog: false,
      search: "",
      userid: "",
      headers: [
        {
          text: "ลำดับ",
          value: "id",
          sortable: false,
          width: "2%",
        },
        {
          text: "เมนูหลัก",
          value: "menuname",
          sortable: false,
        },
        {
          text: "เมนูรอง",
          value: "menuchildname",
          sortable: false,
        },
        {
          text: "สิทธิ์เข้าดู",
          value: "view_read",
          sortable: false,
        },
        {
          text: "สิทธิ์สร้าง",
          value: "view_create",
          sortable: false,
        },
        {
          text: "สิทธิ์แก้ไข",
          value: "view_edit",
          sortable: false,
        },
        {
          text: "สิทธิ์ลบ",
          value: "view_delete",
          sortable: false,
        },
        {
          text: "ชื่อ-นามสกุล",
          value: "name",
          sortable: false,
        },
      ],
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
      listpermissiontables: "permission/listpermissiontables",
      resultdialog: "ui/resultdialog",
      useralls: "user/useralls",
    }),
  },
  props: ["tab_index"],
  watch: {
    //ดูการเปลี่ยนค่าแล้ว
    resultdialog() {
      this.confirmdelete(this.resultdialog);
    },
  },
  methods: {
    onChangeuserid: function(val) {
      this.$store.dispatch("permission/listpermissiontableall", val);
    },
    itemRowBackground: function(item) {
      let num = item.id % 2;
      return num === 1
        ? "cyan lighten-5 !important;"
        : "cyan lighten-4 !important;";
    },
    onchangetabCreate(tab) {
      let user = [];
      let userpermissionall = [];
      for (let item of this.listpermissiontables) {
        let permis = [];

        if (item.view_create === true) {
          permis.push("view_create" + item.menuchildeng);
          userpermissionall.push("view_create" + item.menuchildeng);
        }
        if (item.view_delete === true) {
          permis.push("view_delete" + item.menuchildeng);
          userpermissionall.push("view_delete" + item.menuchildeng);
        }
        if (item.view_edit === true) {
          permis.push("view_edit" + item.menuchildeng);
          userpermissionall.push("view_edit" + item.menuchildeng);
        }
        if (item.view_read === true) {
          permis.push("view_read" + item.menuchildeng);
          userpermissionall.push("view_read" + item.menuchildeng);
        }
        user.push({
          id: item.id,
          view_read: item.view_read,
          view_create: item.view_create,
          view_edit: item.view_edit,
          view_delete: item.view_delete,
          permission: permis,
          userid: this.userid,
        });
      }

      this.$store
        .dispatch("permission/updatepermission", user)
        .then((res) => {
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
          const datauser = {
            user: this.userid,
            permission: userpermissionall,
          };
          this.$store.dispatch("user/updateusers", datauser);
        })
        .catch((err) => {
          this.$store.dispatch(
            "snackbar/setSnackbar",
            {
              color: "error",
              showing: true,
              timeout: 10000,
              text: `รหัสเครื่องจักรนี้ได้ถูกเจนไปแล้ว`,
            },
            {
              root: true,
            }
          );
        });
      // this.$emit("changetabindex", tab);
    },
    initialize() {
      this.$store.dispatch("user/loadUserall");
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

.v-data-table >>> .v-data-table-header span {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}
.v-data-table >>> .v-data-table-header {
  background-color: #212121;
}
.v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
