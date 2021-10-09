import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import { VueQuickAcl } from './hook/VueQuickAcl'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Viewer);
Vue.use(VueQuickAcl);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
