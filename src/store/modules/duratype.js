import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listduratypall: []
  
  },
  mutations: {
    SET_LIST_DERATYPEALL(state, duratype) {
      state.listduratypall = duratype;
    }
  },
  actions: {
    async listduratypealll({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
       axios
        .get(`api/duratype`)
        .then(({ data }) => {
          commit("SET_LIST_DERATYPEALL", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
     });
    },
  },
  getters: {
    listduratypes: state => state.listduratypall
  }
};
