export default {
  namespaced: true,
  state: {
    dialoginformation: {
      display: false,
      header: "แจ้งเตือน",
      text: "คุณต้องการลบข้อมูลใช่หรือไม่ ?",
      class: "confirm"
    },
    resultdialog: false,
    activetab: null
  },
  getters: {
    dialog: state => {
      return state.dialoginformation;
    },
    resultdialog: state => {
      return state.resultdialog;
    },
    resultactive: state => {
      return state.activetab;
    }
  },
  mutations: {
    set_dialog: (state, { display, text, header, alertClass }) => {
      state.dialoginformation.display = display;
      state.dialoginformation.text = text;
      state.dialoginformation.header = header;
      state.dialoginformation.class = alertClass;
    },
    set_resultdialog(state, resultdialog) {
      state.resultdialog = resultdialog;
    },
    set_activetab(state, tabname) {
      state.activetab = tabname;
    }
  },
  actions: {}
};
