<template>
  <nav>
    <v-app-bar app color="indigo darken-4" dark class="white--text">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">
        <h1>MIS</h1>
        &nbsp;<span class="font-weight-light"></span>
      </span>
      <v-spacer></v-spacer>

      <v-btn v-if="auth" class="ma-2 red accent-4" dark @click="onLogout">
        <v-icon dark left>exit_to_app</v-icon>Logout
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-if="auth" v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="/img/img2.png" alt="" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>{{
              username === null ? currentUsers.data[0].name : username
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list>
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="item in items"
          v-if="$can(item.can)"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            link
            :to="subItem.link"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import LocalStorageService from "../../service/LocalStorageService";

export default {
  data: () => ({
    drawer: false,
    items: [
      {
        action: "mdi-security",
        title: "SECURITY",
        can: "view_readsceurity",
        items: [
          {
            title: "ลงทะเบียนผู้ใช้งานระบบ",
            link: "userregister",
          },
          {
            title: "ตั่งค่าผู้ใช้งานระบบ",
            link: "Security",
          },
          {
            title: "กำหนดสิทธิ์การเข้าใช้งานระบบ",
            link: "permission",
          },
          {
            title: "ตั่งค่าแผนก",
            link: "division",
          },
          {
            title: "บันทึกกิจกรรมย้อนหลัง",
            link: "MachineActreport_Security",
          },
          // { title: "แผนบำรุงรักษา", link: "Plan" },
          // { title: "ประวัติการซ่อม" },
          // { title: "ประสิทธิผลโดยรวมเครื่องจักรOEE" }
        ],
      },
      {
        action: "mdi mdi-flower",
        title: "TPM",
        can: "view_readmachinetpm",
        items: [
          {
            title: "ทะเบียนเครื่องจักร",
            link: "Registermachine",
          },
          // { title: "แผนบำรุงรักษา", link: "Plan" },
          // { title: "ประวัติการซ่อม" },
          // { title: "ประสิทธิผลโดยรวมเครื่องจักรOEE" }
        ],
      },
      {
        action: "mdi mdi-share-variant",
        title: "ACTTIVITY",
        can: "view_readacttivitymachine",
        items: [
          {
            title: "กิจกรรมเครื่องจักร",
            link: "Registeract",
          },
          {
            title: "เริ่มกิจกรรม",
            link: "Machineact",
          },
          // { title: "แผนบำรุงรักษา", link: "Plan" },
          // { title: "ประวัติการซ่อม" },
          // { title: "ประสิทธิผลโดยรวมเครื่องจักรOEE" }
        ],
      },
      {
        action: "mdi-chart-areaspline",
        title: "KPI",
        can: "view_readkpimain",
        items: [
          {
            title: "KPI หลัก",
            link: "Kpimain",
          },
          // {
          //   title: "KPI รอง",
          //   link: "Kpiminor"
          // },
          // {
          //   title: "KPI งานซ่อม"
          // }
        ],
      },
      {
        action: "mdi-message",
        title: "DAILY REPORT",
        can: "view_readdailyreport",
        items: [
          {
            title: "Daily Report",
            link: "Dailyreport",
          },
          {
            title: "MachineAct Report",
            link: "MachineActreport",
          },
        ],
      },
    ],
    username: null,
  }),
  watch: {
    username() {},
  },
  mounted() {
    const test = LocalStorageService.getUsernames();

    this.username = LocalStorageService.getUsernames();
  },
  methods: {
    onLogout() {
      // this.$setUserPermissions(null, false);
      this.$store.dispatch("user/logout");
    },
  },
  computed: {
    ...mapGetters({
      auth: "user/isAuthenticated",
      currentUsers: "user/currentUsers",
    }),
  },
};
</script>

<style></style>
