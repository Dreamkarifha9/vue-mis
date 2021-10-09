import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listmachineact: [],
    listactresultseason1: [],
    listactresultseason2: [],
  },
  mutations: {
    SET_LIST_MACHINEACT (state, machineact) {
      console.log('machineactlist', machineact);
      state.listmachineact = machineact;
    },
    SET_LIST_ACTRESULT1 (state, actresult) {
      state.listactresultseason1 = actresult;
    },
    SET_LIST_ACTRESULT2 (state, actresult) {
      state.listactresultseason2 = actresult;
    },
    CLEAR_LIST_ACTRESULT1 (state) {
      state.listactresultseason1 = [];
    },
    CLEAR_LIST_ACTRESULT2 (state) {
      state.listactresultseason2 = [];
    },
    CLEAR_LIST_MACHINEACT(state) {
      state.listmachineact = [];
    },
  },
  actions: {
    async clearlistmachineact ({ commit, dispatch }) {
     return commit("CLEAR_LIST_MACHINEACT");
    },
    async listmachineactdivision_({ commit, dispatch }, Obj) {
      // const userId = localStorage.getItem("userId");
 
      return new Promise((resolve, reject) => {
       axios
        .get(`/api/machineactbydivision/${Obj.seasonid}/${Obj.divisionid}/${Obj.year}/${Obj.month}`)
         .then(({ data }) => {
           console.log('data', data);

           commit("SET_LIST_MACHINEACT", data);
          resolve({ data });
        })
         .catch(error => {
          commit("CLEAR_LIST_MACHINEACT");
          reject(error)
        });
      });
    },
    async listactseasonbymonth1({ commit, dispatch }, Obj) {
      // const userId = localStorage.getItem("userId");
 
      return new Promise((resolve, reject) => {
       axios
        .get(`/api/machineactseasonbymonth1/${Obj.idmachine}/${Obj.year}/${Obj.month}`)
         .then(({ data }) => {

          commit("SET_LIST_ACTRESULT1", data);
          resolve({ data });
        })
         .catch(error => {
          commit("CLEAR_LIST_ACTRESULT1");
          reject(error)
        });
      });
    },
    async listactseasonbymonth2 ({ commit, dispatch }, Obj) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
       axios
        .get(`/api/machineactseasonmonth2/${Obj.idmachine}/${Obj.year}/${Obj.month}`)
         .then(({ data }) => {
          commit("SET_LIST_ACTRESULT2", data);
          resolve({ data });
        })
         .catch(error => {
          commit("CLEAR_LIST_ACTRESULT2");
          reject(error)
          console.log(error);
        });
      });
    },
    async listactseason1({ commit, dispatch }, Obj) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
       axios
        .get(`/api/machineactseason1/${Obj.idmachine}/${Obj.year}`)
         .then(({ data }) => {
          commit("SET_LIST_ACTRESULT1", data);
          resolve({ data });
        })
         .catch(error => {
          commit("CLEAR_LIST_ACTRESULT1");
          reject(error)
          console.log(error);
        });
      });
    },
    async listactseason2 ({ commit, dispatch }, Obj) {
      // const userId = localStorage.getItem("userId");

      return new Promise((resolve, reject) => {
       axios
        .get(`/api/machineactseason2/${Obj.idmachine}/${Obj.year}`)
         .then(({ data }) => {
          commit("SET_LIST_ACTRESULT2", data);
          resolve({ data });
        })
         .catch(error => {
          commit("CLEAR_LIST_ACTRESULT2");
          reject(error)
          console.log(error);
        });
      });
    },
    async addmachineact ({ commit, dispatch }, machineact) {
      const postdata = {
        listmachineact: machineact
      };

      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createmachineact`, postdata)
          .then(({ status }) => {
            if (status === 201) {
              resolve({ status });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  getters: {
    listmachineacts: state => state.listmachineact,
    listactresultseasons1: state => state.listactresultseason1,
    listactresultseasons2: state => state.listactresultseason2

  }
};
