<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-form ref="form" @submit.prevent="onSubmit()">
              <v-toolbar color="indigo darken-4" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  ref="username"
                  label="Login"
                  name="login"
                  prepend-icon="person"
                  type="text"
                  v-model="username"
                  :rules="[() => !!username || '*']"
                  :error-messages="errorMessages"
                ></v-text-field>

                <v-text-field
                  ref="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  v-model="password"
                  :rules="[() => !!password || '*']"
                  :error-messages="errorMessages"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import {
  mapGetters
} from "vuex";
  import { VueQuickAcl } from './../../hook/VueQuickAcl'
 import Vue from 'vue'
  Vue.use(VueQuickAcl)
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessages: "",
      formHasErrors: false
    };
  },
  computed: 
  {
    ...mapGetters({
      listpermissiontables: "permission/listpermissiontables",
      currentUsers: "user/currentUsers",
    }),
    form() {
      return {
        username: this.username,
        password: this.password
      };
    }
  },
  created() {
    this.$store.dispatch("user/refreshlogin");
    this.$nextTick(() => {
      this.$refs.username.focus();
    });
  },
  watch: {
    name() {
      this.errorMessages = "";
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        username: this.username,
        password: this.password
      };

      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });

      //ถ้าไม่มี error ให้ กด login
      if (!this.formHasErrors) {
        // dispatch หมายถึงสั่งให้ vuex  action ทำงาน
        this.$store
          .dispatch("user/login", formData)
          .then(() => {
            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "info",
                showing: true,
                timeout: 2000,
                text: "ยินดีต้อนรับ...เข้าสู่ระบบสำเร็จ !!"
              },
              { root: true }
            );
            this.$store.dispatch("permission/listpermissionall");
            this.$setUserPermissions(this.currentUsers.data[0].permission, false);
            
            this.$router.push({ name: "home" });
          })
          .catch(() => {
            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "error",
                showing: true,
                timeout: 3000,
                text: "ผิดพลาด...เข้าสู่ระบบไม่สำเร็จ !!"
              },
              { root: true }
            );
            Object.keys(this.form).forEach(f => {
              // reset เฉพาะ input password
              if (f === "password") {
                this.$refs[f].reset();
                this.$refs[f].focus();
              }
            });
            this.error = true;
          });
      }

      // this.$store.dispatch("login", formData).then(() => {
      //   this.$router.push("/Home");
      // });
    }
  }
};
</script>

<style></style>
