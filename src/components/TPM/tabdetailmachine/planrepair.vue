<template>
<v-card flat class="mx-auto" max-width="auto">
  <v-container>
    <v-form>
      <v-row>
        <v-flex xs12 md12>
          <v-container fill-height fluid>
            <v-card primary-title class="justify-center text-center">
              <v-window v-model="onboarding1" reverse>
                <v-window-item v-for="n in lengthimg1" :key="`card-${n}`">
                  <v-img lazy-src="https://picsum.photos/id/11/10/6" class="white--text align-end" max-width="1400" max-height="850" :src="image1">
                    <v-card-title>รายละเอียดรูป</v-card-title>
                  </v-img>
                </v-window-item>
              </v-window>

              <v-card-actions class="justify-space-between ">
                <v-btn text @click="prev1">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-item-group v-model="onboarding1" class="text-center" mandatory>
                  <v-item v-for="n in lengthimg1" :key="`btn-${n}`" v-slot:default="{ active, toggle }">
                    <v-btn :input-value="active" icon @click="toggle">
                      <v-icon>mdi-record</v-icon>
                    </v-btn>
                  </v-item>
                </v-item-group>
                <v-btn text @click="next1">
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-container>
        </v-flex>
      </v-row>
    </v-form>
  </v-container>
</v-card>
</template>

<script>
import {
  mapGetters,
  mapState
} from "vuex";
export default {
  data: () => ({
    lengthimg1: 0,
    onboarding1: 0,
    image1: "",
    // urldefualt: "http://192.168.14.22:8000/",
    urldefualt: process.env.VUE_APP_URL
  }),
  created() {},
  mounted() {
    if (this.listplanseason1.length > 0) {
      this.image1 = `${this.urldefualt}api/imagesplan/`.concat(
        this.listplanseason1[0].pathimage
      );
    }
    this.lengthimg1 = this.listplanseason1.length;
  },
  computed: {
    ...mapGetters({
      resultdialog: "ui/resultdialog",
      listplanseason1: "tpm/listplanseason1",
      listimageplan: "tpm/listimagesplans"
    }),
    formimage() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machinedetail.idmachine,
        name: this.machinedetail.name,
        orders: this.machinedetail.orders,
        seasonid: this.seasonmachine.id
      };
    },
    form2() {
      // comment  >> ใช้ return ค่าให้กับ method customerHandlersubmit
      return {
        idmachine: this.machinedetails.idmachine,
        name: this.machinedetails.name,
        orders: this.machinedetails.orders
      };
    }
  },
  watch: {
    listimageplan() {
      var listimg1 = this.listimageplan.filter(el => {
        return el.seasonid == 1;
      });

      this.lengthimg1 = listimg1.length;
    },
    onboarding1(val) {
      // console.log("arraytest  " + newarray[0].id);
      if (val < this.listplanseason1.length) {
        this.image1 = "";
        this.image1 = `${this.urldefualt}api/imagesplan/`.concat(
          this.listplanseason1[val].pathimage
        );
      }
    }
  },
  methods: {
    next1() {
      this.onboarding1 =
        this.onboarding1 + 1 === this.length1 ? 0 : this.onboarding1 + 1;
    },
    prev1() {
      this.onboarding1 =
        this.onboarding1 - 1 < 0 ? this.length1 - 1 : this.onboarding1 - 1;
    }
  }
};
</script>

<style></style>
