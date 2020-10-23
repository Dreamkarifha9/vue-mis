<template>
<nav>
  <v-app-bar app color="indigo darken-4" dark class="white--text">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <span class="title ml-3 mr-5">
      <h1>MIS</h1>
      &nbsp;<span class="font-weight-light"></span>
    </span>
    <v-spacer></v-spacer>
    <v-btn @click="onLogout" class="ma-2" color="pink accent-3" dark v-if="auth">
      <v-icon dark left>exit_to_app</v-icon>Logout
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" app v-if="auth">
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="/img/img2.png" alt="" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>ADMIN</v-list-item-title>
          <v-list-item-subtitle>นายจิรายุ ค้าชอบ</v-list-item-subtitle>
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
      <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="subItem in item.items" :key="subItem.title" link :to="subItem.link">
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
import {
  mapGetters
} from "vuex";
export default {
  data: () => ({
    drawer: false,
    items: [{
        action: "mdi-folder-google-drive",
        title: "TPM",
        items: [{
            title: "ทะเบียนเครื่องจักร",
            link: "Registermachine"
          }
          // { title: "แผนบำรุงรักษา", link: "Plan" },
          // { title: "ประวัติการซ่อม" },
          // { title: "ประสิทธิผลโดยรวมเครื่องจักรOEE" }
        ]
      },
      {
        action: "mdi-chart-areaspline",
        title: "KPI",
        items: [{
            title: "KPI หลัก",
            link: "Kpimain"
          },
          {
            title: "KPI รอง",
            link: "Kpiminor"
          },
          {
            title: "KPI งานซ่อม"
          }
        ]
      },
      {
        action: "mdi-message",
        title: "REPORT",
        items: [{
          title: "Daily Report"
        }]
      }
    ]
  }),
  methods: {
    onLogout() {
      this.$store.dispatch("user/logout");
    }
  },
  computed: {
    ...mapGetters({
      auth: "user/isAuthenticated"
    })
  }
};
</script>

<style></style>
