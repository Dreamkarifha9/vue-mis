import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listdailyreportall: [],
    statussave: null,
    listimgedailyreport: []
  },
  mutations: {
    SET_STATUS_SAVE(state, status) {
      state.statussave = status;
    },
    SET_LIST_DAILYREPORTALL(state, dailyreport) {
      state.listdailyreportall = dailyreport;
    },
    SET_LIST_DAILYREPORTIMG(state, dailreportimg) {
      state.listimgedailyreport = dailreportimg;
    },
    SET_CLEAR_IMAGE (state) {
      state.listimgedailyreport = []
    }
  },
  actions: {
    async createimagesdailyreport({ commit, dispatch }, dailyreportimg) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createdailyreportimg`, dailyreportimg)
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
    async adddailyreport({ commit, dispatch }, dailyreport) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createdailyreport`, dailyreport)
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
    async listdailyreportfristpage({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`/api/dailyreportfristpage`)
        .then(({ data }) => {
          commit("SET_LIST_DAILYREPORTALL", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
      });
      
    },
    async listdailyreport({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`/api/dailyreportall`)
        .then(({ data }) => {
          commit("SET_LIST_DAILYREPORTALL", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
     });
     
    },
    async getdailyreportone({ commit, dispatch }, datecurrent) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`/api/dailyreportone/${datecurrent}`)
        .then(({ data }) => {
          commit("SET_LIST_DAILYREPORTALL", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
    });
     
    },
    async getimages ({ commit, dispatch }, idmachine) {
      console.log('getimages', idmachine)
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`api/dailyreportgetimages/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_DAILYREPORTIMG", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
   });
    },
    async deletedailyreportimages({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/dailyreportimagesdelete/${machine}`)
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
    listimgedailyreports: state => state.listimgedailyreport,
    listdailyreportalls: state => state.listdailyreportall
  }
};
