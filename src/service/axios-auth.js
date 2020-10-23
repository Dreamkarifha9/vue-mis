import axios from "axios";
import store from "../store";
import LocalStorageService from "../service/LocalStorageService";
//ประกาศ const รอไปใช้งาน
const localStorageService = LocalStorageService.getService();

// axios.defaults.baseURL = "http://localhost:4444/";

// axios.defaults.baseURL = "http://192.168.14.22:8000";
axios.defaults.baseURL = process.env.VUE_APP_URL;

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

//Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorageService.getAccessToken();
    const roles = localStorageService.getroles();
    const userid = localStorageService.getUserId();

    // if (userid) {
    //   store
    //     .dispatch("user/Loadroles", userid)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (roles) {
      config.headers["user"] = JSON.stringify({
        userid: userid,
        roles: roles
      });
    }
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const {
      config,
      response: { status }
    } = error;
    const originalRequest = config;
    if (status === 401) {
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        const refreshToken = localStorageService.getRefreshToken();
        const UserId = localStorageService.getUserId();
        const data_refresh = { refreshToken: refreshToken, userId: UserId };
        store.dispatch("user/refreshtoken", data_refresh).then(token => {
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(token);
          console.log(token);
          localStorageService.setToken(token);
        });
      }
      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber(access_token => {
          originalRequest.headers.Authorization = "Bearer " + access_token;
          resolve(axios(originalRequest));
        });
      });
      return retryOriginalRequest;
    } else if (status === 403) {
      Promise.reject(error.response); //ส่ง reponse object ออกไปเพื่อนำไปใช้งานต่อ
    }
    return Promise.reject(error);
  }
);

export default axios;
