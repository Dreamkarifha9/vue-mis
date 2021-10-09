import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listmachineactresult: [],
  },
  mutations: {
    SET_LIST_MACHINEACTRESULT(state, machineactresult) {
      state.listmachineactresult = machineactresult;
    },
    CLEAR_LIST_MACHINEACTRESULT (state) {
      state.listmachineactresult = []
    }
  },
  actions: {
    async listmachineactresultfindmactidAnddodate({ commit, dispatch }, Obj) {
      // const userId = localStorage.getItem("userId");
 
      return new Promise((resolve, reject) => {
       axios
        .get(`/api/machineactresultMactidAndDodate/${Obj.mactid}/${Obj.dodate}`)
         .then(({ data }) => {
           console.log(data)
          commit("SET_LIST_MACHINEACTRESULT", data);
          resolve({ data });
        })
         .catch(error => {
          commit("CLEAR_LIST_MACHINEACTRESULT");
          reject(error)
        });
      });
    },
  },
  getters: {
    listmachineactresults: state => state.listmachineactresult,
  }
};
