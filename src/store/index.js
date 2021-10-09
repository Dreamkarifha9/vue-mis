import Vue from "vue";
import Vuex from "vuex";
import userModule from "./modules/user";
import snackbarModule from "./modules/snackbar";
import tpmModule from "./modules/tpm";
import uiModule from "./modules/ui";
import kpimain from "./modules/kpimain";
import kpiminor from "./modules/kpiminor";
import registeract from "./modules/registeract";
import machinegroup from "./modules/machinegroup";
import duratype from "./modules/duratype";
import machineact from './modules/machineact'
import dailyreport from './modules/dailyreport'
import permission from './modules/permission'
import division from './modules/division'
import machineactresult from './modules/machineactresult'
import repairhistorymachine from './modules/repairhistorymachine'
import ncr from './modules/ncr'








Vue.use(Vuex);

export default new Vuex.Store({
  state: {loader: false},
  mutations: {
    LOADER (state, payload) {
      state.loader = payload
    }
  },
  actions: {},
  modules: {
    user: userModule,
    snackbar: snackbarModule,
    tpm: tpmModule,
    ui: uiModule,
    kpimain: kpimain,
    kpiminor: kpiminor,
    registeract: registeract,
    machinegroup: machinegroup,
    duratype: duratype,
    machineact: machineact,
    dailyreport: dailyreport,
    permission: permission,
    division: division,
    machineactresult: machineactresult,
    repairhistorymachine: repairhistorymachine,
    ncr: ncr
  }
});
