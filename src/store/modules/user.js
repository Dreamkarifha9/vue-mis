import axios from "../../service/axios-auth";
import router from "../../router";
import { GetAesString,GetDAesString } from '../../hook/crypto'
export default {
  namespaced: true,
  state: {
    profile: {},
    token: localStorage.getItem("access_token") || null,
    currentUser: [],
    errors: null,
    roles: null,
    userall: [],
    key: "dreamkarifha"
  },
  mutations: {
    SET_PERMISSION (state, data) {
      // const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      //   iv: CryptoJS.enc.Utf8.parse(iv),
      //   mode: CryptoJS.mode.CBC
      // });
      // console.log(GetAesString(data))
    },
    SET_ROLE(state, roles) {
      state.roles = roles;
    },
    SET_USERS(state, users) {
      state.profile = users;
    },
    SET_USERSALL (state, users) {
      state.userall = users
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
    SET_CURRENT_USER (state, user) {
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
              const now = new Date();
              const expirationDate = new Date(data.expiresIn);
              commit("LOGOUT_USER");
              console.log('data', data)
              
              localStorage.removeItem("expirationDate");
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              localStorage.removeItem("userId");
              //clear localstorage
              localStorage.setItem("access_token", data.token);
              localStorage.setItem("refresh_token", data.refreshToken);
              localStorage.setItem("userId", data.data[0].user_id);
              localStorage.setItem("username", data.data[0].username);

              localStorage.setItem("username", data.data[0].name);

              localStorage.setItem("expirationDate", expirationDate);
              //set Role
              localStorage.setItem("roles", data.data[0].roles);
              
              var currentyear = now.getFullYear();
              currentyear = currentyear + 543;

              localStorage.setItem("cy", currentyear);
        

              
              commit("SET_CURRENT_USER", data);

              commit("SET_PERMISSION", data.data[0].permission);

              
 

              localStorage.setItem("permission", GetAesString(data.data[0].permission.toString(), "dreamkarifha"))

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
      localStorage.removeItem("permission");
      localStorage.removeItem("user");
      localStorage.removeItem("roles"); 
      localStorage.removeItem("username");
      


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
    async loadUserall({ commit, dispatch }) {
      await axios
      .get(`/api/userall`)
        .then(({ data }) => {
        commit("SET_USERSALL", data);
      })
      .catch(error => {
        console.log(error);
      });
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
            resolve(response.data);
          })
          .catch(error => {
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
    },
    async updateusers({ commit, dispatch }, users) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          userid: users.user,
          permission: users.permission,
          update_by: userId
        };
        axios
          .post("/api/updateuser/" + users.user, postData)
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
    async updatepassword({ commit, dispatch }, users) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          user_id: users.user_id,
          password: users.password,
          update_by: userId
        };

        axios
          .post("/api/updatepassword/" + users.user_id, postData)
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
    async adduser({ commit, dispatch }, users) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          name: users.name,
          username: users.username,
          password: users.password,
          is_active: users.is_active,
          employee_id: users.employee_id,
          division: users.division,
          createby: userId
        };
        axios
          .post("/api/register", postData)
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
    isAuthenticated(state) {
      return state.token !== null;
    },
    errors: state => state.errors,
    profiles: state => state.profile,
    useralls: state => state.userall,
    currentUsers: state => state.currentUser
  }
};
