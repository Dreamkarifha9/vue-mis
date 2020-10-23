import Vue from "vue";
import Vuex from "vuex";
import userModule from "./modules/user";
import snackbarModule from "./modules/snackbar";
import tpmModule from "./modules/tpm";
import uiModule from "./modules/ui";
import kpimain from "./modules/kpimain";
import kpiminor from "./modules/kpiminor";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user: userModule,
    snackbar: snackbarModule,
    tpm: tpmModule,
    ui: uiModule,
    kpimain: kpimain,
    kpiminor: kpiminor
  }
});
