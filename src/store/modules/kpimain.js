import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listkpimainall: [],
    statussave: null,
    listimgekpimain: [],
  
  },
  mutations: {
    SET_STATUS_SAVE(state, status) {
      state.statussave = status;
    },
    SET_LIST_KPIMAINALL(state, kpimain) {
      state.listkpimainall = kpimain;
    },
    SET_LIST_KPIMAINIMG(state, kpimain) {
      state.listimgekpimain = kpimain;
    },
    SET_CLEAR_IMAGE (state) {
      state.listimgekpimain = []
    }
  },
  actions: {
    async createimageskpimain({ commit, dispatch }, upimages) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createkpimainimg`, upimages)
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
    async addkpimain ({ commit, dispatch }, kpimain) {
      console.log('kpimain',kpimain)
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createkpimain`, kpimain)
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
    async listkpimainfristpage({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/kpimainfristpage`)
        .then(({ data }) => {
          commit("SET_LIST_KPIMAINALL", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listkpimainall({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/kpimainall`)
        .then(({ data }) => {
          commit("SET_LIST_KPIMAINALL", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listkpimainalldivision({ commit, dispatch }, id) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
       axios
        .get(`/api/kpimainalldivision/${id}`)
        .then(({ data }) => {
          commit("SET_LIST_KPIMAINALL", data);
          resolve({ data });
        })
         .catch(error => {
          reject(error)
          console.log(error);
        });
      });
    },
    async listkpimainalldivisionstatus({ commit, dispatch }, id) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
       axios
        .get(`/api/kpimainalldivisionstatus/${id}`)
         .then(({ data }) => {
          commit("SET_LIST_KPIMAINALL", data);
          resolve({ data });
        })
         .catch(error => {
          reject(error)
          console.log(error);
        });
      });
    },
    async listkpimainalldivisionstatusall({ commit, dispatch }, id) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
       axios
        .get(`/api/kpimainalldivisionstatusall/${id}`)
         .then(({ data }) => {
          commit("SET_LIST_KPIMAINALL", data);
          resolve({ data });
        })
         .catch(error => {
          reject(error)
          console.log(error);
        });
      });
    },
    async getimages({ commit, dispatch }, idmachine) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`api/kpimaingetimages/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_KPIMAINIMG", data);
        })
        .catch(error => {
          console.log('error',error)
          commit("SET_CLEAR_IMAGE");
        });
    },
    async deletekpimainimages({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/kpimainimagesdelete/${machine}`)
          .then(({ status }) => {
            if (status === 200) {
              console.log('status', status)
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
    listimgekpimains: state => state.listimgekpimain,
    listkpimainalls: state => state.listkpimainall
  }
};
