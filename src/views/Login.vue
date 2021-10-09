<template>
  <signup></signup>
</template>

<script>
import signup from "../components/auth/signup";
export default {
  components: {
    signup
  },
  created() {
    this.$store.dispatch("user/logout");
    console.log('innnnnnlogin')
  }
};
</script>

<style></style>
