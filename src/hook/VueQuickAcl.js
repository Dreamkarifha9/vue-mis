
import {
  mapGetters
} from "vuex";
import LocalStorageService from "../service/LocalStorageService";


const VueQuickAcl = {
  
  install(Vue) {
    const bus = new Vue()
    let userPermissions = []
    console.log('Vue', Vue)
    if (userPermissions.length === 0) {
      userPermissions = LocalStorageService.getpermissions()  // ถ้า refresh หน้าให้ไปดึง permission มาใหม่
    } 
   
    let userIsAdmin = false
    Vue.prototype.$setUserPermissions = function (permissions, isAdmin = false) {
     const permission = 
      userIsAdmin = isAdmin
      userPermissions = permissions
      bus.$emit('quick-acl:update')
    }

    Vue.mixin({
      beforeCreate () {
        this.$forceUpdate = this.$forceUpdate.bind(this)
        bus.$on('quick-acl:update', () => {
          this.$forceUpdate
        })
      },
      beforeDestroy () {
        bus.$off('quick-acl:update', this.$forceUpdate)
      },
      methods: {
        $can(permission) {
          // if (userIsAdmin) {
          //   return true
          // }

          if (userPermissions.indexOf(permission) !== -1) {
            return true
          }
        }
      }
    })
  }
}

export { VueQuickAcl }
