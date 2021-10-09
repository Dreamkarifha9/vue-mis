import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listdivision: [],
    statussave: null,
  },
  mutations: {
    SET_STATUS_SAVE(state, status) {
      state.statussave = status;
    },
    SET_LIST_DIVISIONALL(state, division) {
      state.listdivision = division;
    },
    SET_CLEAR_DIVISION (state) {
      state.listdivision = []
    }
  },
  actions: {
    async createdivision ({ commit, dispatch }, division) {
      console.log('division',division)
      return new Promise((resolve, reject) => {
        axios
          .post(`/api/createdivision`, division)
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
    async updatedivision({ commit, dispatch }, division) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          divisionname: division.divisionname
        };
        axios
          .put("/api/updatedivision/" + division.id, postData)
          .then(({ status }) => {
            console.log('status', status)
            if (status === 200) {
              resolve({ status });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async listdivisionall({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/division`)
        .then(({ data }) => {
          commit("SET_LIST_DIVISIONALL", data);
        })
        .catch(error => {
          console.log(error);
        });
    },

  },
  getters: {
    listdivisions: state => state.listdivision,
  }
};
