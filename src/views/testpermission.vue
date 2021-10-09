<template>
  <div id="PlanDue">
    <h1>Plan Due</h1>
    <template>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      >
        <template>
          <div class="bb3">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb3">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb2">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb2">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb2">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
        <template>
          <div class="bb">0</div>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "PlanDue",
  data() {
    return {
      headers: [
        {
          text: "กิจกรรม/วัน ",
          align: "start",
          sortable: false,
          value: "name"
         
        },
        { text: "1", value: "d1", width: "25px",align: "center"},
        { text: "2", value: "d2", width: "25px",align: "center"},
        { text: "3", value: "d3", width: "25px",align: "center"},
        { text: "4", value: "d4", width: "25px",align: "center"},
        { text: "5", value: "d5", width: "25px",align: "center"},
        { text: "6", value: "d6", width: "25px",align: "center"},
        { text: "7", value: "d7", width: "25px",align: "center"},
        { text: "8", value: "d8", width: "25px",align: "center"},
        { text: "9", value: "d9", width: "25px",align: "center"},
        { text: "10", value: "d10", width: "25px",align: "center"},
        { text: "11", value: "d11", width: "25px",align: "center"},
        { text: "12", value: "d12", width: "25px",align: "center"},
        { text: "13", value: "d13", width: "25px",align: "center"},
        { text: "14", value: "d14", width: "25px",align: "center"},
        { text: "15", value: "d15", width: "25px",align: "center"},
        { text: "16", value: "d16", width: "25px",align: "center"},
        { text: "17", value: "d17", width: "25px",align: "center"},
        { text: "18", value: "d18", width: "25px",align: "center"},
        { text: "19", value: "d19", width: "25px",align: "center"},
        { text: "20", value: "d20", width: "25px",align: "center"},
        { text: "21", value: "d21", width: "25px",align: "center"},
        { text: "22", value: "d22", width: "25px",align: "center"},
        { text: "23", value: "d23", width: "25px",align: "center"},
        { text: "24", value: "d24", width: "25px",align: "center"},
        { text: "25", value: "d25", width: "25px",align: "center"},
        { text: "26", value: "d26", width: "25px",align: "center"},
        { text: "27", value: "d27", width: "25px",align: "center"},
        { text: "28", value: "d28", width: "25px",align: "center"},
        { text: "29", value: "d29", width: "25px",align: "center"},
        { text: "30", value: "d30", width: "25px",align: "center"},
        { text: "31", value: "d31", width: "25px",align: "center"},
      ],
      desserts: [
        {
          name: "ตรวจความยาว ของสายพานส่งกำลัง",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
          d8: "",
          d9: "",
          d10: "",
          d11: "",
          d12: "",
          d13: "",
          d14: "",
          d15: "",
          d16: "",
          d17: "",
          d18: "",
          d19: "",
          d20: "",
          d21: "",
          d22: "",
          d23: "",
          d24: "",
          d25: "",
          d26: "",
          d27: "",
          d28: "",
          d29: "",
          d30: "",
          d31: "",
        },
        {
          name: "ตรวจอุณหภูมิ ของสายพานส่งกำลัง ในขณะขับเคลื่อน",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
          d8: "",
          d9: "",
          d10: "",
          d11: "",
          d12: "",
          d13: "",
          d14: "",
          d15: "",
          d16: "",
          d17: "",
          d18: "",
          d19: "",
          d20: "",
          d21: "",
          d22: "",
          d23: "",
          d24: "",
          d25: "",
          d26: "",
          d27: "",
          d28: "",
          d29: "",
          d30: "",
          d31: "",
        },
         {
          name: "ตรวจอุณหภูมิ ของสายพานส่งกำลัง ในขณะขับเคลื่อน",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
          d8: "",
          d9: "",
          d10: "",
          d11: "",
          d12: "",
          d13: "",
          d14: "",
          d15: "",
          d16: "",
          d17: "",
          d18: "",
          d19: "",
          d20: "",
          d21: "",
          d22: "",
          d23: "",
          d24: "",
          d25: "",
          d26: "",
          d27: "",
          d28: "",
          d29: "",
          d30: "",
          d31: "",
        }
      ],
    };
  },
};
</script>
<style scoped>
.bb {
  background-color: orange;
  color: black;
}
.bb2 {
  background-color: red;
  color: blck;
}
.bb3 {
  background-color: rgb(58, 209, 58);
  color: rgb(58, 209, 58);
}
.v-data-table >>> .text-center {
  padding: 0 5px !important;
  border:thin solid;
  
}
.v-data-table >>> .text-start {
  padding: 0 5px !important;
  border:thin solid;
  
}

.v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgb(233, 248, 211);
}
</style>