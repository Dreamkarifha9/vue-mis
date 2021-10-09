import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listrepairhistorymachine: [],
  },
  mutations: {
    SET_LIST_REPAIRHISTORYLISTALL(state, repairhistorylist) {
      state.listrepairhistorymachine = repairhistorylist;
    },
    CLEAR_LIST_REPAIRHISTORYLISTALL (state) {
      state.listrepairhistorymachine = []
    }
  },
  actions: {
    async listrepairhistorymachineall({ commit, dispatch }, idmachine) {
      // const userId = localStorage.getItem("userId");
 
      return new Promise((resolve, reject) => {
       axios
         .get(`/api/repairhistorymachineall/${idmachine}`)
         .then(({ data }) => {
           console.log(data)
          commit("SET_LIST_REPAIRHISTORYLISTALL", data);
          resolve({ data });
        })
         .catch(error => {
          commit("CLEAR_LIST_REPAIRHISTORYLISTALL");
          reject(error)
        });
      });
    },
    async createrepairhistorymachine({ commit, dispatch }, repairhistorymachine) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createrepairhistorymachine`, repairhistorymachine)
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
    async updaterepairhistorymachine({ commit, dispatch }, repairhistorymachine) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/updaterepairhistorymachine`, repairhistorymachine)
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
    async deletedocumentimg ({ commit, dispatch }, id) {
      console.log('id',id)
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/deletedoucmentimgrepairhistory/${id}`)
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
    async deletemoreimg ({ commit, dispatch }, id) {
      console.log('id',id)
      
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/deletemoreimgrepairhistory/${id}`)
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
  },
  getters: {
    listrepairhistorymachines: state => state.listrepairhistorymachine,
  }
};
