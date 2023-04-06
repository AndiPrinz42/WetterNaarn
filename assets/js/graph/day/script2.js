function fetchData(dataArea) {
    clearData();
    loader.setText("Daten abrufen...");
    loader.show();
    fetch('https://wetter-naarn.at/test/db/get/day/?day=' + dataArea[0] + '&month=' + dataArea[1] + '&year=' + dataArea[2])
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < FIELDS.length; j++) {
                    eval(FIELDS[j] + "[" + i + "] = data[" + i + "]['" + FIELDS[j] + "'];");
                }
            }
            table.update();
            chart.update();
            loader.hide();
        });
}


const input = {
    calender: {
        value: {
            get: function (selector) {
                // const selector = document.getElementById('day');
                let date = new Date(selector);
                return [date.getDate(), date.getMonth() + 1, date.getFullYear()];
            },

            set: function (date) {
                ELEMENT.valueAsDate = date;
            }
        },
        min: {
            set: function (date) {
                ELEMENT.setAttribute("max", toDateString(date));
            },
        },
        max: {
            set: function () {

            },
        },

        sensors: {

        },
    }
}

const data = {
    FIELDS: ["date", "time", "temp", "humidity", "pressure", "rain", "wind", "wind_direction", "dewpoint", "windchill", "windguests"],


    dataArea: [],
    date: [],
    time: [],
    temp: [],
    humidity: [],
    pressure: [],
    rain: [],
    wind: [],
    wind_direction: [],
    dewpoint: [],
    windchill: [],
    windguests: [],

    day: 0,
    month: 0,
    year: 0,


    fetch: function (day, month, year) {
        fetch('https://wetter-naarn.at/test/db/get/day/?day=' + day + '&month=' + month + '&year=' + year)
            .then(response => response.json())
            .then(data => {
                return data;
            });
    },

    fillData: function (data) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.FIELDS.length; j++) {
                eval(this.FIELDS[j] + "[" + i + "] = " + data + "[" + i + "]['" + this.FIELDS[j] + "'];");
            }
        }
    },

    update: function () {

    },


    // function isAllFilled(date) {
    //     if (date.length != 0) {
    //         return true;
    //     }
    //     return false;
    // }

    // function getDataArray() {
    //     if (isAllFilled(DAY.value)) {
    //         saveInputValues();
    //         fetchData(dataArea);
    //     } else {
    //         alert("Not all filled out!")
    //     }
    // }




    clear: function () {
        this.date = [];
        this.time = [];
        this.temp = [];
        this.humidity = [];
        this.pressure = [];
        this.rain = [];
        this.wind = [];
        this.wind_direction = [];
        this.dewpoint = [];
        this.windchill = [];
        this.windguests = [];
    },



}


const chart = {
    CHART: document.getElementById('chartElement'),

    draw: function () {
        const data = {
            labels: this.time,
            datasets: [{
                type: 'line',
                label: 'Temperatur',
                data: this.temp,
                borderColor: 'rgb(255, 64, 0)',
                backgroundColor: 'rgba(255, 64, 0, 0.8)',
                yAxisID: 'temperature',
                hidden: chartSensorsHidden[0],
                order: 1
            }, {
                type: 'line',
                label: 'Luftfeuchte',
                data: this.humidity,
                borderColor: 'rgb(0, 64, 255)',
                backgroundColor: 'rgba(0, 64, 255, 0.8)',
                yAxisID: 'humidity',
                hidden: chartSensorsHidden[4],
                order: 5
            }, {
                type: 'line',
                label: 'Luftdruck',
                data: this.pressure,
                borderColor: 'rgb(24, 144, 0)',
                backgroundColor: 'rgba(24, 144, 0, 0.8)',
                yAxisID: 'pressure',
                hidden: chartSensorsHidden[5],
                order: 6
            }, {
                type: 'bar',
                label: 'Regen',
                data: this.rain,
                borderColor: 'rgb(0, 94, 255)',
                backgroundColor: 'rgb(0, 94, 255, 0.8)',
                borderWidth: 3,
                yAxisID: 'rain',
                hidden: chartSensorsHidden[8],
                order: 9
            }, {
                type: 'line',
                label: 'Wind',
                data: this.wind,
                borderColor: 'rgb(32, 32, 32)',
                backgroundColor: 'rgb(32, 32, 32, 0.8)',
                yAxisID: 'wind',
                hidden: chartSensorsHidden[6],
                order: 7
            }, {
                type: 'scatter',
                label: 'Windrichtung',
                data: this.wind_direction,
                borderColor: 'rgb(128, 128, 128)',
                backgroundColor: 'rgb(128, 128, 128, 0.8)',
                yAxisID: 'winddir',
                hidden: chartSensorsHidden[7],
                order: 8
            }, {
                type: 'line',
                label: 'Taupunkt',
                data: this.dewpoint,
                borderColor: 'rgb(0, 192, 100)',
                backgroundColor: 'rgba(0, 192, 100, 0.8)',
                yAxisID: 'temperature',
                hidden: chartSensorsHidden[3],
                order: 4
            }, {
                type: 'line',
                label: 'Windchill',
                data: this.windchill,
                borderColor: 'rgb(255, 232, 0)',
                backgroundColor: 'rgba(255, 232, 0, 0.8)',
                yAxisID: 'temperature',
                hidden: chartSensorsHidden[2],
                order: 3
            }, {
                type: 'line',
                label: 'Windböen',
                data: this.windguests,
                borderColor: 'rgb(133, 43, 255)',
                backgroundColor: 'rgb(133, 43, 255, 0.8)',
                yAxisID: 'wind',
                hidden: chartSensorsHidden[1],
                order: 2
            }]
        };

        const options = {
            responsive: true,
            scales: {
                temperature: {
                    type: 'linear',
                    position: 'left',
                    grid: {
                        display: false
                    },
                    ticks: {
                        stepSize: 5,
                        color: 'rgb(255, 64, 0)',
                    },
                    title: {
                        display: false,
                        text: 'Temperatur',
                    },
                    display: yAxisVisible[0],
                },
                pressure: {
                    type: 'linear',
                    position: 'left',
                    grid: {
                        display: false
                    },
                    ticks: {
                        stepSize: 5,
                        color: 'rgb(24, 144, 0)',
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature'

                    },
                    title: {
                        display: false,
                        text: 'Druck',
                    },
                    display: yAxisVisible[1],
                },
                wind: {
                    type: 'linear',
                    position: 'left',
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgb(32, 32, 32)',
                    },
                    min: 0,
                    title: {
                        display: false,
                        text: 'Wind',
                    },
                    display: yAxisVisible[2],
                },
                humidity: {
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false
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
                    display: yAxisVisible[3],
                },
                rain: {
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgb(0, 94, 255)',
                    },
                    min: 0,
                    title: {
                        display: false,
                        text: 'Regen',
                    },
                    display: yAxisVisible[4],
                },
                winddir: {
                    type: 'linear',
                    position: 'right',
                    grid: {
                        display: false
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
                    display: yAxisVisible[5],
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        };

        const plugin = {
            id: 'custom_canvas_background_color',
            beforeDraw: (chartElement) => {
                const {
                    ctx
                } = chartElement;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, chartElement.width, chartElement.height);
                ctx.restore();
            }
        };

        const config = {
            data: data,
            options: options,
            plugins: [plugin],
        }

        chartElement = new Chart(this.CHART,
            config
        );
    },

    destroy: function () {
        chartElement.destroy();
    },

    updateView: function () {
        if (isCurrentChart) {
            this.CHART.style.display = "flex";
        } else {
            this.CHART.style.display = "none";
        }
    },

    update: function () {
        try {
            this.destroy();
        } catch (e) {}
        this.create();
        this.updateView();
    },

    download: function (filename) {
        let a = document.createElement('a');
        a.href = chartElement.toBase64Image();
        a.download = filename;
        a.click();
    }
}

// Table
const table = {
    TABLE_SELECTOR: document.getElementById("tableWrapper"),
    update: function () {
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        let tr = document.createElement('tr');
        let th = document.createElement('th');
        let td = document.createElement('td');

        for (let i = 1; i < FIELDS.length; i++) {
            if (!tableSensorsHidden[i - 2]) {
                th = document.createElement('th');
                th.appendChild(document.createTextNode(FIELDS_READABLE[i]));
                tr.appendChild(th);
            }
        }
        thead.appendChild(tr);
        table.appendChild(thead);
        for (let i = 0; i < date.length; i++) {
            tr = document.createElement('tr');
            for (let j = 1; j < FIELDS.length; j++) {
                if (!tableSensorsHidden[j - 2]) {
                    td = document.createElement('td');
                    let value = eval(FIELDS[j])[i];
                    if (j != 1) {
                        value = decimalFormat(value);
                    }
                    td.appendChild(document.createTextNode(value));
                    td.setAttribute("data-label", FIELDS_READABLE[j]);
                    tr.appendChild(td);
                }
            }
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        this.TABLE_SELECTOR.innerHTML = "";
        this.TABLE_SELECTOR.appendChild(table);

        if (!isCurrentChart) {
            this.TABLE_SELECTOR.style.display = 'flex';
        } else {
            this.TABLE_SELECTOR.style.display = 'none';
        }
    },

    toCSV: function (filename) {
        let data = [];
        const ROWS = document.querySelectorAll("table tr");
        for (let i = 0; i < ROWS.length; i++) {
            const ROW = [];
            const COLS = ROWS[i].querySelectorAll("td, th");
            for (let j = 0; j < COLS.length; j++) {
                ROW.push(COLS[j].innerText.replace('.', ','));
            }
            data.push(ROW.join(";"));
        }

        downloadCSVFile(data.join("\n"), filename);
    },

    downloadCSV: function (csv, filename) {
        let csv_file, download_link;
        csv_file = new Blob([csv], {
            type: "text/csv"
        });
        download_link = document.createElement("a");
        download_link.download = filename;
        download_link.href = window.URL.createObjectURL(csv_file);
        download_link.style.display = "none";
        document.body.appendChild(download_link);
        download_link.click();
    }
}





function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
    return date;
}

function toDateString(day) {
    let dd = day.getDate();
    let mm = day.getMonth() + 1;
    let yyyy = day.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    day = yyyy + '-' + mm + '-' + dd;
    return day;
}

function toDecimalFormat(value) {
    return Number.parseFloat(value).toFixed(1).replace(".", ",");
}

function updateSensorSelection() {
    for (let i = 0; i <= 8; i++) {
        chartSensorsHidden[i] = true;
        tableSensorsHidden[i] = true;
    }
    for (let i = 0; i <= 5; i++) {
        yAxisVisible[i] = false;
    }

    $(SENSOR_SELECTOR).val().forEach(x => {
        switch (x) {
            case 'Temperatur':
                chartSensorsHidden[0] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[0] = false;
                break;
            case 'Taupunkt':
                chartSensorsHidden[3] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[6] = false;
                break;
            case 'Luftfeuchte':
                chartSensorsHidden[4] = false;
                yAxisVisible[3] = true;
                tableSensorsHidden[1] = false;
                break;
            case 'Luftdruck':
                chartSensorsHidden[5] = false;
                yAxisVisible[1] = true;
                tableSensorsHidden[2] = false;
                break;
            case 'Regen':
                chartSensorsHidden[8] = false;
                yAxisVisible[4] = true;
                tableSensorsHidden[3] = false;
                break;
            case 'Windgeschwindigkeit':
                chartSensorsHidden[6] = false;
                yAxisVisible[2] = true;
                tableSensorsHidden[4] = false;
                break;
            case 'Windrichtung':
                chartSensorsHidden[7] = false;
                yAxisVisible[5] = true;
                tableSensorsHidden[5] = false;
                break;
            case 'Windböen':
                chartSensorsHidden[1] = false;
                yAxisVisible[2] = true;
                tableSensorsHidden[8] = false;
                break;
            case 'Windchill':
                chartSensorsHidden[2] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[7] = false;
                break;
        }
    });
}






// const Variable Declaration
// const FIELDS = ['date', 'time', 'temp', 'humidity', 'pressure', 'rain', 'wind', 'wind_direction', 'dewpoint', 'windchill', 'windguests'];
const FIELDS_READABLE = ['Datum', 'Zeit', 'Temperatur', 'Luftfeuchte', 'Luftdruck', 'Regen', 'Wind', 'Windrichtung', 'Taupunkt', 'Windchill', 'Windböen'];
const SENSOR_SELECTOR = document.getElementById("sensors");

const DONWLOAD_BTN = document.getElementById('download');
const VIEW_TOGGLE = document.getElementById('viewToggle');
const VIEW_TYPE = document.getElementById('viewType');
const VIEW_TYPE_ICON = document.getElementById('viewTypeIcon');

// let Variable Declaration
let isCurrentChart = true;
let today = new Date();

delete today;
let chartSensorsHidden = new Array();
let tableSensorsHidden = new Array();
let yAxisVisible = new Array();


// Event Listeners
SENSOR_SELECTOR.onchange = function () {
    updateSensorSelection();
    table.update();
    updateChart();
}

// DAY.onchange = function () {
//     getDataArray();
// }

DONWLOAD_BTN.onclick = function () {
    if (isCurrentChart) {
        downloadChart("WetterNaarnDiagramm_" + new Date(dataArea[2] + "," + dataArea[1] + "," + dataArea[0]).toLocaleDateString('de-AT') + ".png");
    } else {
        table.toCSV("WetterNaarnTabelle_" + new Date(dataArea[2] + "," + dataArea[1] + "," + dataArea[0]).toLocaleDateString('de-AT') + ".csv");
    }
}

VIEW_TOGGLE.onclick = function () {
    isCurrentChart = !isCurrentChart;
    if (isCurrentChart) {
        VIEW_TYPE.innerHTML = "Tabellenansicht";
        VIEW_TYPE_ICON.setAttribute("class", "bx bx-table");
    } else {
        VIEW_TYPE.innerHTML = "Diagrammansicht";
        VIEW_TYPE_ICON.setAttribute("class", "bx bx-line-chartElement");
    }
    table.update();
    updateChart();
}



// Initialisation

// Sensor Search Error Message
$(document).ready(function () {
    $("#sensors").chosen({
        no_results_text: "Keine Sensoren gefunden..."
    });
});

// Field Arrays Generation


// set day picker to today
// DAY.valueAsDate = new Date();
// // set day pickers maximum to current day
// DAY.setAttribute("max", toDateString(new Date()));
// // set day pickers minimum to 7 days in the past
// DAY.setAttribute("min", toDateString(subtractDays(7, new Date())));


// saveInputValues();
// updateSensorSelection();
// fetchData(dataArea);

console.log(input.calender.value.get(document.getElementById('day').value));