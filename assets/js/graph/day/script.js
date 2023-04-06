function fetchData(dataArea) {
    clearData();
    LOADER.innerText = "Daten abrufen...";
    LOADER.style.display = "flex";
    fetch('https://wetter-naarn.at/assets/API/database/get/day/?day=' + dataArea[0] + '&month=' + dataArea[1] + '&year=' + dataArea[2])
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < FIELDS.length; j++) {
                    eval(FIELDS[j] + "[" + i + "] = data[" + i + "]['" + FIELDS[j] + "'];");
                }
            }
            updateTable();
            updateChart();
            LOADER.style.display = "none";
        });
}

function clearData() {
    for (let j = 0; j < FIELDS.length; j++) {
        eval(FIELDS[j] + " = [];");
    }
}


function updateChart() {
    try {
        chart.destroy();
    } catch (e) {}

    const data = {
        labels: time,
        datasets: [{
            type: 'line',
            label: 'Temperatur',
            data: temp,
            borderColor: 'rgb(255, 64, 0)',
            backgroundColor: 'rgba(255, 64, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[0],
            pointRadius: 0,
            order: 1
        }, {
            type: 'line',
            label: 'Luftfeuchte',
            data: humidity,
            borderColor: 'rgb(0, 64, 255)',
            backgroundColor: 'rgba(0, 64, 255, 0.8)',
            yAxisID: 'humidity',
            hidden: chartSensorsHidden[4],
            pointRadius: 0,
            order: 5
        }, {
            type: 'line',
            label: 'Luftdruck',
            data: pressure,
            borderColor: 'rgb(24, 144, 0)',
            backgroundColor: 'rgba(24, 144, 0, 0.8)',
            yAxisID: 'pressure',
            hidden: chartSensorsHidden[5],
            pointRadius: 0,
            order: 6
        }, {
            type: 'bar',
            label: 'Regen',
            data: rain,
            borderColor: 'rgb(0, 94, 255)',
            backgroundColor: 'rgb(0, 94, 255, 0.8)',
            borderWidth: 3,
            yAxisID: 'rain',
            hidden: chartSensorsHidden[8],
            order: 9
        }, {
            type: 'line',
            label: 'Wind',
            data: wind,
            borderColor: 'rgb(32, 32, 32)',
            backgroundColor: 'rgb(32, 32, 32, 0.8)',
            yAxisID: 'wind',
            hidden: chartSensorsHidden[6],
            pointRadius: 0,
            order: 7
        }, {
            type: 'scatter',
            label: 'Windrichtung',
            data: wind_direction,
            borderColor: 'rgb(128, 128, 128)',
            backgroundColor: 'rgb(128, 128, 128, 0.8)',
            yAxisID: 'winddir',
            hidden: chartSensorsHidden[7],
            order: 8
        }, {
            type: 'line',
            label: 'Taupunkt',
            data: dewpoint,
            borderColor: 'rgb(0, 192, 100)',
            backgroundColor: 'rgba(0, 192, 100, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[3],
            pointRadius: 0,
            order: 4
        }, {
            type: 'line',
            label: 'Windchill',
            data: windchill,
            borderColor: 'rgb(255, 232, 0)',
            backgroundColor: 'rgba(255, 232, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[2],
            pointRadius: 0,
            order: 3
        }, {
            type: 'line',
            label: 'Windböen',
            data: windguests,
            borderColor: 'rgb(133, 43, 255)',
            backgroundColor: 'rgb(133, 43, 255, 0.8)',
            yAxisID: 'wind',
            hidden: chartSensorsHidden[1],
            pointRadius: 0,
            order: 2
        }]
    };

    const units = function (context) {
        var label = context.dataset.label || '';
        if (label) {
            label += ': ';
        }
        if (context.parsed.y !== null) {
            label += addUnit(context.parsed.y, label.slice(0, -2));
        }
        return label;
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
            },
            tooltip: {
                displayColors: false,
                callbacks: {
                    label: units,
                }
            }
        },
    };

    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const {
                ctx
            } = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    const config = {
        data: data,
        options: options,
        plugins: [plugin],
    }

    chart = new Chart(CHART,
        config
    );

    if (isCurrentChart) {
        CHART.style.display = "flex";
    } else {
        CHART.style.display = "none";
    }
}

function downloadChart(NAME) {
    let a = document.createElement('a');
    a.href = chart.toBase64Image();
    a.download = NAME;
    a.click();
}



// Table
function updateTable() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    let td = document.createElement('td');

    for (let i = 1; i < FIELDS.length; i++) {
        if (!tableSensorsHidden[i - 2]) {
            th = document.createElement('th');
            let unit = FIELDS_UNITS[i - 2];
            if (unit === undefined) {
                unit = '';
            } else {
                unit = "(" + unit + ")";
            }
            th.appendChild(document.createTextNode(FIELDS_READABLE[i] + " " + unit));
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

    TABLE_SELECTOR.innerHTML = "";
    TABLE_SELECTOR.appendChild(table);

    if (!isCurrentChart) {
        TABLE_SELECTOR.style.display = 'flex';
    } else {
        TABLE_SELECTOR.style.display = 'none';
    }
}

function htmlToCSV(filename) {
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
}

function downloadCSVFile(csv, filename) {
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

function decimalFormat(value) {
    return Number.parseFloat(value).toFixed(1).replace(".", ",");
}

function getDataArray() {
    if (isAllFilled(DAY.value)) {
        saveInputValues();
        fetchData(dataArea);
    } else {
        alert("Not all filled out!")
    }
}

function isAllFilled(date) {
    if (date.length != 0) {
        return true;
    }
    return false;
}

function saveInputValues() {
    let date = new Date(DAY.value);
    dataArea[0] = date.getDate();
    dataArea[1] = date.getMonth() + 1;
    dataArea[2] = date.getFullYear();
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

function winddirDegreeToString(degree) {
    if (degree >= 337.5 || degree < 22.5) {
        return "N";
    } else if (degree >= 22.5 && degree < 67.5) {
        return "NO";
    } else if (degree >= 67.5 && degree < 112.5) {
        return "O";
    } else if (degree >= 112.5 && degree < 157.5) {
        return "SO";
    } else if (degree >= 157.5 && degree < 202.5) {
        return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
        return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
        return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
        return "NW";
    }
}

function addUnit(value, label) {
    const UNIT_ID = FIELDS_READABLE.indexOf(label) - 2;
    if (UNIT_ID < 0) {
        return value;
    }
    const VALUE_COPY = value;
    value += FIELDS_UNITS[UNIT_ID];
    if (FIELDS_UNITS[UNIT_ID] == "°") {
        value += " (" + winddirDegreeToString(VALUE_COPY) + ")";
    }
    return value;
}

// const Variable Declaration
const FIELDS = ['date', 'time', 'temp', 'humidity', 'pressure', 'rain', 'wind', 'wind_direction', 'dewpoint', 'windchill', 'windguests'];
const FIELDS_READABLE = ['Datum', 'Zeit', 'Temperatur', 'Luftfeuchte', 'Luftdruck', 'Regen', 'Wind', 'Windrichtung', 'Taupunkt', 'Windchill', 'Windböen'];
const FIELDS_UNITS = ['°C', '%', 'hPa', 'mm', 'km/h', '°', '°C', '°C', 'km/h'];
const CHART = document.getElementById('chartElement');
const LOADER = document.querySelectorAll('.loader')[0];
const DAY = document.getElementById('day');
const SENSOR_SELECTOR = document.getElementById("sensors");
const TABLE_SELECTOR = document.getElementById("tableWrapper");
const DONWLOAD_BTN = document.getElementById('download');
const VIEW_TOGGLE = document.getElementById('viewToggle');
const VIEW_TYPE = document.getElementById('viewType');
const VIEW_TYPE_ICON = document.getElementById('viewTypeIcon');

// let Variable Declaration
let isCurrentChart = true;
let chart;
let today = new Date();
let dataArea = new Array();
delete today;
let chartSensorsHidden = new Array();
let tableSensorsHidden = new Array();
let yAxisVisible = new Array();


// Event Listeners
SENSOR_SELECTOR.onchange = function () {
    updateSensorSelection();
    updateTable();
    updateChart();
}

DAY.onchange = function () {
    getDataArray();
}

DONWLOAD_BTN.onclick = function () {
    if (isCurrentChart) {
        downloadChart("WetterNaarnDiagramm_" + new Date(dataArea[2] + "," + dataArea[1] + "," + dataArea[0]).toLocaleDateString('de-AT') + ".png");
    } else {
        htmlToCSV("WetterNaarnTabelle_" + new Date(dataArea[2] + "," + dataArea[1] + "," + dataArea[0]).toLocaleDateString('de-AT') + ".csv");
    }
}

VIEW_TOGGLE.onclick = function () {
    isCurrentChart = !isCurrentChart;
    if (isCurrentChart) {
        VIEW_TYPE.innerHTML = "Tabellenansicht";
        VIEW_TYPE_ICON.setAttribute("class", "bx bx-table");
    } else {
        VIEW_TYPE.innerHTML = "Diagrammansicht";
        VIEW_TYPE_ICON.setAttribute("class", "bx bx-line-chart");
    }
    updateTable();
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
for (let j = 0; j < FIELDS.length; j++) {
    eval("let " + FIELDS[j] + " = new Array();");
}

// set day picker to today
DAY.valueAsDate = new Date();
// set day pickers maximum to current day
DAY.setAttribute("max", toDateString(new Date()));
// set day pickers minimum to 7 days in the past
DAY.setAttribute("min", toDateString(subtractDays(7, new Date())));


saveInputValues();
updateSensorSelection();
fetchData(dataArea);