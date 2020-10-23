import axios from "../../service/axios-auth";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    profile: {},
    token: localStorage.getItem("access_token") || null,
    currentUser: {},
    errors: null,
    roles: null
  },
  mutations: {
    SET_ROLE(state, roles) {
      state.roles = roles;
    },
    SET_USERS(state, users) {
      state.profile = users;
    },
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      state.token = user.token;
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      state.token = null;
      state.profile = {};
      state.errors = null;
    }
  },
  actions: {
    login({ commit }, authdata) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/login", {
            username: authdata.username,
            password: authdata.password
          })
          .then(({ data, status }) => {
            if (status === 200) {
              console.log(data);
              const now = new Date();
              const expirationDate = new Date(data.expiresIn);
              commit("LOGOUT_USER");
              localStorage.removeItem("expirationDate");
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              localStorage.removeItem("userId");
              //clear localstorage
              localStorage.setItem("access_token", data.token);
              localStorage.setItem("refresh_token", data.refreshToken);
              localStorage.setItem("userId", data.data.user_id);
              localStorage.setItem("expirationDate", expirationDate);
              //set Role
              localStorage.setItem("roles", data.data.roles);
              commit("SET_CURRENT_USER", data);
              resolve(true);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async Loadroles({ commit, dispatch }, userid) {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/getuserroles/" + userid)
          .then(({ data }) => {
            commit("SET_ROLE", data);
            resolve(true);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
    logout({ commit }) {
      commit("LOGOUT_USER");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.replace("/");
      // return new Promise((resolve, reject) => {
      //   axios
      //     .get("/api/closeconnect")
      //     .then(({ data }) => {
      //       commit("LOGOUT_USER");
      //       localStorage.removeItem("expirationDate");
      //       localStorage.removeItem("access_token");
      //       localStorage.removeItem("refresh_token");
      //       localStorage.removeItem("token");
      //       localStorage.removeItem("userId");
      //       router.replace("/");
      //       resolve(true);
      //     })
      //     .catch(error => {
      //       console.log(error);
      //       reject(error);
      //     });
      // });
    },
    refreshlogin({ commit }) {
      commit("LOGOUT_USER");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
    },
    async loadUser({ commit, state }) {
      if (!state.token) {
        return;
      }
      commit("SET_USERS", state.currentUser.data);
    },
    refreshtoken({ commit, dispatch }, Inforefrestoken) {
      return new Promise((resolve, reject) => {
        const refrestokens = {
          refreshToken: Inforefrestoken.refreshToken,
          userId: Inforefrestoken.userId
        };
        axios
          .post("/api/refreshtoken", refrestokens)
          .then(response => {
            console.log(response.data);
            resolve(response.data);
          })
          .catch(error => {
            console.log("66");
            console.log(error);
            reject(error);
          });
      });
    },
    tryAutoLogin({ commit, state }) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }

      // try login from created  app.vue
      commit("SET_CURRENT_USER", state.currentUser);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== null;
    },
    errors: state => state.errors,
    profiles: state => state.profile
  }
};
