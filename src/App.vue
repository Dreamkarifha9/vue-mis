<template>
<v-app>
  <Navbar />
  <v-content :class="[this.$route.name === 'home' ? this.bgclass : this.bgnull]">
    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
  </v-content>
  <v-snackbar v-for="snackbar in snackbars.filter(s => s.showing)" :key="snackbar.text + Math.random()" v-model="snackbar.showing" :timeout="snackbar.timeout" :color="snackbar.color" :bottom="true">
    {{ snackbar.text }}
    <v-btn text @click="snackbar.showing = false">
      Close
    </v-btn>
  </v-snackbar>
</v-app>
</template>

<style scoped>
.bg {
  min-width: 100%;
  min-height: 100%;
  background: url("../src/assets/SKF-web.png") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

@media screen and (max-width: 1024px) {

  /* Specific to this particular image */
  .bg {
    min-width: 100%;
    min-height: 100%;
    background: url("../src/assets/25552.jpg") no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
}
</style>

<script>
import Navbar from "./components/LayoutMain/Navbar";
import {
  mapState
} from "vuex";
export default {
  name: "App",

  components: {
    Navbar
  },

  data: () => ({
    //
    urldefualt: "http://192.168.14.22:8000/",
    eventsource: null,
    bgclass: "bg",
    bgnull: ""
  }),
  computed: {
    ...mapState({
      snackbars: state => state.snackbar.snackbars
    })
  },
  // sockets: {
  //   connect() {
  //     console.log("socket connected");
  //   }
  // },
  mounted() {
    // this.eventsource.onmessage = async function(messageEvent) {
    //   var eventMsg = messageEvent.data;
    //   let convertstring = JSON.parse(eventMsg);
    //   let msg = convertstring.msg;
    //   let val = convertstring.value;
    //   console.log(msg);
    // };
    // ต้องมาดัก การตอบกลับของ serverevent นะจ๊ะ
  },
  created() {
    this.$store.dispatch("user/tryAutoLogin");
    console.log();
  },
  methods: {}
};
</script>
