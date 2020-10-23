import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listkpimainall: [],
    statussave: null,
    listimgekpimain: []
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
    async addkpimain({ commit, dispatch }, kpimain) {
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
    async getimages({ commit, dispatch }, idmachine) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`api/kpimaingetimages/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_KPIMAINIMG", data);
        })
        .catch(error => {
          commit("SET_CLEAR_IMAGE");
        });
    },
    async deletekpimainimages({ commit, dispatch }, machine) {
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
    listimgekpimains: state => state.listimgekpimain,
    listkpimainalls: state => state.listkpimainall
  }
};
