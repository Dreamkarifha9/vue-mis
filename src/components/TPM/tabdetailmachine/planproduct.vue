<template>
  <v-card flat class="mx-auto" max-width="auto">
    <v-container>
      <v-form>
        <v-row>
          <v-flex xs12 md12>
            <v-container fill-height fluid>
              <v-card primary-title class="justify-center text-center">
                <v-window v-model="onboarding2" reverse>
                  <v-window-item v-for="n in lengthimg2" :key="`card-${n}`">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      class="white--text align-end"
                      max-width="1400"
                      max-height="850"
                      :src="image2"
                    >
                      <v-card-title>รายละเอียดรูป</v-card-title>
                    </v-img>
                  </v-window-item>
                </v-window>

                <v-card-actions class="justify-space-between ">
                  <v-btn text @click="prev2">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-item-group
                    v-model="onboarding2"
                    class="text-center"
                    mandatory
                  >
                    <v-item
                      v-for="n in lengthimg2"
                      :key="`btn-${n}`"
                      v-slot:default="{ active, toggle }"
                    >
                      <v-btn :input-value="active" icon @click="toggle">
                        <v-icon>mdi-record</v-icon>
                      </v-btn>
                    </v-item>
                  </v-item-group>
                  <v-btn text @click="next2">
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
import { mapGetters, mapState } from "vuex";
export default {
  data: () => ({
    lengthimg2: 0,
    onboarding2: 0,
    image2: "",
    // urldefualt: "http://192.168.14.22:8000/",
    urldefualt: process.env.VUE_APP_URL
  }),
  mounted() {
    if (this.listplanseason2.length > 0) {
      this.image2 = `${this.urldefualt}api/imagesplan/`.concat(
        this.listplanseason2[0].pathimage
      );
    }
    this.lengthimg2 = this.listplanseason2.length;
  },
  computed: {
    ...mapGetters({
      resultdialog: "ui/resultdialog",
      listplanseason2: "tpm/listplanseason2",
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
      var listimg2 = this.listimageplan.filter(el => {
        return el.seasonid == 2;
      });
      this.lengthimg2 = listimg2.length;
    },
    onboarding2(val) {
      if (val < this.listplanseason2.length) {
        this.image2 = "";
        this.image2 = `${this.urldefualt}api/imagesplan/`.concat(
          this.listplanseason2[val].pathimage
        );
      }
    }
  },
  methods: {
    next2() {
      this.onboarding2 =
        this.onboarding2 + 1 === this.length2 ? 0 : this.onboarding2 + 1;
    },
    prev2() {
      this.onboarding2 =
        this.onboarding2 - 1 < 0 ? this.length2 - 1 : this.onboarding2 - 1;
    }
  }
};
</script>

<style></style>
