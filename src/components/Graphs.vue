<template>
  <div id="content">
    <section>
      <h2>Zeitraum</h2>
      <div id="timespanButtons">
        <div id="predefined">
          <div class="custombutton" @click="timespanSetDay" :class="{ selected: timespanButtonsSelected[0] }">
            <img src="/assets/icons/calendar/calendar-day.svg" alt="Tageskalender" id="icon" />
            <span id="text">24 Stunden</span>
            <span id="textShortened">24h</span>
          </div>

          <div class="custombutton" @click="timespanSetWeek" :class="{ selected: timespanButtonsSelected[1] }">
            <img src="/assets/icons/calendar/calendar-week.svg" alt="Wochenkalender" id="icon" />
            <span id="text">7 Tage</span>
            <span id="textShortened">7d</span>
          </div>

          <div id="month" class="custombutton" @click="timespanSetMonth" :class="{ selected: timespanButtonsSelected[2] }">
            <img src="/assets/icons/calendar/calendar-month.svg" alt="Monatskalender" id="icon" />
            <span id="text">31 Tage</span>
            <span id="textShortened">31d</span>
          </div>
        </div>

        <div id="custom">
          <div id="customselect" class="custombutton" @click="timespanSetCustom" :class="{ selected: timespanButtonsSelected[3] }">
            <img src="/assets/icons/calendar/calendar-solid.svg" alt="Benutzerdefinierter Kalender" id="icon" />
            <span id="text">Benutzerdefiniert</span>
            <span id="textShortened">Benutzerdefiniert</span>
          </div>

          <Datepicker v-if="timespanButtonsSelected[3]" v-model="datepicker" range :enable-time-picker="false" :clearable="false" :format-locale="de" format="dd.MM.yyyy" :min-date="new Date(2019, 2, 10)" :max-date="new Date()" modeHeight="1000" :year-range="[2019, new Date().getFullYear()]" @update:model-value="updateCustom()" />
        </div>
      </div>
    </section>

    <section id="sensorSelection">
      <h2>Sensoren</h2>
      <v-chip-group v-model="selectedSensors" column multiple>
        <div id="sensorGroups">
          <div class="sensorGroup">
            <h3>Temperatur</h3>
            <div class="chipgroup">
              <v-chip filter color="primary">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </v-chip>
              <v-chip filter color="primary">
                Min (Tag)
              </v-chip>
              <v-chip filter color="primary">
                Max (Tag)
              </v-chip>
            </div>
          </div>

          <div class="sensorGroup">
            <h3 id="feelsliketempheader">Gefühlte T</h3>
            <div class="chipgroup">
              <v-chip filter color="primary">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </v-chip>
              <v-chip filter color="primary">
                Min (Tag)
              </v-chip>
              <v-chip filter color="primary">
                Max (Tag)
              </v-chip>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Taupunkt</h3>
            <div class="chipgroup">
              <v-chip filter color="primary">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </v-chip>
              <v-chip filter color="primary">
                Min (Tag)
              </v-chip>
              <v-chip filter color="primary">
                Max (Tag)
              </v-chip>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Luftfeuchte</h3>
            <div class="chipgroup">
              <v-chip filter color="primary">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </v-chip>
              <v-chip filter color="primary">
                Min (Tag)
              </v-chip>
              <v-chip filter color="primary">
                Max (Tag)
              </v-chip>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Luftdruck</h3>
            <div class="chipgroup">
              <v-chip filter color="primary">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </v-chip>
              <v-chip filter color="primary">
                Min (Tag)
              </v-chip>
              <v-chip filter color="primary">
                Max (Tag)
              </v-chip>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Wind</h3>
            <div class="chipgroup">
              <v-chip filter color="primary">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </v-chip>
              <v-chip filter color="primary">
                Max (Tag)
              </v-chip>
              <v-chip filter color="primary">
                Richtung
              </v-chip>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Regen</h3>
            <div class="chipgroup">
              <v-chip filter color="primary">
                Menge
              </v-chip>
            </div>
          </div>
        </div>
      </v-chip-group>

      <div id="mobileSensorSelector">
        <v-select v-model="mobileSelectorText" label="Sensoren wählen..." :items="[
            { props: { header: 'Temperatur' } },
            {
              title: 'Durchschnitt',
              value: 0,
            },
            {
              title: 'Min (Tag)',
              value: 1,
            },
            {
              title: 'Max (Tag)',
              value: 2,
            },
            { props: { divider: true } },
            { props: { header: 'Gefühlte Temperatur' } },
            {
              title: 'Durchschnitt',
              value: 3,
            },
            {
              title: 'Min (Tag)',
              value: 4,
            },
            {
              title: 'Max (Tag)',
              value: 5,
            },
            { props: { divider: true } },
            { props: { header: 'Taupunkt' } },
            {
              title: 'Durchschnitt',
              value: 6,
            },
            {
              title: 'Min (Tag)',
              value: 7,
            },
            {
              title: 'Max (Tag)',
              value: 8,
            },
            { props: { divider: true } },
            { props: { header: 'Luftfeuchte' } },
            {
              title: 'Durchschnitt',
              value: 9,
            },
            {
              title: 'Min (Tag)',
              value: 10,
            },
            {
              title: 'Max (Tag)',
              value: 11,
            },
            { props: { divider: true } },
            { props: { header: 'Luftdruck' } },
            {
              title: 'Durchschnitt',
              value: 12,
            },
            {
              title: 'Min (Tag)',
              value: 13,
            },
            {
              title: 'Max (Tag)',
              value: 14,
            },
            { props: { divider: true } },
            { props: { header: 'Wind' } },
            {
              title: 'Durchschnitt',
              value: 15,
            },
            {
              title: 'Max (Tag)',
              value: 16,
            },
            {
              title: 'Richtung',
              value: 17,
            },
            { props: { divider: true } },
            { props: { header: 'Regen' } },
            {
              title: 'Menge',
              value: 18,
            }
          ]">
          <template #item="{ props, item }">
            <v-list-subheader v-if="props.header">
              {{ props.header }}
            </v-list-subheader>
            <v-divider v-else-if="props.divider" class="mt-2" />
            <div v-else>
              <v-checkbox color="primary" v-ripple v-model="selectedSensors" :label="item.title" :value="item.value" />
            </div>
          </template>
        </v-select>
      </div>
    </section>


    <section id="graph">
      <div id="loading-spinner" v-if="!showChart">
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
      </div>
      <GraphChart id="chart" v-if="showChart" :data="data" :selectedSensors="selectedSensors" :key="chartRef" />
    </section>
  </div>
</template>

<script setup>
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'
import { ref } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { de } from 'date-fns/locale';
import GraphChart from './GraphChart.vue';
</script>

<script>
const datepicker = ref();
const chartRef = ref(0);
export default {
  name: 'Graphs',
  data() {
    return {
      showChart: false,
      timespanButtonsSelected: [false, false, false, false],
      selectedSensors: [],
      mobileSelectorText: '',
      sensorNames: [
        'Temp',
        'Temp Min',
        'Temp Max',
        'Gefühlt. T.',
        'Gefühlt. T. Min',
        'Gefühlt. T. Max',
        'Taup.',
        'Taup. Min',
        'Taup. Max',
        'Luftf.',
        'Luftf. Min',
        'Luftf. Max',
        'Druck',
        'Druck Min',
        'Druck Max',
        'Wind',
        'Wind Max',
        'Windricht.',
        'Regen'
      ],
      data: null,
      fromTimestamp: 0,
      toTimestamp: 0,
    }
  },

  mounted() {
    this.timespanSetDay();
    this.selectedSensors.push(0);
    this.selectionChange();
  },

  watch: {
    selectedSensors() {
      this.selectionChange();
    }
  },

  methods: {
    timespanSetDay() {
      if (this.timespanButtonsSelected[0]) return;
      this.clearTimespanButtonsSelected();
      this.timespanButtonsSelected[0] = true;
      this.fromTimestamp = Math.floor(Date.now() / 1000) - 86400;
      this.toTimestamp = Math.floor(Date.now() / 1000);
      this.updateData();
    },
    timespanSetWeek() {
      if (this.timespanButtonsSelected[1]) return;
      this.clearTimespanButtonsSelected();
      this.timespanButtonsSelected[1] = true;
      this.fromTimestamp = Math.floor(Date.now() / 1000) - 604800;
      this.toTimestamp = Math.floor(Date.now() / 1000);
      this.updateData();
    },
    timespanSetMonth() {
      if (this.timespanButtonsSelected[2]) return;
      this.clearTimespanButtonsSelected();
      this.timespanButtonsSelected[2] = true;
      this.fromTimestamp = Math.floor(Date.now() / 1000) - 2592000;
      this.toTimestamp = Math.floor(Date.now() / 1000);
      this.updateData();
    },
    timespanSetCustom() {
      if (this.timespanButtonsSelected[3]) return;
      let from = 0;
      let to = 0;
      const today = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
      if (this.timespanButtonsSelected[0]) {
        from = today - 86400;
        to = today + 86399;
      } else if (this.timespanButtonsSelected[1]) {
        from = today - 604800;
        to = today + 86399;
      } else if (this.timespanButtonsSelected[2]) {
        from = today - 2592000;
        to = today + 86399;
      }
      const startDate = new Date(from * 1000);
      const endDate = new Date(to * 1000);
      datepicker.value = [startDate, endDate];
      this.clearTimespanButtonsSelected();
      this.timespanButtonsSelected[3] = true;
    },
    clearTimespanButtonsSelected() {
      this.timespanButtonsSelected = this.timespanButtonsSelected.map(
        () => false
      );
    },
    updateCustom() {
      if (!datepicker.value[0] || !datepicker.value[1]) return;
      this.fromTimestamp = Math.floor(datepicker.value[0] / 1000);
      this.toTimestamp = Math.floor(datepicker.value[1] / 1000);
      this.updateData();
    },
    async updateData() {
      this.showChart = false;
      this.data = await fetch(`/api/graphs/?from=${this.fromTimestamp}&to=${this.toTimestamp}`);
      this.data = await this.data.json();
      this.normalizeMaxMin();
      this.showChart = true
    },
    normalizeMaxMin() {
      const maxminfields = [
        'outTempMax',
        'outTempMin',
        'appTempMax',
        'appTempMin',
        'dewpointMax',
        'dewpointMin',
        'outHumidityMax',
        'outHumidityMin',
        'barometerMax',
        'barometerMin',
        'windspeedMax',
      ];
      const datacp = JSON.parse(JSON.stringify(this.data));
      maxminfields.forEach((field) => {
        this.data[field][0] = datacp[field][0];
      });
      let maxMinIndex = 0;
      for (let i = 1; i < datacp.dateTime.length; i++) {
        if (
          datacp.dateTime[i].slice(0, 2) != datacp.dateTime[i - 1].slice(0, 2)
        ) {
          maxMinIndex++;
        }
        maxminfields.forEach((field) => {
          this.data[field][i] = datacp[field][maxMinIndex];
        });
      }
    },
    async selectionChange() {
      this.updateMobileSelectorText();
      chartRef.value += 1;
    },
    updateMobileSelectorText() {
      this.mobileSelectorText = '';
      this.selectedSensors.sort((a, b) => a - b);
      for (let i = 0; i < this.selectedSensors.length; i++) {
        this.mobileSelectorText += this.sensorNames[this.selectedSensors[i]] + ', ';
      }
      this.mobileSelectorText = this.mobileSelectorText.slice(0, -2);
    }
  }
};
</script>

<style scoped lang="scss">
@use "../styles/mixins" as global;

#content {
  padding: 0.5em 1.5em 1.2em 2em;
  min-height: 100vh;

  @media (max-width: 1250px) {
    margin-left: 0;
    margin-top: 3.75em;
  }

  @media (max-width: 1030px) {
    grid-template-rows: auto auto auto;
    margin-top: 3.75em;
    grid-template-columns: 1fr;
  }

  @media (max-width: 420px) {
    padding: 0.5em 1em 1.2em 1em;
  }

  @media (max-width: 330px) {
    padding: 0.5em 0.2em 1.2em 0.1em;
  }

  h2 {
    font-size: 2em;
    font-weight: 500;
    margin-bottom: 0.2em;
  }

  h3 {
    font-size: 1.25em;
    font-weight: 400;
    margin-bottom: 0.2em;
  }

  #timespanButtons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .custombutton {
      margin-right: 1em;
      border-radius: 0.25em;
      padding: 1em;
      background-color: #ecf3f8;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      @media (max-width: 330px) {
        margin-right: .25em;
      }

      #icon {
        height: 1.3em;
        @include global.disableSelect;
        @include global.disableDrag;
      }

      #text {
        display: block;
        margin-left: 0.8em;
        @include global.disableSelect;
        @include global.disableDrag;

        @media (max-width: 980px) {
          display: none;
        }

        @media (max-width: 850px) {
          display: block;
        }

        @media (max-width: 565px) {
          display: none;
        }
      }

      #textShortened {
        display: none;
        margin-left: 0.8em;
        @include global.disableSelect;
        @include global.disableDrag;

        @media (max-width: 980px) {
          display: block;
        }

        @media (max-width: 850px) {
          display: none;
        }

        @media (max-width: 565px) {
          display: block;
        }
      }

      &:hover {
        background-color: #e2ecf5;

        &:active {
          background-color: #c7cfd7;
        }
      }

      &.selected {
        background-color: #c9e2f5;

        &:active {
          background-color: #b1c7d7;
        }
      }

      @media (max-width: 850px) {
        &#month {
          margin-right: 0;
        }
      }

      @media (max-width: 700px) {
        &#customselect {
          margin-right: 0;
          margin-bottom: .75em;
        }
      }

      @media (max-width: 330px) {
        &#customselect {
          margin-bottom: .5em;
        }
      }
    }

    #predefined {
      display: grid;
      grid-template-columns: repeat(5, auto);
      margin-bottom: 1em;
      width: fit-content;

      @media (max-width: 850px) {
        width: 100%;
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 330px) {
        margin-bottom: .5em;
      }
    }

    #custom {
      display: grid;
      grid-template-columns: repeat(2, auto);
      margin-bottom: 1em;
      width: fit-content;

      @media (max-width: 850px) {
        width: 100%;
        grid-template-columns: 1fr 2fr;
      }

      @media (max-width: 700px) {
        width: 100%;
        grid-template-columns: 1fr;
      }
    }
  }

  #sensorSelection {
    #sensorGroups {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: 1em;

      @media (max-width: 980px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (max-width: 615px) {
        display: none;
      }

      margin-bottom: 2em;

      .sensorGroup {
        .averagetext {
          @media (max-width: 1480px) {
            &::after {
              content: "Durschn.";
            }

            span {
              display: none;
            }
          }
        }

        #feelsliketempheader:after {
          content: "emp";

          @media (max-width: 1480px) {
            content: ".";
          }
        }
      }
    }

    #mobileSensorSelector {
      display: none;

      @media (max-width: 615px) {
        display: block;
        margin-bottom: 1em;
      }
    }
  }

  #graph {
    #loading-spinner {
      display: flex;
      justify-content: center;
      height: 100%;
      width: 100%;
    }

    #chart {
      min-height: 25em;
      height: calc(100vh - 25em);
    }
  }
}
</style>
