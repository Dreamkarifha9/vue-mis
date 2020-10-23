<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ dialogs.header }}</v-card-title>
        <v-card-text>{{ dialogs.text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.prevent="onclickdialog(true)"
            >ตกลง</v-btn
          >
          <v-btn color="error" @click.prevent="onclickdialog(false)"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dialogconfirm",

  computed: {
    ...mapGetters({
      dialogs: "ui/dialog",
      resultdialog: "ui/resultdialog"
    }),
    dialog: {
      get() {
        return this.$store.getters["ui/dialog"].display;
      },
      set(value) {
        this.$store.commit("ui/set_dialog", {
          display: false
        });
      }
    },
    result: {
      get() {
        return this.$store.getters["ui/resuldialog"].resultdialog;
      },
      set(value) {
        this.$store.commit("ui/set_resultdialog", {
          resultdialogs: value
        });
      }
    }
  },

  methods: {
    onclickdialog(action) {
      if (action == true) {
        this.dialog = false;
        this.result = true;
        this.$store.commit("ui/set_resultdialog", {
          resultdialogs: true
        });
      } else if (action == false) {
        this.dialog = false;
        this.result = false;
        this.$store.commit("ui/set_resultdialog", {
          resultdialogs: false
        });
      }
    }
  }
};
</script>

<style></style>
