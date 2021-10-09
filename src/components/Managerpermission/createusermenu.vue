<template>
  <v-sheet>
    <v-card-title>
      <v-flex xs12 md12>
        <v-card-subtitle>
          <v-icon color="primary">mdi mdi-tag</v-icon>
          ตั่งค่าผู้ใช้งานระบบ
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
          <v-col cols="12" sm="12" md="3">
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
            ></v-autocomplete>
          </v-col>
        </v-row>
        <template>
          <div class="user-list">
            <v-row>
              <v-col
                v-for="menu in listmenus"
                :key="menu.id"
                cols="12"
                sm="4"
                md="4"
              >
                <h2>{{ menu.menuname }}</h2>
                <v-checkbox
                  v-for="menuchild in listmenuchilds"
                  v-if="menuchild.menuid == menu.id"
                  :key="menuchild.id"
                  v-model="perlist"
                  :label="menuchild.menuchildname"
                  color="red"
                  :value="menuchild.menuchildeng"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
          </div>
        </template>
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
    formHasErrors: true,
    errorMessages: null,
    loader: null,
    loading: false,
    perlist: [],
    userid: "",
  }),
  created() {
    this.perlist = this.listpermissions;
    console.log("this.perlist>>>>", this.perlist);
  },
  computed: {
    ...mapGetters({
      profiles: "user/profiles",
      listmenus: "permission/listmenus",
      listmenuchilds: "permission/listmenuchilds",
      listpermissions: "permission/listpermissions",
      useralls: "user/useralls",
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
  },
  methods: {
    async onChange_tabIndex() {
      this.$emit("changetabindex", 1);
    },
    async MachineHandlerSubmit() {
      let user = [];
      let userpermissionall = [];
      for (let item of this.perlist) {
        let itemmenuchild = this.listmenuchilds.filter((items) => {
          return items.menuchildeng == item;
        });
        let permis = [];
        permis.push("view_read" + item);
        permis.push("view_create" + item);
        permis.push("view_edit" + item);
        permis.push("view_delete" + item);
        userpermissionall.push("view_read" + item);
        userpermissionall.push("view_create" + item);
        userpermissionall.push("view_edit" + item);
        userpermissionall.push("view_delete" + item);

        user.push({
          idmenu: itemmenuchild[0].menuid,
          idmenuchild: itemmenuchild[0].id,
          view_read: true,
          view_create: true,
          view_edit: true,
          view_delete: true,
          permission: permis,
          userid: this.userid,
        });
      }

      this.$store
        .dispatch("permission/addpermission", user)
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
          this.onChange_tabIndex();
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
