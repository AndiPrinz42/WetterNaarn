<template>
  <div id="content">
    <section>
      <h2>Zeitraum</h2>
      <div id="timespanButtons">
        <div id="predefined">
          <div class="custombutton" @click="timespanSetDay" :class="{
            selected
              : timespanButtonsSelected[0]
          }">
            <img src="../../public/assets/icons/calendar/calendar-day.svg" alt="Tageskalender" id="icon" />
            <span id="text">24 Stunden</span>
            <span id="textShortened">24h</span>
          </div>

          <div class="custombutton" @click="timespanSetWeek" :class="{
            selected
              : timespanButtonsSelected[1]
          }">
            <img src="../../public/assets/icons/calendar/calendar-week.svg" alt="Wochenkalender" id="icon" />
            <span id="text">7 Tage</span>
            <span id="textShortened">7d</span>
          </div>

          <div id="month" class="custombutton" @click="timespanSetMonth" :class="{
            selected
              : timespanButtonsSelected[2]
          }">
            <img src="../../public/assets/icons/calendar/calendar-month.svg" alt="Monatskalender" id="icon" />
            <span id="text">31 Tage</span>
            <span id="textShortened">31d</span>
          </div>
        </div>

        <div id="custom">
          <div id="customselect" class="custombutton" @click="timespanSetCustom" :class="{
            selected
              : timespanButtonsSelected[3]
          }">
            <img src="../../public/assets/icons/calendar/calendar-solid.svg" alt="Benutzerdefinierter Kalender"
              id="icon" />
            <span id="text">Benutzerdefiniert</span>
            <span id="textShortened">Benutzerdefiniert</span>
          </div>

          <mat-form-field id="datepicker" v-if="timespanButtonsSelected[3]" color="primary" @click="picker.open()">
            <mat-label>Zeitraum auswählen</mat-label>
            <mat-date-range-input rangePicker="picker" formGroup="datepicker.range" min="datepicker.min"
              max="datepicker.max">
              <input matStartDate formControlName="start" />
              <input matEndDate formControlName="end" />
            </mat-date-range-input>
            <mat-datepicker-toggle matIconSuffix for="picker"></mat-datepicker-toggle>
            <mat-date-range-picker #picker (closed)="updateCustom()"></mat-date-range-picker>
          </mat-form-field>
        </div>
      </div>
    </section>

    <section id="sensorSelection">
      <h2>Sensoren</h2>
      <mat-chip-listbox multiple v-model="selectedSensors" @change="this.selectionChange()">
        <div id="sensorGroups">
          <div class="sensorGroup">
            <h3>Temperatur</h3>
            <div class="chipgroup">
              <mat-chip-option disableRipple="true" value="temperature">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="temperaturemin">
                Min (Tag)
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="temperaturemax">
                Max (Tag)
              </mat-chip-option>
            </div>
          </div>

          <div class="sensorGroup">
            <h3 id="feelsliketempheader">Gefühlte T</h3>
            <div class="chipgroup">
              <mat-chip-option disableRipple="true" value="feelsliketemp">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="feelsliketempmin">
                Min (Tag)
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="feelsliketempmax">
                Max (Tag)
              </mat-chip-option>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Taupunkt</h3>
            <div class="chipgroup">
              <mat-chip-option disableRipple="true" value="dewpoint">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="dewpointmin">
                Min (Tag)
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="dewpointmax">
                Max (Tag)
              </mat-chip-option>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Luftfeuchte</h3>
            <div class="chipgroup">
              <mat-chip-option disableRipple="true" value="humidity">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="humiditymin">
                Min (Tag)
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="humiditymax">
                Max (Tag)
              </mat-chip-option>

            </div>
          </div>

          <div class="sensorGroup">
            <h3>Luftdruck</h3>
            <div class="chipgroup">
              <mat-chip-option disableRipple="true" value="pressure">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="pressuremin">
                Min (Tag)
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="pressuremax">
                Max (Tag)
              </mat-chip-option>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Wind</h3>
            <div class="chipgroup">
              <mat-chip-option disableRipple="true" value="windspeed">
                <span class="averagetext"><span>Durchschnitt</span></span>
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="windspeedmax">
                Max (Tag)
              </mat-chip-option>
              <mat-chip-option disableRipple="true" value="winddirection">
                Richtung
              </mat-chip-option>
            </div>
          </div>

          <div class="sensorGroup">
            <h3>Regen</h3>
            <div class="chipgroup">
              <mat-chip-option disableRipple="true" value="rain">
                Menge
              </mat-chip-option>
            </div>
          </div>
        </div>
      </mat-chip-listbox>

      <mat-form-field id="mobileSensorSelector">
        <mat-label>Sensoren wählen...</mat-label>
        <mat-select multiple v-model="selectedSensors" @change="this.selectionChange()">
          <mat-select-trigger>{{ mobileSelectorText }}</mat-select-trigger>
          <mat-optgroup label="Temperatur">
            <mat-option value="temperature">Durchschnitt</mat-option>
            <mat-option value="temperaturemin">Min (Tag)</mat-option>
            <mat-option value="temperaturemax">Max (Tag)</mat-option>
          </mat-optgroup>
          <mat-optgroup label="Gefühlte Temperatur">
            <mat-option value="feelsliketemp">Durchschnitt</mat-option>
            <mat-option value="feelsliketempmin">Min (Tag)</mat-option>
            <mat-option value="feelsliketempmax">Max (Tag)</mat-option>
          </mat-optgroup>
          <mat-optgroup label="Taupunkt">
            <mat-option value="dewpoint">Durchschnitt</mat-option>
            <mat-option value="dewpointmin">Min (Tag)</mat-option>
            <mat-option value="dewpointmax">Max (Tag)</mat-option>
          </mat-optgroup>
          <mat-optgroup label="Luftfeuchte">
            <mat-option value="humidity">Durchschnitt</mat-option>
            <mat-option value="humiditymin">Min (Tag)</mat-option>
            <mat-option value="humiditymax">Max (Tag)</mat-option>
          </mat-optgroup>
          <mat-optgroup label="Luftdruck">
            <mat-option value="pressure">Durchschnitt</mat-option>
            <mat-option value="pressuremin">Min (Tag)</mat-option>
            <mat-option value="pressuremax">Max (Tag)</mat-option>
          </mat-optgroup>
          <mat-optgroup label="Wind">
            <mat-option value="windspeed">Durchschnitt</mat-option>
            <mat-option value="windspeedmax">Max (Tag)</mat-option>
            <mat-option value="winddirection">Richtung</mat-option>
          </mat-optgroup>
          <mat-optgroup label="Regen">
            <mat-option value="rain">Menge</mat-option>
          </mat-optgroup>
        </mat-select>
      </mat-form-field>
    </section>

    <section id="graph">
      <div id="chartWrapper">
        <div id="loading-spinner" v-if="(data.dateTime.length === 0 || !showChart)">
          <mat-spinner></mat-spinner>
        </div>
        <canvas id="chart"
          :style="{ opacity: (data.dateTime.length !== 0 && showChart) ? 1 : 0, height: (data.dateTime.length !== 0 && showChart) ? '' : 0 }"></canvas>
      </div>

    </section>
  </div>

  <v-chip-group
        v-model="neighborhoods"
        column
        multiple
      >
        <v-chip
          filter
          variant="outlined"
        >
          Snowy Rock Place
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Honeylane Circle
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Donna Drive
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Elaine Street
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Court Street
        </v-chip>
        <v-chip
          filter
          variant="outlined"
        >
          Kennedy Park
        </v-chip>
      </v-chip-group>
</template>

<script>
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'

export default {
  name: 'Graphs',
  data() {
    return {
      neighborhoods: [1],
      showChart: true,
      timespanButtonsSelected: [false, false, false, false],
      selectedSensors: ['temperature'],
      mobileSelectorText: '',
      sensorNames: {
        temperature: 'Temp',
        temperaturemin: 'Temp Min',
        temperaturemax: 'Temp Max',
        feelsliketemp: 'Gefühlt. T.',
        feelsliketempmin: 'Gefühlt. T. Min',
        feelsliketempmax: 'Gefühlt. T. Max',
        dewpoint: 'Taup.',
        dewpointmin: 'Taup. Min',
        dewpointmax: 'Taup. Max',
        humidity: 'Luftf.',
        humiditymin: 'Luftf. Min',
        humiditymax: 'Luftf. Max',
        pressure: 'Druck',
        pressuremin: 'Druck Min',
        pressuremax: 'Druck Max',
        windspeed: 'Wind',
        windspeedmax: 'Wind Max',
        winddirection: 'Windricht.',
        rain: 'Regen',
      },
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
      datepicker: {
        // range: new FormGroup({
        //   start: new FormControl < Date | null > (null),
        //   end: new FormControl < Date | null > (null),
        // }),
        min: new Date(2019, 2, 10),
        max: new Date(new Date().setDate(new Date().getDate())),
      },
      fetchError: false,
      fromTimestamp: 0,
      toTimestamp: 0,
    }
  },

  mounted() {
    this.timespanSetDay();
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
      this.datepicker.range.setValue({
        start: new Date(from * 1000),
        end: new Date(to * 1000),
      });
      this.clearTimespanButtonsSelected();
      this.timespanButtonsSelected[3] = true;
    },
    clearTimespanButtonsSelected() {
      this.timespanButtonsSelected = this.timespanButtonsSelected.map(
        () => false
      );
    },
    updateCustom() {
      this.fromTimestamp = this.datepicker.range.value.start.getTime() / 1000;
      this.toTimestamp = this.datepicker.range.value.end.getTime() / 1000;
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
      this.drawChart();
    },
    updateMobileSelectorText() {
      this.mobileSelectorText = '';
      for (let sensor of this.selectedSensors) {
        this.mobileSelectorText += this.sensorNames[sensor] + ', ';
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
            hidden: !this.selectedSensors.includes('temperature'),
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
            hidden: !this.selectedSensors.includes('temperaturemin'),
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
            hidden: !this.selectedSensors.includes('temperaturemax'),
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
            hidden: !this.selectedSensors.includes('feelsliketemp'),
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
            hidden: !this.selectedSensors.includes('feelsliketempmin'),
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
            hidden: !this.selectedSensors.includes('feelsliketempmax'),
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
            hidden: !this.selectedSensors.includes('dewpoint'),
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
            hidden: !this.selectedSensors.includes('dewpointmin'),
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
            hidden: !this.selectedSensors.includes('dewpointmax'),
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
            hidden: !this.selectedSensors.includes('humidity'),
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
            hidden: !this.selectedSensors.includes('humiditymin'),
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
            hidden: !this.selectedSensors.includes('humiditymax'),
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
            hidden: !this.selectedSensors.includes('pressure'),
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
            hidden: !this.selectedSensors.includes('pressuremin'),
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
            hidden: !this.selectedSensors.includes('pressuremax'),
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
            hidden: !this.selectedSensors.includes('windspeed'),
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
            hidden: !this.selectedSensors.includes('windspeedmax'),
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
            hidden: !this.selectedSensors.includes('winddirection'),
            order: 20,
          },
          {
            type: 'line',
            label: 'Regen',
            data: this.data.rain,
            borderColor: 'rgb(0, 94, 255)',
            backgroundColor: 'rgb(0, 94, 255, 0.8)',
            yAxisID: 'rain',
            hidden: !this.selectedSensors.includes('rain'),
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
  