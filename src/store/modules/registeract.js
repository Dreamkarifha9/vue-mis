import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listregisteract: [],
    listregisteractmachinegroupid: []
  },
  mutations: {
    SET_LIST_REGISTERALL(state, registeract) {
      state.listregisteract = registeract;
    },
    SET_LIST_REGISTERMACHINEGROUPID (state, machinegroupid) {
      state.listregisteractmachinegroupid = machinegroupid
    },
    SET_CLEAR_REGISTERMACHINEGROUPID (state) {
      state.listregisteractmachinegroupid = []
    }
  },
  actions: {
    async testadd ({ commit, dispatch }, addtest) {
      const postData = {
        listregister:addtest
      };
      return new Promise((resolve, reject) => {
        axios
          .post("/api/createregisteracttest", postData)
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
    async clearregistermachinegroupid ({ commit }) {
      commit("SET_CLEAR_REGISTERMACHINEGROUPID");
    },
    async addregisteract ({ commit, dispatch }, registeract) {
      const userId = localStorage.getItem("userId");
      const postData = {
        actcode: registeract.actcode,
        description: registeract.description,
        standard: registeract.standard,
        duratypeid: registeract.duratypeid,
        is_active: registeract.is_active,
        machinedetailsid: registeract.machinedetailsid,
        checkyear: registeract.checkyear,
        result_type: registeract.result_type,
        machinegroupid: registeract.machinegroupid,
        monthcurrent: registeract.monthcurrent,
        season_id: registeract.season_id,
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
    async updateregisteract({ commit, dispatch }, registeract) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          standard: registeract.standard,
          description: registeract.description,
          update_by: userId
        };
        axios
          .put("/api/updatregisteract/" + registeract.id, postData)
          .then(({ status }) => {
            if (status === 200) {
              resolve({ status });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async listregistermachinegroupid ({ commit, dispatch }, payload) {

      await axios
      .get(`/api/getregisteractmachinegroupid/${payload.machinegroupid}/${payload.seasonid}`)
      .then(({ data }) => {
        commit("SET_LIST_REGISTERMACHINEGROUPID", data);
      })
        .catch(error => {
          commit("SET_LIST_REGISTERMACHINEGROUPID", []);
        console.log(error);
      });
    },
    async listregisteractfristpage({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`api/getregisteractfristpage`)
           .then(({ data }) => {
             console.log(data)
             commit("SET_LIST_REGISTERALL", data);
             resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
      });
    },
    async listregisteractall({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`/api/getregisteract`)
           .then(({ data }) => {
             commit("SET_LIST_REGISTERALL", data);
             resolve(data)
        })
        .catch(error => {
          console.log(error);
        });
      });
    },
    async listregisteractofsetall({ commit, dispatch }, payload) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get(`/api/getregisteractoffset/${payload.offset}/${payload.limit}`)
           .then(({ data }) => {
             commit("SET_LIST_REGISTERALL", data);
             resolve(data)
        })
        .catch(error => {
          console.log(error);
        });
      });
    },
    async deleteregisteract ({ commit, dispatch }, registeract) {
      console.log(registeract)
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/deleteregisteract/${registeract}`)
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
    listregisteracts: state => state.listregisteract,
    listregisteractmachinegroupids: state => state.listregisteractmachinegroupid
  }
};
