<template>
  <v-card flat class="mx-auto" max-width="auto">
    <v-container>
      <v-form>
        <v-row>
          <v-col cols="12" sm="3" md="1" class="ml-2">
            <v-autocomplete
              ref="machineact"
              v-model="year"
              :items="itemsyear"
              :item-text="(item) => `${item.year}`"
              :item-value="(item) => `${item.year}`"
              label="ปีการผลิต"
              outlined
              @change="(event) => onChangeyear()"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-autocomplete
              ref="machineact"
              v-model="month"
              :items="itemsmonth"
              :item-text="(item) => `${item.month}`"
              :item-value="(item) => `${item.id}`"
              label="เดือน"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-autocomplete
              v-model="seasonid_"
              :items="listseason"
              :item-text="(item) => `${item.description}`"
              :item-value="(item) => `${item.value}`"
              label="ฤดูการผลิต"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="2" md="2">
            <v-autocomplete
              v-model="divisionFilterValue"
              label="ค้นหาตามแผนก"
              :items="listdivision"
              :item-value="(item) => `${item.id}`"
              :item-text="(item) => `${item.divisionname}`"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" md="3" class="mt-3">
            <v-badge
              bordered
              color="blue darken-4"
              icon="fas fa-search"
              overlap
            >
              <v-btn
                class="white--text blue darken-4"
                color="primary"
                depressed
                @click="searchall()"
              >
                ค้นหาตามรายปี
              </v-btn>
            </v-badge>
          </v-col>

          <v-flex xs12 md12 pl-4 pr-4>
            <div>
              <v-data-table
                v-if="listmachineacts.length > 0"
                :headers="headers"
                :items="listmachineacts"
                sort-by="orders"
                item-key="id"
                class="elevation-1"
              >
                <template v-slot:[`item.actmonth`]="{ item }">
                  {{ convertyear(item.actmonth) }}
                </template>
                <template v-slot:[`item.d1`]="{ item }">
                  <div
                    :class="
                      item.d1[0] === 'E'
                        ? 'E'
                        : item.d1[0] === 'P'
                        ? 'P'
                        : item.d1[0] === 'C'
                        ? 'C'
                        : item.d1[0] === 'F'
                        ? 'F'
                        : item.d1[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 1, item.d1[0])"
                  >
                    {{ item.d1[1] }}
                  </div>
                  <!-- {{item.d1[0] === "E" ? 'YES' : "NO"}}
                <v-icon @click="dayalert(item)">
                </v-icon> -->
                </template>
                <template v-slot:[`item.d2`]="{ item }">
                  <div
                    :class="
                      item.d2[0] === 'E'
                        ? 'E'
                        : item.d2[0] === 'P'
                        ? 'P'
                        : item.d2[0] === 'C'
                        ? 'C'
                        : item.d2[0] === 'F'
                        ? 'F'
                        : item.d2[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 2, item.d2[0])"
                  >
                    {{ item.d2[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d3`]="{ item }">
                  <div
                    :class="
                      item.d3[0] === 'E'
                        ? 'E'
                        : item.d3[0] === 'P'
                        ? 'P'
                        : item.d3[0] === 'C'
                        ? 'C'
                        : item.d3[0] === 'F'
                        ? 'F'
                        : item.d3[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 3, item.d3[0])"
                  >
                    {{ item.d3[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d4`]="{ item }">
                  <div
                    :class="
                      item.d4[0] === 'E'
                        ? 'E'
                        : item.d4[0] === 'P'
                        ? 'P'
                        : item.d4[0] === 'C'
                        ? 'C'
                        : item.d4[0] === 'F'
                        ? 'F'
                        : item.d4[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 4, item.d4[0])"
                  >
                    {{ item.d4[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d5`]="{ item }">
                  <div
                    :class="
                      item.d5[0] === 'E'
                        ? 'E'
                        : item.d5[0] === 'P'
                        ? 'P'
                        : item.d5[0] === 'C'
                        ? 'C'
                        : item.d5[0] === 'F'
                        ? 'F'
                        : item.d5[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 5, item.d5[0])"
                  >
                    {{ item.d5[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d6`]="{ item }">
                  <div
                    :class="
                      item.d6[0] === 'E'
                        ? 'E'
                        : item.d6[0] === 'P'
                        ? 'P'
                        : item.d6[0] === 'C'
                        ? 'C'
                        : item.d6[0] === 'F'
                        ? 'F'
                        : item.d6[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 6, item.d6[0])"
                  >
                    {{ item.d6[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d7`]="{ item }">
                  <div
                    :class="
                      item.d7[0] === 'E'
                        ? 'E'
                        : item.d7[0] === 'P'
                        ? 'P'
                        : item.d7[0] === 'C'
                        ? 'C'
                        : item.d7[0] === 'F'
                        ? 'F'
                        : item.d7[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 7, item.d7[0])"
                  >
                    {{ item.d7[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d8`]="{ item }">
                  <div
                    :class="
                      item.d8[0] === 'E'
                        ? 'E'
                        : item.d8[0] === 'P'
                        ? 'P'
                        : item.d8[0] === 'C'
                        ? 'C'
                        : item.d8[0] === 'F'
                        ? 'F'
                        : item.d8[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 8, item.d8[0])"
                  >
                    {{ item.d8[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d9`]="{ item }">
                  <div
                    :class="
                      item.d9[0] === 'E'
                        ? 'E'
                        : item.d9[0] === 'P'
                        ? 'P'
                        : item.d9[0] === 'C'
                        ? 'C'
                        : item.d9[0] === 'F'
                        ? 'F'
                        : item.d9[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 9, item.d9[0])"
                  >
                    {{ item.d9[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d10`]="{ item }">
                  <div
                    :class="
                      item.d10[0] === 'E'
                        ? 'E'
                        : item.d10[0] === 'P'
                        ? 'P'
                        : item.d10[0] === 'C'
                        ? 'C'
                        : item.d10[0] === 'F'
                        ? 'F'
                        : item.d10[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 10, item.d10[0])"
                  >
                    {{ item.d10[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d11`]="{ item }">
                  <div
                    :class="
                      item.d11[0] === 'E'
                        ? 'E'
                        : item.d11[0] === 'P'
                        ? 'P'
                        : item.d11[0] === 'C'
                        ? 'C'
                        : item.d11[0] === 'F'
                        ? 'F'
                        : item.d11[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 11, item.d11[0])"
                  >
                    {{ item.d11[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d12`]="{ item }">
                  <div
                    :class="
                      item.d12[0] === 'E'
                        ? 'E'
                        : item.d12[0] === 'P'
                        ? 'P'
                        : item.d12[0] === 'C'
                        ? 'C'
                        : item.d12[0] === 'F'
                        ? 'F'
                        : item.d12[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 12, item.d12[0])"
                  >
                    {{ item.d12[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d13`]="{ item }">
                  <div
                    :class="
                      item.d13[0] === 'E'
                        ? 'E'
                        : item.d13[0] === 'P'
                        ? 'P'
                        : item.d13[0] === 'C'
                        ? 'C'
                        : item.d13[0] === 'F'
                        ? 'F'
                        : item.d13[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 13, item.d13[0])"
                  >
                    {{ item.d13[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d14`]="{ item }">
                  <div
                    :class="
                      item.d14[0] === 'E'
                        ? 'E'
                        : item.d14[0] === 'P'
                        ? 'P'
                        : item.d14[0] === 'C'
                        ? 'C'
                        : item.d14[0] === 'F'
                        ? 'F'
                        : item.d14[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 14, item.d14[0])"
                  >
                    {{ item.d14[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d15`]="{ item }">
                  <div
                    :class="
                      item.d15[0] === 'E'
                        ? 'E'
                        : item.d15[0] === 'P'
                        ? 'P'
                        : item.d15[0] === 'C'
                        ? 'C'
                        : item.d15[0] === 'F'
                        ? 'F'
                        : item.d15[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 15, item.d15[0])"
                  >
                    {{ item.d15[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d16`]="{ item }">
                  <div
                    :class="
                      item.d16[0] === 'E'
                        ? 'E'
                        : item.d16[0] === 'P'
                        ? 'P'
                        : item.d16[0] === 'C'
                        ? 'C'
                        : item.d16[0] === 'F'
                        ? 'F'
                        : item.d16[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 16, item.d16[0])"
                  >
                    {{ item.d16[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d17`]="{ item }">
                  <div
                    :class="
                      item.d17[0] === 'E'
                        ? 'E'
                        : item.d17[0] === 'P'
                        ? 'P'
                        : item.d17[0] === 'C'
                        ? 'C'
                        : item.d17[0] === 'F'
                        ? 'F'
                        : item.d17[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 17, item.d17[0])"
                  >
                    {{ item.d17[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d18`]="{ item }">
                  <div
                    :class="
                      item.d18[0] === 'E'
                        ? 'E'
                        : item.d18[0] === 'P'
                        ? 'P'
                        : item.d18[0] === 'C'
                        ? 'C'
                        : item.d18[0] === 'F'
                        ? 'F'
                        : item.d18[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 18, item.d18[0])"
                  >
                    {{ item.d18[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d19`]="{ item }">
                  <div
                    :class="
                      item.d19[0] === 'E'
                        ? 'E'
                        : item.d19[0] === 'P'
                        ? 'P'
                        : item.d19[0] === 'C'
                        ? 'C'
                        : item.d19[0] === 'F'
                        ? 'F'
                        : item.d19[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 19, item.d19[0])"
                  >
                    {{ item.d19[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d20`]="{ item }">
                  <div
                    :class="
                      item.d20[0] === 'E'
                        ? 'E'
                        : item.d20[0] === 'P'
                        ? 'P'
                        : item.d20[0] === 'C'
                        ? 'C'
                        : item.d20[0] === 'F'
                        ? 'F'
                        : item.d20[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 20, item.d20[0])"
                  >
                    {{ item.d20[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d21`]="{ item }">
                  <div
                    :class="
                      item.d21[0] === 'E'
                        ? 'E'
                        : item.d21[0] === 'P'
                        ? 'P'
                        : item.d21[0] === 'C'
                        ? 'C'
                        : item.d21[0] === 'F'
                        ? 'F'
                        : item.d21[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 21, item.d21[0])"
                  >
                    {{ item.d21[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d22`]="{ item }">
                  <div
                    :class="
                      item.d22[0] === 'E'
                        ? 'E'
                        : item.d22[0] === 'P'
                        ? 'P'
                        : item.d22[0] === 'C'
                        ? 'C'
                        : item.d22[0] === 'F'
                        ? 'F'
                        : item.d22[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 22, item.d22[0])"
                  >
                    {{ item.d22[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d23`]="{ item }">
                  <div
                    :class="
                      item.d23[0] === 'E'
                        ? 'E'
                        : item.d23[0] === 'P'
                        ? 'P'
                        : item.d23[0] === 'C'
                        ? 'C'
                        : item.d23[0] === 'F'
                        ? 'F'
                        : item.d23[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 23, item.d23[0])"
                  >
                    {{ item.d23[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d24`]="{ item }">
                  <div
                    :class="
                      item.d24[0] === 'E'
                        ? 'E'
                        : item.d24[0] === 'P'
                        ? 'P'
                        : item.d24[0] === 'C'
                        ? 'C'
                        : item.d24[0] === 'F'
                        ? 'F'
                        : item.d24[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 24, item.d24[0])"
                  >
                    {{ item.d24[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d25`]="{ item }">
                  <div
                    :class="
                      item.d25[0] === 'E'
                        ? 'E'
                        : item.d25[0] === 'P'
                        ? 'P'
                        : item.d25[0] === 'C'
                        ? 'C'
                        : item.d25[0] === 'F'
                        ? 'F'
                        : item.d25[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 25, item.d25[0])"
                  >
                    {{ item.d25[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d26`]="{ item }">
                  <div
                    :class="
                      item.d26[0] === 'E'
                        ? 'E'
                        : item.d26[0] === 'P'
                        ? 'P'
                        : item.d26[0] === 'C'
                        ? 'C'
                        : item.d26[0] === 'F'
                        ? 'F'
                        : item.d26[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 26, item.d26[0])"
                  >
                    {{ item.d26[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d27`]="{ item }">
                  <div
                    :class="
                      item.d27[0] === 'E'
                        ? 'E'
                        : item.d27[0] === 'P'
                        ? 'P'
                        : item.d27[0] === 'C'
                        ? 'C'
                        : item.d27[0] === 'F'
                        ? 'F'
                        : item.d27[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 27, item.d27[0])"
                  >
                    {{ item.d27[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d28`]="{ item }">
                  <div
                    :class="
                      item.d28[0] === 'E'
                        ? 'E'
                        : item.d28[0] === 'P'
                        ? 'P'
                        : item.d28[0] === 'C'
                        ? 'C'
                        : item.d28[0] === 'F'
                        ? 'F'
                        : item.d28[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 28, item.d28[0])"
                  >
                    {{ item.d28[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d29`]="{ item }">
                  <div
                    :class="
                      item.d29[0] === 'E'
                        ? 'E'
                        : item.d29[0] === 'P'
                        ? 'P'
                        : item.d29[0] === 'C'
                        ? 'C'
                        : item.d29[0] === 'F'
                        ? 'F'
                        : item.d29[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 29, item.d29[0])"
                  >
                    {{ item.d29[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d30`]="{ item }">
                  <div
                    :class="
                      item.d30[0] === 'E'
                        ? 'E'
                        : item.d30[0] === 'P'
                        ? 'P'
                        : item.d30[0] === 'C'
                        ? 'C'
                        : item.d30[0] === 'F'
                        ? 'F'
                        : item.d30[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 30, item.d30[0])"
                  >
                    {{ item.d30[1] }}
                  </div>
                </template>
                <template v-slot:[`item.d31`]="{ item }">
                  <div
                    :class="
                      item.d31[0] === 'E'
                        ? 'E'
                        : item.d31[0] === 'P'
                        ? 'P'
                        : item.d31[0] === 'C'
                        ? 'C'
                        : item.d31[0] === 'F'
                        ? 'F'
                        : item.d31[0] === 'R'
                        ? 'R'
                        : ''
                    "
                    @click.prevent="CheckActivity(item, 31, item.d31[0])"
                  >
                    {{ item.d31[1] }}
                  </div>
                </template>
              </v-data-table>
            </div>
          </v-flex>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="1600">
          <v-card>
            <v-card-title class="text-h5">
              {{ formTitle }}
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-menu
                      :close-on-content-click="true"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="date"
                          label="วันที่"
                          prepend-icon="event"
                          outlined
                          readonly
                          disabled
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" locale="th"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="Obj.remarks"
                      label="หมายเหตุ"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="Obj.result_value"
                      label="ค่าอื่นๆ"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-autocomplete
                      v-model="machinecheck"
                      label="สถานะตรวจเช็ค"
                      :items="listCheckmachine"
                      :item-value="(item) => `${item.description}`"
                      :item-text="(item) => `${item.value}`"
                      outlined
                    ></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                class="ma-2 green accent-4"
                color="success"
                @click.prevent="MachineHandlerSubmit()"
              >
                <v-icon>mdi mdi-content-save</v-icon>
                <span class="pl-2">
                  บันทึก
                </span>
              </v-btn>

              <v-btn
                class="ma-2 red accent-4"
                color="error"
                @click="clearstate()"
              >
                <span class="material-icons">
                  reply
                </span>
                <span class="pl-2">
                  ยกเลิก
                </span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import moment from "moment-timezone";
import axios from "axios";
export default {
  props: ["tab_index"],
  data: () => ({
    month: "",
    year: "",
    itemsmonth: [
      {
        id: 1,
        month: "มกราคม",
      },
      {
        id: 2,
        month: "กุมภาพันธ์",
      },
      {
        id: 3,
        month: "มีนาคม",
      },
      {
        id: 4,
        month: "เมษายน",
      },
      {
        id: 5,
        month: "พฤษภาคม",
      },
      {
        id: 6,
        month: "มิถุนายน",
      },
      {
        id: 7,
        month: "กรกฎาคม",
      },
      {
        id: 8,
        month: "สิงหาคม",
      },
      {
        id: 9,
        month: "กันยายน",
      },
      {
        id: 10,
        month: "ตุลาคม",
      },
      {
        id: 11,
        month: "พฤศจิกายน",
      },
      {
        id: 12,
        month: "ธันวาคม",
      },
      // { title: "แผนบำรุงรักษา", link: "Plan" },
      // { title: "ประวัติการซ่อม" },
      // { title: "ประสิทธิผลโดยรวมเครื่องจักรOEE" }
    ],
    itemsyear: [
      {
        year: "2550",
      },
      {
        year: "2551",
      },
      {
        year: "2552",
      },
      {
        year: "2553",
      },
      {
        year: "2554",
      },
      {
        year: "2555",
      },
      {
        year: "2556",
      },
      {
        year: "2557",
      },
      {
        year: "2558",
      },
      {
        year: "2559",
      },
      {
        year: "2560",
      },
      {
        year: "2561",
      },
      {
        year: "2562",
      },
      {
        year: "2563",
      },
      {
        year: "2564",
      },
      {
        year: "2565",
      },
      {
        year: "2566",
      },
      {
        year: "2567",
      },
      {
        year: "2568",
      },
      {
        year: "2569",
      },
      {
        year: "2570",
      },
      {
        year: "2571",
      },
      {
        year: "2572",
      },
    ],
    lengthimg2: 0,
    onboarding2: 0,
    image2: "",
    // urldefualt: "http://192.168.14.22:8000/",
    urldefualt: process.env.VUE_APP_URL,
    headers: [
      {
        text: "ชื่อเครื่องจักร",
        value: "namethai",
        sortable: false,
        align: "center",
      },
      // {
      //   text: "กิจกรรม",
      //   value: "description",
      //   sortable: false,
      //   align: "center",
      // },
      // {
      //   text: "standard",
      //   value: "standard",
      //   sortable: false,
      //   align: "center",
      // },
      {
        text: "รหัสเครื่องจักร",
        value: "idmachine",
        sortable: false,
        align: "center",
      },
      {
        text: "เดือน",
        value: "actmonth",
        sortable: false,
        align: "start",
      },
      {
        text: "1",
        value: "d1",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "2",
        value: "d2",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "3",
        value: "d3",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "4",
        value: "d4",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "5",
        value: "d5",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "6",
        value: "d6",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "7",
        value: "d7",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "8",
        value: "d8",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "9",
        value: "d9",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "10",
        value: "d10",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "11",
        value: "d11",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "12",
        value: "d12",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "13",
        value: "d13",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "14",
        value: "d14",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "15",
        value: "d15",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "16",
        value: "d16",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "17",
        value: "d17",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "18",
        value: "d18",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "19",
        value: "d19",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "20",
        value: "d20",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "21",
        value: "d21",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "22",
        value: "d22",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "23",
        value: "d23",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "24",
        value: "d24",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "25",
        value: "d25",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "26",
        value: "d26",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "27",
        value: "d27",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "28",
        value: "d28",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "29",
        value: "d29",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "30",
        value: "d30",
        sortable: false,
        width: "25px",
        align: "center",
      },
      {
        text: "31",
        value: "d31",
        sortable: false,
        width: "25px",
        align: "center",
      },
    ],
    thmonth: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
    seasonid_: "",
    listseason: [
      {
        description: "แผนช่วงซ่อม",
        value: "1",
      },
      { description: "แผนช่วงผลิต", value: "2" },
    ],
    listCheckmachine: [
      {
        description: "C",
        value: "ปกติ",
      },
      {
        description: "F",
        value: "ผิดปกติ",
      },
      {
        description: "R",
        value: "ผิดปกติแต่แก้ไขแล้ว",
      },
    ],
    machinecheck: "C",
    divisionFilterValue: "",
    date: new Date().toISOString().substr(0, 10),
    dialog: false,
    Obj: {
      id: "",
      do_date: "",
      update_by: "",
      remarks: "",
      result_check: "",
      result_value: "",
      actid: "",
      idmachine: "",
      duratypeid: "",
      status: "",
    },
  }),
  computed: {
    ...mapGetters({
      resultdialog: "ui/resultdialog",
      listmachineacts: "machineact/listmachineacts",
      listdivision: "tpm/listdivisions",
    }),
    formTitle() {
      return "New Item";
    },
  },
  created() {
    this.$store.dispatch("machineact/clearlistmachineact");

    this.$store.dispatch("tpm/listdivision").catch((err) => {
      this.$store.commit("LOADER", false);
    });
  },
  methods: {
    clearstate() {
      this.dialog = false;
    },
    async MachineHandlerSubmit() {
      let uuid = this.uuidv4();
      const username = localStorage.getItem("username");
      this.Obj.id = uuid;
      this.Obj.do_date = this.date;
      this.Obj.update_by = username;
      this.Obj.result_check = this.machinecheck;
      this.Obj.status = "Saved";
      if (this.machinecheck === "R") {
        this.Obj.result_value = this.machinecheck;
      } else {
        this.Obj.result_value = this.result_value;
      }

      console.log("Obj", this.Obj);

      await axios
        .post("http://192.168.2.104:97/machineactresultpost", this.Obj)
        .then((res) => {
          console.log("res", res);
          if (res.data.success == true) {
            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "info",
                showing: true,
                timeout: 2000,
                text: `${res.data.message}`,
              },
              { root: true }
            );
            this.dialog = false;
            this.searchall();
          } else {
            this.$store.dispatch(
              "snackbar/setSnackbar",
              {
                color: "error",
                showing: true,
                timeout: 10000,
                text: `${res.data.message}`,
              },
              { root: true }
            );
            this.dialog = false;
          }
        });
    },
    // async CheckActivity(item, currentdate, status) {
    //   // clear Object emty
    //   this.Obj = {};
    //   if (status === "P") {
    //     console.log("item", item);

    //     // แปลงตัวเลข จาก ค่าที่ได้มาให้อยู่ในรูปแบบวันที่
    //     let str = `${parseInt(item.actyear) - 543}-${
    //       item.actmonth
    //     }-${currentdate}`;
    //     console.log("str", str);
    //     const ConvertStringTodate = moment(new Date(str))
    //       .tz("Asia/Bangkok")
    //       .format("YYYY-MM-DD");
    //     console.log("ConvertStringTodate", ConvertStringTodate);
    //     this.date = moment(ConvertStringTodate)
    //       .tz("Asia/Bangkok")
    //       .format("YYYY-MM-DD");

    //     this.Obj.actid = item.activityid;
    //     this.Obj.idmachine = item.idmachine;
    //     this.Obj.duratypeid = item.duratypeid;
    //     await axios
    //       .post("http://192.168.2.104:97/machineactresultpost", Obj)
    //       .then((res) => {})
    //       .catch((err) => {
    //         console.log("err", err);
    //       });
    //     this.dialog = true;
    //   }
    // },
    async searchall() {
      var Obj = {
        seasonid: this.seasonid_,
        divisionid: this.divisionFilterValue,
        year: this.year,
        month: this.month,
      };
      this.$store.dispatch("machineact/listmachineactdivision_", Obj);
    },
    onChangeyear: function() {
      this.month = null;
    },
    convertyear: function(val) {
      return this.thmonth[val - 1];
    },
    onChangemonth: function(val) {
      // ค้นหารายปี/เดือน
      var Obj = {
        idmachine: this.machine.idmachine,
        year: this.year,
        month: this.month,
      };
      this.$store.dispatch("machineact/listmachineactdivision_", Obj);
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
.P {
  background-color: red;
  width: 20px;
  height: 20px;
  color: rgb(4, 5, 4);
}
.E {
  background-color: rgb(250, 250, 250);
  width: 20px;
  height: 20px;
  color: white;
}
.C {
  background-color: rgb(58, 209, 58);
  width: 20px;
  height: 20px;
  color: rgb(4, 5, 4);
}
.F {
  background-color: rgb(240, 125, 18);
  width: 20px;
  height: 20px;
  color: rgb(4, 5, 4);
}
.R {
  background-color: rgb(62, 247, 253);
  width: 20px;
  height: 20px;
  color: rgb(4, 5, 4);
}

.image {
  width: 300px;
  height: 400px;
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}

@media screen and (max-width: 320) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 480) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 600) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
@media screen and (max-width: 768px) {
  .v-data-table >>> .v-data-table__mobile-table-row {
    display: block;
  }
}
.v-data-table >>> .text-center {
  padding: 0 5px !important;
  border: 0.2px solid;
}
.v-data-table >>> .text-start {
  padding: 0 5px !important;
  border: 0.2px solid;
}
/* .v-data-table >>> table tr {
    background-color: lightgoldenrodyellow;
    border-left: thin solid;
    border-bottom: none !important;
 } */
button.v-icon.v-icon.notranslate.mdi.mdi-alert-circle.theme--light {
  color: rgb(255, 78, 14);
}
button.v-icon.v-icon.notranslate.mdi.mdi-close-circle.theme--light {
  color: red;
}
button.v-icon.v-icon.notranslate.mdi.mdi-check-circle.theme--light {
  color: green;
}

/* .v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgb(33, 191, 240);
} */

.v-data-table >>> .v-data-table-header span {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}
.v-data-table >>> .v-data-table-header {
  background-color: #212121;
}
.v-data-table >>> tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
