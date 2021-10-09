import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listncrall: [],
    statussave: null,
    listimgencr: []
  },
  mutations: {
    SET_STATUS_SAVE(state, status) {
      state.statussave = status;
    },
    SET_LIST_NCRALL(state, ncr) {
      state.listncrall = ncr;
    },
    SET_LIST_NCRIMG(state, dailreportimg) {
      state.listimgencr = dailreportimg;
    },
    SET_CLEAR_IMAGE (state) {
      state.listimgencr = []
    }
  },
  actions: {
    async createimagesncr({ commit, dispatch }, ncrimg) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createncrimg`, ncrimg)
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
    async addncr({ commit, dispatch }, ncr) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createncr`, ncr)
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
    async listncrfristpage({ commit, dispatch },idmachine) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`/api/ncrfristpage/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_NCRALL", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
      });
      
    },
    async listncr({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`/api/ncrall`)
        .then(({ data }) => {
          commit("SET_LIST_NCRALL", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
     });
     
    },
    async getncrone({ commit, dispatch }, datecurrent) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`/api/ncrone/${datecurrent}`)
        .then(({ data }) => {
          commit("SET_LIST_NCRALL", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
    });
     
    },
    async getimages({ commit, dispatch }, idmachine) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`api/ncrgetimages/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_NCRIMG", data);
          resolve(data)
        })
           .catch(error => {
          commit("SET_CLEAR_IMAGE")
          console.log(error);
          reject(error)
        });
   });
    },
    async deletencrimages({ commit, dispatch }, ncrimgid_) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/ncrimagesdelete/${ncrimgid_}`)
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
    listimgencrs: state => state.listimgencr,
    listncralls: state => state.listncrall
  }
};
