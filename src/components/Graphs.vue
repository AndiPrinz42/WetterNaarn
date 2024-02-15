
<template>
  <div id="content">
    <br />
    <section>
      <h2>Zeitraum</h2>
      <div id="timespanButtons">
        <div id="predefined">
          <div class="custombutton" @click="timespanSetDay" :class="{ selected: timespanButtonsSelected[0] }">
            <img src="../assets/icons/calendar/calendar-day.svg" alt="Tageskalender" id="icon" />
            <span id="text">24 Stunden</span>
            <span id="textShortened">24h</span>
          </div>

          <div class="custombutton" @click="timespanSetWeek" :class="{ selected: timespanButtonsSelected[1] }">
            <img src="../assets/icons/calendar/calendar-week.svg" alt="Wochenkalender" id="icon" />
            <span id="text">7 Tage</span>
            <span id="textShortened">7d</span>
          </div>

          <div id="month" class="custombutton" @click="timespanSetMonth"
            :class="{ selected: timespanButtonsSelected[2] }">
            <img src="../assets/icons/calendar/calendar-month.svg" alt="Monatskalender" id="icon" />
            <span id="text">31 Tage</span>
            <span id="textShortened">31d</span>
          </div>
        </div>

        <div id="custom">
          <div id="customselect" class="custombutton" @click="timespanSetCustom"
            :class="{ selected: timespanButtonsSelected[3] }">
            <img src="../assets/icons/calendar/calendar-solid.svg" alt="Benutzerdefinierter Kalender" id="icon" />
            <span id="text">Benutzerdefiniert</span>
            <span id="textShortened">Benutzerdefiniert</span>
          </div>

          <Datepicker v-if="timespanButtonsSelected[3]" v-model="datepicker" range :enable-time-picker="false"
            :format-locale="de" format="dd.MM.yyyy" :min-date="new Date(2019, 2, 10)" modeHeight="1000"
            :year-range="[2019, new Date().getFullYear()]" @update:model-value="updateCustom()" />
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
      <div id="chartWrapper">
        <div id="loading-spinner" v-if="(data.dateTime.length === 0 || !showChart)">
          <!-- <mat-spinner></mat-spinner> -->
        </div>
        <canvas id="chart"
          :style="{ opacity: (data.dateTime.length !== 0 && showChart) ? 1 : 0, height: (data.dateTime.length !== 0 && showChart) ? '' : 0 }"></canvas>
      </div>

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
</script>

<script>
const datepicker = ref();
export default {
  name: 'Graphs',
  data() {
    return {
      neighborhoods: [1],
      showChart: true,
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
      data: {
        dateTime: [],
        outTemp: [],
        outTempMin: [],
        outTempMax: [],
        appTemp: [],
        appTempMin: [],
        appTempMax: [],
        dewpoint: [],
        dewpointMin: [],
        dewpointMax: [],
        outHumidity: [],
        outHumidityMin: [],
        outHumidityMax: [],
        barometer: [],
        barometerMin: [],
        barometerMax: [],
        windDir: [],
        windspeed: [],
        windspeedMax: [],
        rain: [],
      },

      fetchError: false,
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
      this.updateData();
    },
    updateData() {
      // this.fetchError = false;
      // this.showChart = false;
      // this.apiService.fetchGraphData(this.fromTimestamp, this.toTimestamp + 86399).then((data) => {
      //   this.data = data;
      //   this.normalizeMaxMin();
      //   this.drawChart();
      //   this.showChart = true;
      // })
      //   .catch((error) => {
      //     this.fetchError = true;
      //   });
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
    selectionChange() {
      this.updateMobileSelectorText();
      return;
      this.drawChart();
    },
    updateMobileSelectorText() {
      this.mobileSelectorText = '';
      this.selectedSensors.sort((a, b) => a - b);
      for (let i = 0; i < this.selectedSensors.length; i++) {
        this.mobileSelectorText += this.sensorNames[this.selectedSensors[i]] + ', ';
      }
      this.mobileSelectorText = this.mobileSelectorText.slice(0, -2);
    },
    drawChart() {
      try {
        if (this.chart) {
          this.chart.destroy();
        }
      } catch (e) { }

      const graphdata = {
        labels: this.data.dateTime,
        datasets: [
          {
            type: 'line',
            label: 'Temperatur',
            data: this.data.outTemp,
            borderColor: 'rgb(255, 64, 0)',
            backgroundColor: 'rgba(255, 64, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(0),
            pointRadius: 0,
            order: 1,
          },
          {
            type: 'line',
            label: 'Temperatur Min',
            data: this.data.outTempMin,
            borderColor: 'rgb(255, 128, 0)',
            backgroundColor: 'rgba(255, 128, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(1),
            pointRadius: 0,
            order: 2,
          },
          {
            type: 'line',
            label: 'Temperatur Max',
            data: this.data.outTempMax,
            borderColor: 'rgb(255, 0, 0)',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(2),
            pointRadius: 0,
            order: 3,
          },
          {
            type: 'line',
            label: 'Gefühlte Temperatur',
            data: this.data.appTemp,
            borderColor: 'rgb(255, 232, 0)',
            backgroundColor: 'rgba(255, 232, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(3),
            pointRadius: 0,
            order: 4,
          },
          {
            type: 'line',
            label: 'Gefühlte Temperatur Min',
            data: this.data.appTempMin,
            borderColor: 'rgb(255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(4),
            pointRadius: 0,
            order: 5,
          },
          {
            type: 'line',
            label: 'Gefühlte Temperatur Max',
            data: this.data.appTempMax,
            borderColor: 'rgb(255, 200, 0)',
            backgroundColor: 'rgba(255, 200, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(5),
            pointRadius: 0,
            order: 6,
          },
          {
            type: 'line',
            label: 'Taupunkt',
            data: this.data.dewpoint,
            borderColor: 'rgb(0, 192, 100)',
            backgroundColor: 'rgba(0, 192, 100, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(6),
            pointRadius: 0,
            order: 7,
          },
          {
            type: 'line',
            label: 'Taupunkt Min',
            data: this.data.dewpointMin,
            borderColor: 'rgb(0, 255, 200)',
            backgroundColor: 'rgba(0, 255, 200, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(7),
            pointRadius: 0,
            order: 8,
          },
          {
            type: 'line',
            label: 'Taupunkt Max',
            data: this.data.dewpointMax,
            borderColor: 'rgb(0, 128, 100)',
            backgroundColor: 'rgba(0, 128, 100, 0.8)',
            yAxisID: 'temperature',
            hidden: !this.selectedSensors.includes(8),
            pointRadius: 0,
            order: 9,
          },
          {
            type: 'line',
            label: 'Luftfeuchte',
            data: this.data.outHumidity,
            borderColor: 'rgb(0, 64, 255)',
            backgroundColor: 'rgba(0, 64, 255, 0.8)',
            yAxisID: 'humidity',
            hidden: !this.selectedSensors.includes(9),
            pointRadius: 0,
            order: 10,
          },
          {
            type: 'line',
            label: 'Luftfeuchte Min',
            data: this.data.outHumidityMin,
            borderColor: 'rgb(0, 128, 255)',
            backgroundColor: 'rgba(0, 128, 255, 0.8)',
            yAxisID: 'humidity',
            hidden: !this.selectedSensors.includes(10),
            pointRadius: 0,
            order: 11,
          },
          {
            type: 'line',
            label: 'Luftfeuchte Max',
            data: this.data.outHumidityMax,
            borderColor: 'rgb(0, 0, 255)',
            backgroundColor: 'rgba(0, 0, 255, 0.8)',
            yAxisID: 'humidity',
            hidden: !this.selectedSensors.includes(11),
            pointRadius: 0,
            order: 12,
          },
          {
            type: 'line',
            label: 'Luftdruck',
            data: this.data.barometer,
            borderColor: 'rgb(24, 144, 0)',
            backgroundColor: 'rgba(24, 144, 0, 0.8)',
            yAxisID: 'pressure',
            hidden: !this.selectedSensors.includes(12),
            pointRadius: 0,
            order: 13,
          },
          {
            type: 'line',
            label: 'Luftdruck Min',
            data: this.data.barometerMin,
            borderColor: 'rgb(32, 192, 0)',
            backgroundColor: 'rgba(32, 192, 0, 0.8)',
            yAxisID: 'pressure',
            hidden: !this.selectedSensors.includes(13),
            pointRadius: 0,
            order: 14,
          },
          {
            type: 'line',
            label: 'Luftdruck Max',
            data: this.data.barometerMax,
            borderColor: 'rgb(16, 96, 0)',
            backgroundColor: 'rgba(16, 96, 0, 0.8)',
            yAxisID: 'pressure',
            hidden: !this.selectedSensors.includes(14),
            pointRadius: 0,
            order: 15,
          },
          {
            type: 'line',
            label: 'Wind',
            data: this.data.windspeed,
            borderColor: 'rgb(32, 32, 32)',
            backgroundColor: 'rgb(32, 32, 32, 0.8)',
            yAxisID: 'wind',
            hidden: !this.selectedSensors.includes(15),
            pointRadius: 0,
            order: 16,
          },
          {
            type: 'line',
            label: 'Wind Max',
            data: this.data.windspeedMax,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(0, 0, 0, 0.8)',
            yAxisID: 'wind',
            hidden: !this.selectedSensors.includes(16),
            pointRadius: 0,
            order: 17,
          },
          {
            type: 'scatter',
            label: 'Windrichtung',
            data: this.data.windDir,
            borderColor: 'rgb(128, 128, 128)',
            backgroundColor: 'rgb(128, 128, 128, 0.8)',
            yAxisID: 'winddir',
            hidden: !this.selectedSensors.includes(17),
            order: 20,
          },
          {
            type: 'line',
            label: 'Regen',
            data: this.data.rain,
            borderColor: 'rgb(0, 94, 255)',
            backgroundColor: 'rgb(0, 94, 255, 0.8)',
            yAxisID: 'rain',
            hidden: !this.selectedSensors.includes(18),
            pointRadius: 0,
            order: 21,
          },
        ],
      };

      const units = (context) => {
        const FIELDS_UNITS = {
          Temperatur: '°',
          'Temperatur Min': '°',
          'Temperatur Max': '°',
          'Gefühlte Temperatur': '°',
          'Gefühlte Temperatur Min': '°',
          'Gefühlte Temperatur Max': '°',
          Taupunkt: '°',
          'Taupunkt Min': '°',
          'Taupunkt Max': '°',
          Luftfeuchte: '%',
          'Luftfeuchte Min': '%',
          'Luftfeuchte Max': '%',
          Luftdruck: 'hPa',
          'Luftdruck Min': 'hPa',
          'Luftdruck Max': 'hPa',
          Wind: 'km/h',
          'Wind Max': 'km/h',
          'Regen': 'mm²',
        };
        var label = context.dataset.label || '';
        if (label) {
          label += ': ';
        }
        if (context.parsed.y !== null && FIELDS_UNITS[context.dataset.label]) {
          label += context.parsed.y + FIELDS_UNITS[context.dataset.label];
        } else if (context.dataset.label == 'Windrichtung') {
          label = 'Windrichtung: ' + this.winddirDegreeToString(context.parsed.y);
        }
        return label;
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          temperature: {
            type: 'linear',
            position: 'left',
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 5,
              color: 'rgb(255, 64, 0)',
            },
            title: {
              display: false,
              text: 'Temperatur',
            },
            display: 'auto',
          },
          pressure: {
            type: 'linear',
            position: 'left',
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 5,
              color: 'rgb(24, 144, 0)',
            },
            scaleLabel: {
              display: true,
              labelString: 'Temperature',
            },
            title: {
              display: false,
              text: 'Druck',
            },
            display: 'auto',
          },
          wind: {
            type: 'linear',
            position: 'left',
            grid: {
              display: false,
            },
            ticks: {
              color: 'rgb(32, 32, 32)',
            },
            min: 0,
            title: {
              display: false,
              text: 'Wind',
            },
            display: 'auto',
          },
          humidity: {
            type: 'linear',
            position: 'right',
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 10,
              color: 'rgb(0, 64, 255)',
            },
            min: 0,
            max: 100,
            title: {
              display: false,
              text: 'Feuchte',
            },
            display: 'auto',
          },
          rain: {
            type: 'linear',
            position: 'right',
            grid: {
              display: false,
            },
            ticks: {
              color: 'rgb(0, 94, 255)',
            },
            min: 0,
            title: {
              display: false,
              text: 'Regen',
            },
            display: 'auto',
          },
          winddir: {
            type: 'linear',
            position: 'right',
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 30,
              color: 'rgb(128, 128, 128)',
            },
            min: 0,
            max: 360,
            title: {
              display: false,
              text: 'Winddir',
            },
            display: 'auto',
          },
        },

        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            displayColors: false,
            callbacks: {
              label: units,
            },
          },
        },
      };

      const config = {
        data: graphdata,
        options: options,
      };

      this.chart = new Chart('chart', config);

    },

    winddirDegreeToString(degree) {
      if (degree >= 337.5 || degree < 22.5) {
        return 'N';
      } else if (degree >= 22.5 && degree < 67.5) {
        return 'NO';
      } else if (degree >= 67.5 && degree < 112.5) {
        return 'O';
      } else if (degree >= 112.5 && degree < 157.5) {
        return 'SO';
      } else if (degree >= 157.5 && degree < 202.5) {
        return 'S';
      } else if (degree >= 202.5 && degree < 247.5) {
        return 'SW';
      } else if (degree >= 247.5 && degree < 292.5) {
        return 'W';
      } else if (degree >= 292.5 && degree < 337.5) {
        return 'NW';
      }
      return '';
    }
  }
};
</script>
  
<style scoped lang="scss">
/* Your component styles go here */
@use "../styles/mixins" as global;

#content {
  padding: 0.5em 1.5em 1.2em 2em;
  min-height: calc(100vh - 1.7em);

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

    mat-form-field * {
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }

    mat-label {
      color: #adadad;
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
        .chipgroup {
          width: 100%;
          max-width: 200px;
        }

        mat-chip-option {
          width: 100%;
          background-color: #ecf3f8;
          transition: background-color 0.2s ease-in-out;

          &:hover {
            background-color: #e2ecf5;
          }

          &.mat-mdc-chip-selected {
            background-color: #c9e2f5;
          }
        }

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

      mat-label {
        color: #adadad;
      }

      @media (max-width: 615px) {
        display: block;
        margin-bottom: 1em;
      }
    }
  }

  #graph {
    #chartWrapper {
      min-height: 25em;
      height: calc(100vh - 25em);

      #loading-spinner {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>

<style lang="scss" is:inline>
.v-chip {
  width: 100%;
}

.v-chip__content {
  color: #000000;
}

.dp__input {
  height: 3.5em;
}

.v-input__details {
  display: none;
}

.v-checkbox-btn {
  margin-left: 0.5em;
}

.v-label {
  width: 100%;
  opacity: 1;
}
</style>
