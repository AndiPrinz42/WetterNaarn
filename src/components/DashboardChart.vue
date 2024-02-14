<template>
    <div>
        <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

export default {
    components: { Line },
    props: ['morningtemp', 'noontemp', 'eveningtemp', 'nighttemp'],
    data() {
        return {
            chartData: {
                labels: ['Morgen', 'Mittag', 'Abend', 'Nacht'],
                datasets: [
                    {
                        data: [
                            this.morningtemp,
                            this.noontemp,
                            this.eveningtemp,
                            this.nighttemp,
                        ],
                        backgroundColor: '#BADCFF',
                        borderColor: '#FFFFFF',
                        borderWidth: 1.5,
                        pointBackgroundColor: '#FFFFFF',
                        pointBorderColor: '#BADCFF',
                        pointRadius: 6,
                        pointHoverRadius: 6,
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: '#D9D9D9',
                        pointHoverBorderColor: '#BADCFF',
                        pointHoverBorderWidth: 2,
                        tension: 0.4,
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0,
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            display: false,
                        },
                        border: {
                            display: false,
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.30)',
                            lineWidth: 1.5,
                        },
                    },
                    y: {
                        display: false,
                        offset: true,
                    },
                },
            }
        }
    }
}
</script>