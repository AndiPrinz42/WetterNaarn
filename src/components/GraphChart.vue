<template>
  <div>
    <Line :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, ScatterController} from "chart.js";
Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, ScatterController);

export default {
  components: { Line },
  props: ['data', 'selectedSensors'],
  data() {
    return {
      chartData: {
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
      },
      chartOptions: {
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
              label: (context) => {
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
              },
            },
          },
        },
      },
    }
  },
  methods: {
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
}
</script>