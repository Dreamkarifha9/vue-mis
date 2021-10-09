import { GetAesString,GetDAesString } from '../../src/hook/crypto'

const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem("access_token", tokenObj.token);
    localStorage.setItem("refresh_token", tokenObj.refreshToken);
  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getPermission () {
    const localstate = localStorage.getItem("permission");
    var listpermission;
    if (localstate) {
      listpermission = GetDAesString(localstate.toString(), "dreamkarifha")  //ดึงข้อมูล storerage มาถอดรหัส เพื่อส่งให้ VueQuickacl.js ตรวจสอบ permission
    }
    return listpermission
  }
  function _getUsername() {
    return localStorage.getItem("username");
  }
  function _getyear() {
    return localStorage.getItem("cy");
  }
  function _getRole() {
    return localStorage.getItem("roles");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  function _getUserId() {
    return localStorage.getItem("userId");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getYear: _getyear,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    getUserId: _getUserId,
    getroles: _getRole,
    getpermissions: _getPermission,
    getUsernames: _getUsername
  };
})();
export default LocalStorageService;
