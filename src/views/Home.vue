<template>
<mainlaout></mainlaout>
</template>

<script>
import mainlaout from "../components/Main/Main";
import LocalStorageService from "../service/LocalStorageService";
export default {
  components: {
    mainlaout
  },
  data: () => ({
    status: false,
    eventsource: null,
    urldefualt: "http://192.168.10.148:8000/"
  }),
  created() {
    // console.log(this.status);
    // this.initializeServerSentEvent();
  },
  methods: {
    // initializeServerSentEvent() {
    //   const localStorageService = LocalStorageService.getService();
    //   const userid = localStorageService.getUserId();
    //   let vm = this;
    //   this.eventsource = new EventSource(
    //     //"http://192.168.14.22:7000/api/messages"
    //     `${this.urldefualt}api/messages/${userid}`
    //   );
    //   this.eventsource.onmessage = async function(messageEvent) {
    //     var eventMsg = messageEvent.data;
    //     let convertstring = JSON.parse(eventMsg);
    //     let msg = convertstring.msg;
    //     let val = convertstring.value;
    //     if (msg === "connected") {
    //       this.status = true;
    //       console.log(val);
    //       vm.processid = val;
    //     }
    //   };
    // }
  },
  mounted() {
    // this.eventsource.onmessage = async function(messageEvent) {
    //   var eventMsg = messageEvent.data;
    //   let convertstring = JSON.parse(eventMsg);
    //   let msg = convertstring.msg;
    //   let val = convertstring.value;
    //   console.log(msg);
    // };
    // ต้องมาดัก การตอบกลับของ serverevent นะจ๊ะ
  }
};
</script>

<style></style>
