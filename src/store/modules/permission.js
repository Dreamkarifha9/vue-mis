import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listpermission: [],
    listmenu: [],
    listmenuchild: [],
    listpermissiontable: [],
    listcurrentpermission: [],
  },
  mutations: {
    SET_LIST_PERMISSION (state, permission) {
      var permissionlist = []
      state.listpermission = [];
      for (let item of permission) {
        state.listpermission.push(item.menuchildeng);
      }
    },
    SET_LIST_MENU (state, menu) {
      state.listmenu = menu
    },
    SET_LIST_MENUCHILD (state, menuchild) {
      state.listmenuchild  = menuchild
    },
    SET_LIST_PERMISSIONTABLE (state, permission) {
      state.listpermissiontable = permission
    },
    CLEAR_LIST_PERMISSIONTABLE (state) {
      state.listpermissiontable = []
    },
  },
  actions: {
    async clearregistermachinegroupid ({ commit }) {
      commit("SET_CLEAR_REGISTERMACHINEGROUPID");
    },
    async addpermission ({ commit, dispatch }, permission) {
        const postdata = {
          listpermission: permission
      };
      console.log('postdata', postdata)
        return new Promise((resolve, reject) => {
          axios
            .post(`/api/createpermission`, postdata)
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
    async updatepermission ({ commit, dispatch }, permission) {
        console.log(permission)
        const postdata = {
          listpermission: permission
        };
        return new Promise((resolve, reject) => {
          axios
            .post(`/api/updatepermission`, postdata)
            .then(({ status }) => {
              console.log('status', status)
              if (status === 201) {
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
    async listpermissiontableall({ commit, dispatch }, userid) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/getpermissiontable/${userid}`)
        .then(({ data }) => {
          commit("SET_LIST_PERMISSIONTABLE", data);
        })
        .catch(error => {
          commit("CLEAR_LIST_PERMISSIONTABLE");
          console.log(error);
        });
    },
    async listpermissionall({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/getpermissionall`)
        .then(({ data }) => {
          console.log('data', data)
          commit("SET_LIST_PERMISSION", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listmenuall({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/getmenuall`)
        .then(({ data }) => {
          commit("SET_LIST_MENU", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listmenuchildall({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/getmenuchildall`)
        .then(({ data }) => {
          commit("SET_LIST_MENUCHILD", data);
        })
        .catch(error => {
          console.log(error);
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
    listpermissions: state => state.listpermission,
    listmenus: state => state.listmenu,
    listmenuchilds: state => state.listmenuchild,
    listpermissiontables: state => state.listpermissiontable,
    listcurrentpermissions: state => state.listcurrentpermission
  }
};
