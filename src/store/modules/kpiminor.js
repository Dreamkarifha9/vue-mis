import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listkpiminorall: [],
    statussave: null,
    listimgekpiminor: []
  },
  mutations: {
    SET_STATUS_SAVE(state, status) {
      state.statussave = status;
    },
    SET_LIST_KPIMINORALL(state, kpiminor) {
      state.listkpiminorall = kpiminor;
    },
    SET_LIST_KPIMINORIMG(state, kpiminor) {
      state.listimgekpiminor = kpiminor;
    }
  },
  actions: {
    async createimageskpiminor({ commit, dispatch }, minorimg) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createkpiminorimg`, minorimg)
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
    async addkpiminor({ commit, dispatch }, minor) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createkpiminor`, minor)
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
    async listkpiminorall({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/kpiminorall`)
        .then(({ data }) => {
          commit("SET_LIST_KPIMINORALL", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getimages({ commit, dispatch }, idmachine) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`api/kpiminorgetimages/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_KPIMINORIMG", data);
        })
        .catch(error => {
          commit("SET_CLEAR_IMAGE");
        });
    },
    async deletekpiminorimages({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/kpiminorimagesdelete/${machine}`)
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
    listimgekpiminors: state => state.listimgekpiminor,
    listkpiminoralls: state => state.listkpiminorall
  }
};
