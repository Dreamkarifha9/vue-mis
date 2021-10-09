import axios from "../../service/axios-auth";

export default {
  namespaced: true,
  state: {
    errors: null,
    listmachine: [],
    listmachinedetails: [],
    listsizename: [],
    listcapacityname: [],
    listpowername: [],
    listdivision: [],
    listimage: [],
    listseason: [],
    listimageplan: [],
    listimagehistory: [],
    listimageseason1: [],
    listimageseason2: [],
    statussave: null,
    listjson: [],
    listmachinegroupid: []
  },
  mutations: {
    SET_LIST_MACHINEGROUPID (state, machinegroup) {
      state.listmachinegroupid = machinegroup
    },
    SET_LIST_JSON (state, json_b) {
      state.listjson = json_b;
    },
    SET_STATUS_SAVE(state, status) {
      state.statussave = status;
    },
    SET_LIST_MACCHINE(state, machine) {
      state.listmachine = machine;
    },
    SET_LIST_MACCHINEDETIALS(state, machine) {
      state.listmachinedetails = machine;
    },
    
    SET_CLEARLIST_MACCHINEDETIALS(state) {
      state.listmachinedetails = [];
    },
    SET_LIST_SIZENAME(state, sizename) {
      state.listsizename = sizename;
    },
    SET_LIST_CAPACITYNAME(state, capacityname) {
      state.listcapacityname = capacityname;
    },
    SET_LIST_POWERNAME(state, powername) {
      state.listpowername = powername;
    },
    SET_LIST_DIVISION(state, divisionname) {
      state.listdivision = divisionname;
    },
    SET_LIST_SEASON(state, season) {
      state.listseason = season;
    },
    //Image เครื่องจักร
    SET_LIST_IMAGES(state, listimages) {
      state.listimage = listimages;
    },
    SET_CLEAR_IMAGE(state) {
      state.listimage = [];
    },
    //Image แผนบำรุง
    SET_LIST_IMAGESPLAN(state, listimageplan) {
      state.listimageplan = listimageplan;
    },
    SET_CLEAR_IMAGEPLAN(state) {
      state.listimageplan = [];
    },
    SET_LIST_IMAGESHISTORY(state, listimagehistory) {
      state.listimagehistory = listimagehistory;
    },
    SET_CLEAR_IMAGESHISTORY(state) {
      state.listimagehistory = [];
    },
    //Imageseason1
    SET_LIST_IMAGESPLANSEASON1(state, listimageplan) {
      state.listimageseason1 = listimageplan;
    },
    SET_CLEAR_IMAGEPLANSEASON1(state) {
      state.listimageseason1 = [];
    },
    //Imageseason2
    SET_LIST_IMAGESPLANSEASON2(state, listimageplan) {
      state.listimageseason2 = listimageplan;
    },
    SET_CLEAR_IMAGEPLANSEASON2(state) {
      state.listimageseason2 = [];
    }
  },
  actions: {
    async listmachinegroupbyid ({ commit, dispatch }, id) {
      await axios
      .get(`/api/machinefinbyid/${id}`)
        .then(({ data }) => {
        console.log('data', data)
        commit("SET_LIST_MACHINEGROUPID", data);
      })
      .catch(error => {
        console.log(error);
      });
    },
    async listjsontest({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/getjsonb`)
        .then(({ data }) => {
          commit("SET_LIST_JSON", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async createimghistory({ commit, dispatch }, upimages) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/createhistory", upimages)
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
    async createimagesplan({ commit, dispatch }, upimages) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/createplanimg", upimages)
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
    async createimages({ commit, dispatch }, upimages) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/createimages", upimages)
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
    async updateimages({ commit, dispatch }, upimages) {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/uploadimage/" + upimages.id, upimages)
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
    async addmachine({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          idmachine: machine.idmachine,
          namethai: machine.namethai,
          nameeng: machine.nameeng,
          sizemachine: machine.sizemachine,
          capacity: machine.capacity,
          power: machine.power,
          division: machine.division,
          point: machine.point,
          model: machine.model,
          nummachine: machine.nummachine,
          usejob: machine.usejob,
          capability: machine.capability,
          manufacturer: machine.manufacturer,
          machineinclude: machine.machineinclude,
          genration: machine.genration,
          energy: machine.energy,
          create_by: userId
        };
        axios
          .post("/api/createmachine", postData)
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
    async addmachinedetails({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          idmachine: machine.idmachine,
          orders: machine.orders,
          name: machine.name,
          unit: machine.unit,
          idproduct: machine.idproduct,
          w3: machine.w3,
          m1: machine.m1,
          m3: machine.m3,
          y1: machine.y1,
          y2: machine.y2,
          y3: machine.y3,
          oh: machine.oh,
          number: machine.number,
          create_by: userId
        };
        axios
          .post("/api/createmachinedetails", postData)
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
    async updatemachine({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          namethai: machine.namethai,
          nameeng: machine.nameeng,
          sizemachine: machine.sizemachine,
          capacity: machine.capacity,
          power: machine.power,
          division: machine.division,
          point: machine.point,
          model: machine.model,
          nummachine: machine.nummachine,
          usejob: machine.usejob,
          capability: machine.capability,
          manufacturer: machine.manufacturer,
          machineinclude: machine.machineinclude,
          genration: machine.genration,
          energy: machine.energy,
          update_by: userId
        };
        axios
          .put("/api/updatemachine/" + machine.idmachine, postData)
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
    async updatemachinedetails({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        const userId = localStorage.getItem("userId");
        const postData = {
          id: machine.id,
          idmachine: machine.idmachine,
          orders: machine.orders,
          name: machine.name,
          unit: machine.unit,
          idproduct: machine.idproduct,
          w3: machine.w3,
          m1: machine.m1,
          m3: machine.m3,
          y1: machine.y1,
          y2: machine.y2,
          y3: machine.y3,
          oh: machine.oh,
          number: machine.number,
          update_by: userId
        };
        axios
          .put("/api/updatededailsmachine/" + machine.id, postData)
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
    async listmachineFristpage({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get("/api/machineFristpage")
        .then(({ data }) => {
          commit("SET_LIST_MACCHINE", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listmachineAll({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get("/api/machine")
        .then(({ data }) => {
          commit("SET_LIST_MACCHINE", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listdivisionallbyid ({ commit, dispatch },iddivision) {
      await axios
      .get("/api/machinedivisionidall/" + iddivision)
      .then(({ data }) => {
        commit("SET_LIST_MACCHINE", data);
      })
      .catch(error => {
        console.log(error);
      });
    },
    async listmachinedetails({ commit, dispatch }, machine) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get("/api/machinedetailsall/" + machine)
        .then(({ data }) => {
          commit("SET_LIST_MACCHINEDETIALS", data);
        })
        .catch(error => {
          commit("SET_CLEARLIST_MACCHINEDETIALS")
          console.log(error);
        });
    },
    async listmachinedetailbyid({ commit, dispatch }, machineinput) {
      // const userId = localStorage.getItem("userId");
      const machine = {
        listmachine:machineinput
      }
      console.log('machine',machine)
      await axios
        .post("/api/machinedetailsallbyid" , machine)
        .then(({ data }) => {
          commit("SET_LIST_MACCHINEDETIALS", data);
        })
        .catch(error => {
          commit("SET_CLEARLIST_MACCHINEDETIALS")
          
          console.log(error);
        });
    },
    async listsizemachine({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get("/api/sizeall")
        .then(({ data }) => {
          commit("SET_LIST_SIZENAME", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listcapacitymachine({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get("/api/capacityall")
        .then(({ data }) => {
          commit("SET_LIST_CAPACITYNAME", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listpowermachine({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get("/api/powerall")
        .then(({ data }) => {
          commit("SET_LIST_POWERNAME", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listmachinfinbyid({ commit, dispatch }, machineid) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`/api/machinefinbyid/${machineid}`)
        .then(({ data }) => {
          commit("SET_LIST_MACCHINE", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listdivision({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get("/api/division")
        .then(({ data }) => {
          commit("SET_LIST_DIVISION", data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async listseason({ commit, dispatch }) {
      // const userId = localStorage.getItem("userId");
      return new Promise((resolve, reject) => {
         axios
        .get("api/season")
        .then(({ data }) => {
          commit("SET_LIST_SEASON", data);
          resolve(data)
        })
        .catch(error => {
          console.log(error);
          reject(error)
        });
      });
   
    },
    async getimages({ commit, dispatch }, idmachine) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`api/getimages/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_IMAGES", data);
        })
        .catch(error => {

          commit("SET_CLEAR_IMAGE");
        });
    },
    async getimageshistory({ commit, dispatch }, idmachine) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`api/getimageshistory/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_IMAGESHISTORY", data);
        })
        .catch(error => {
          commit("SET_CLEAR_IMAGESHISTORY");
        });
    },
    async getimagesplan({ commit, dispatch }, idmachine) {
      // const userId = localStorage.getItem("userId");
      await axios
        .get(`api/getimagesplan/${idmachine}`)
        .then(({ data }) => {
          commit("SET_LIST_IMAGESPLAN", data);
        })
        .catch(error => {
          commit("SET_CLEAR_IMAGEPLAN");
        });
    },
    async deletemachine({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/machine/" + machine.idmachine)
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
    async deletedetailsmachine({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/machinedetails/" + machine.id)
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
    async deleteimages ({ commit, dispatch }, machine) {
      
      console.log('machine',machine)
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/delectimages/" + machine)
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
    async deleteimagesplan({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/delectimagesplan/" + machine)
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
    async deleteimageshistory({ commit, dispatch }, machine) {
      return new Promise((resolve, reject) => {
        axios
          .delete("/api/delectimageshistory/" + machine)
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
    listall: state => state.listmachine,
    listmachinedetailsall: state => state.listmachinedetails,
    listsizenames: state => state.listsizename,
    listcapacitynames: state => state.listcapacityname,
    listpowernames: state => state.listpowername,
    listdivisions: state => state.listdivision,
    listimages: state => state.listimage,
    listseasons: state => state.listseason,
    listimagesplans: state => state.listimageplan,
    listimageshistorys: state => state.listimagehistory,
    listmachinegroupbyid: state => state.listmachinegroupid,
    listplanseason1: state => {
      let arrimg = state.listimageplan.filter(item => {
        return item.seasonid == 1;
      });
      return arrimg;
    },
    listplanseason2: state => {
      let arrimg = state.listimageplan.filter(item => {
        return item.seasonid == 2;
      });
      return arrimg;
    },
    listjsons: state => state.listjson
  }
};
