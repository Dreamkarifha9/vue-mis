import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listmachinegroup: []
  
  },
  mutations: {
    SET_LIST_MACHINEGROUPALL(state, machinegroup) {
      state.listmachinegroup = machinegroup;
    }
  },
  actions: {
    async addregisteract ({ commit, dispatch }, registeract) {
      const userId = localStorage.getItem("userId");
      const postData = {
        actcode: registeract.actcode,
        description: registeract.description,
        duratypeid: registeract.duratypeid,
        is_active: registeract.is_active,
        machinedetailsid: registeract.machinedetailsid,
        result_json: registeract.result_json,
        update_by: userId
      };
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createregisteract`, postData)
          .then(({ status }) => {
            if (status === 201) {
              resolve({ status });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async listremachinegroupall({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`api/machinegroup`)
        .then(({ data }) => {
          commit("SET_LIST_MACHINEGROUPALL", data);
          resolve(data)
        })
          .catch(error => {
          reject(error)
          console.log(error);
        });
      });
     
    },
    async deleteregisteract({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/kpimainimagesdelete/${machine}`)
          .then(({ status }) => {
            if (status === 200) {
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
    listmachinegroups: state => state.listmachinegroup
  }
};
