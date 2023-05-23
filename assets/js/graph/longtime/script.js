function fetchData(dataArea) {
    clearData();
    LOADER.innerText = "Daten abrufen...";
    LOADER.style.display = "flex";
    fetch('https://wetter-naarn.at/assets/api/database/get/longtime/?df=' + dataArea[0] + '&dt=' + dataArea[1] + '&yf=' + dataArea[2] + '&yt=' + dataArea[3] + '&f=' + dataArea[4])
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < FIELDS.length; j++) {
                    eval(FIELDS[j] + "[" + i + "] = data[" + i + "]['" + FIELDS[j] + "'];");
                }
            }

            date_cleaned = Array.from(date);
            if (date_cleaned[0].slice(date_cleaned[0].lastIndexOf("/") + 1, date_cleaned[0].lastIndexOf("/") + 3) == date_cleaned[date_cleaned.length - 1].slice(date_cleaned[date_cleaned.length - 1].lastIndexOf("/") + 1, date_cleaned[date_cleaned.length - 1].lastIndexOf("/") + 3)) {
                date_cleaned = removeCentury(date_cleaned);
            }

            if (date_cleaned[0].slice(date_cleaned[0].lastIndexOf("/")) == date_cleaned[date_cleaned.length - 1].slice(date_cleaned[date_cleaned.length - 1].lastIndexOf("/"))) {
                date_cleaned = removeYear(date_cleaned);
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
        labels: date_cleaned,
        datasets: [{
            type: 'line',
            label: 'Temperatur',
            data: temp,
            borderColor: 'rgb(255, 64, 0)',
            backgroundColor: 'rgba(255, 64, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[0],
            pointRadius: 0,
            order: 1,
        }, {
            type: 'line',
            label: 'Temperatur Min',
            data: temp_min,
            borderColor: 'rgb(255, 128, 0)',
            backgroundColor: 'rgba(255, 128, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[1],
            pointRadius: 0,
            order: 2,
        }, {
            type: 'line',
            label: 'Temperatur Max',
            data: temp_max,
            borderColor: 'rgb(255, 0, 0)',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[2],
            pointRadius: 0,
            order: 3,
        }, {
            type: 'line',
            label: 'Luftfeuchte',
            data: humidity,
            borderColor: 'rgb(0, 64, 255)',
            backgroundColor: 'rgba(0, 64, 255, 0.8)',
            yAxisID: 'humidity',
            hidden: chartSensorsHidden[9],
            pointRadius: 0,
            order: 10,
        }, {
            type: 'line',
            label: 'Luftfeuchte Max',
            data: humidity_max,
            borderColor: 'rgb(0, 0, 255)',
            backgroundColor: 'rgba(0, 0, 255, 0.8)',
            yAxisID: 'humidity',
            hidden: chartSensorsHidden[11],
            pointRadius: 0,
            order: 12,
        }, {
            type: 'line',
            label: 'Luftfeuchte Min',
            data: humidity_min,
            borderColor: 'rgb(0, 128, 255)',
            backgroundColor: 'rgba(0, 128, 255, 0.8)',
            yAxisID: 'humidity',
            hidden: chartSensorsHidden[10],
            pointRadius: 0,
            order: 11,
        }, {
            type: 'line',
            label: 'Luftdruck',
            data: pressure,
            borderColor: 'rgb(24, 144, 0)',
            backgroundColor: 'rgba(24, 144, 0, 0.8)',
            yAxisID: 'pressure',
            hidden: chartSensorsHidden[12],
            pointRadius: 0,
            order: 13,
        }, {
            type: 'line',
            label: 'Luftdruck Min',
            data: pressure_min,
            borderColor: 'rgb(32, 192, 0)',
            backgroundColor: 'rgba(32, 192, 0, 0.8)',
            yAxisID: 'pressure',
            hidden: chartSensorsHidden[13],
            pointRadius: 0,
            order: 14,
        }, {
            type: 'line',
            label: 'Luftdruck Max',
            data: pressure_max,
            borderColor: 'rgb(16, 96, 0)',
            backgroundColor: 'rgba(16, 96, 0, 0.8)',
            yAxisID: 'pressure',
            hidden: chartSensorsHidden[14],
            pointRadius: 0,
            order: 15,
        }, {
            type: 'bar',
            label: 'Regen',
            data: rain,
            borderColor: 'rgb(0, 94, 255)',
            backgroundColor: 'rgb(0, 94, 255, 0.8)',
            borderWidth: 3,
            yAxisID: 'rain',
            hidden: chartSensorsHidden[20],
            order: 21
        }, {
            type: 'line',
            label: 'Wind',
            data: wind,
            borderColor: 'rgb(32, 32, 32)',
            backgroundColor: 'rgb(32, 32, 32, 0.8)',
            yAxisID: 'wind',
            hidden: chartSensorsHidden[15],
            pointRadius: 0,
            order: 16
        }, {
            type: 'line',
            label: 'Wind Max',
            data: wind_max,
            borderColor: 'rgb(0, 0, 0)',
            backgroundColor: 'rgb(0, 0, 0, 0.8)',
            yAxisID: 'wind',
            hidden: chartSensorsHidden[16],
            pointRadius: 0,
            order: 17
        }, {
            type: 'scatter',
            label: 'Windrichtung',
            data: wind_direction,
            borderColor: 'rgb(128, 128, 128)',
            backgroundColor: 'rgb(128, 128, 128, 0.8)',
            yAxisID: 'winddir',
            hidden: chartSensorsHidden[19],
            order: 20
        }, {
            type: 'line',
            label: 'Taupunkt',
            data: dewpoint,
            borderColor: 'rgb(0, 192, 100)',
            backgroundColor: 'rgba(0, 192, 100, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[6],
            pointRadius: 0,
            order: 7,
        }, {
            type: 'line',
            label: 'Taupunkt Max',
            data: dewpoint_max,
            borderColor: 'rgb(0, 128, 100)',
            backgroundColor: 'rgba(0, 128, 100, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[8],
            pointRadius: 0,
            order: 9,
        }, {
            type: 'line',
            label: 'Taupunkt Min',
            data: dewpoint_min,
            borderColor: 'rgb(0, 255, 200)',
            backgroundColor: 'rgba(0, 255, 200, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[7],
            pointRadius: 0,
            order: 8,
        }, {
            type: 'line',
            label: 'Windchill',
            data: windchill,
            borderColor: 'rgb(255, 232, 0)',
            backgroundColor: 'rgba(255, 232, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[3],
            pointRadius: 0,
            order: 4,
        }, {
            type: 'line',
            label: 'Windchill Max',
            data: windchill_max,
            borderColor: 'rgb(255, 200, 0)',
            backgroundColor: 'rgba(255, 200, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[5],
            pointRadius: 0,
            order: 6,
        }, {
            type: 'line',
            label: 'Windchill Min',
            data: windchill_min,
            borderColor: 'rgb(255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 0, 0.8)',
            yAxisID: 'temperature',
            hidden: chartSensorsHidden[4],
            pointRadius: 0,
            order: 5,
        }, {
            type: 'line',
            label: 'Windböen',
            data: windguests,
            borderColor: 'rgb(133, 43, 255)',
            backgroundColor: 'rgb(133, 43, 255, 0.8)',
            yAxisID: 'wind',
            hidden: chartSensorsHidden[17],
            pointRadius: 0,
            order: 18
        }, {
            type: 'line',
            label: 'Windböen Max',
            data: windguests_max,
            borderColor: 'rgb(106, 0, 255)',
            backgroundColor: 'rgb(106, 0, 255, 0.8)',
            yAxisID: 'wind',
            hidden: chartSensorsHidden[18],
            pointRadius: 0,
            order: 19
        }]
    }

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

    for (let i = 0; i < FIELDS.length; i++) {
        if (!tableSensorsHidden[i - 1]) {
            th = document.createElement('th');
            let unit = FIELDS_UNITS[i - 1];
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
        for (let j = 0; j < FIELDS.length; j++) {
            if (!tableSensorsHidden[j - 1]) {
                td = document.createElement('td');
                let value = eval(FIELDS[j])[i];
                if (j != 0) {
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


function decimalFormat(value) {
    return Number.parseFloat(value).toFixed(1).replace(".", ",");
}

function dayDifference(from = parseInt(from), to = parseInt(to)) {
    return ((((to - from) / (24 * 60 * 60)) / 1000) + 1);
}

function removeYear(data) {
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].slice(0, data[i].lastIndexOf("/"));
    }
    return data;
}

function removeCentury(data) {
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].slice(0, data[i].lastIndexOf("/") + 1) + data[i].slice(data[i].lastIndexOf("/") + 3);
    }
    return data;
}

function setDatepicker() {
    if (!isAllFilled(DATE_TO.value)) {
        DATE_FROM.setAttribute("max", toDateString(subtractDays(1, new Date())));
    } else {
        DATE_FROM.setAttribute("max", toDateString(new Date(DATE_TO.value)));
    }
    DATE_TO.setAttribute("min", DATE_FROM.value);
    DATE_TO.setAttribute("max", toDateString(subtractDays(1, new Date())));
}

function getDataArray() {
    if (isAllFilled(DATE_FROM.value) && isAllFilled(DATE_TO.value)) {
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
    dataArea[2] = new Date(DATE_FROM.value).getFullYear();
    dataArea[3] = new Date(DATE_TO.value).getFullYear();
    dataArea[0] = dayDifference(new Date(dataArea[2] + "-01-01").valueOf(), new Date(DATE_FROM.value).valueOf());
    dataArea[1] = dayDifference(new Date(dataArea[3] + "-01-01").valueOf(), new Date(DATE_TO.value).valueOf());
    dataArea[4] = parseInt(dayDifference(new Date(DATE_FROM.value).valueOf(), new Date(DATE_TO.value).valueOf()) / 96);
    if (dataArea[4] < 1) {
        dataArea[4] = 1;
    }
    dataArea[5] = DATE_FROM.value;
    dataArea[6] = DATE_TO.value;
}



function updateSensorSelection() {
    for (let i = 0; i <= 20; i++) {
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
            case 'Temperatur Min':
                chartSensorsHidden[1] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[1] = false;
                break;
            case 'Temperatur Max':
                chartSensorsHidden[2] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[2] = false;
                break;
            case 'Taupunkt':
                chartSensorsHidden[6] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[13] = false;
                break;
            case 'Taupunkt Min':
                chartSensorsHidden[7] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[15] = false;
                break;
            case 'Taupunkt Max':
                chartSensorsHidden[8] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[14] = false;
                break;
            case 'Luftfeuchte':
                chartSensorsHidden[9] = false;
                yAxisVisible[3] = true;
                tableSensorsHidden[3] = false;
                break;
            case 'Luftfeuchte Min':
                chartSensorsHidden[10] = false;
                yAxisVisible[3] = true;
                tableSensorsHidden[4] = false;
                break;
            case 'Luftfeuchte Max':
                chartSensorsHidden[11] = false;
                yAxisVisible[3] = true;
                tableSensorsHidden[5] = false;
                break;
            case 'Luftdruck':
                chartSensorsHidden[12] = false;
                yAxisVisible[1] = true;
                tableSensorsHidden[6] = false;
                break;
            case 'Luftdruck Min':
                chartSensorsHidden[13] = false;
                yAxisVisible[1] = true;
                tableSensorsHidden[7] = false;
                break;
            case 'Luftdruck Max':
                chartSensorsHidden[14] = false;
                yAxisVisible[1] = true;
                tableSensorsHidden[8] = false;
                break;
            case 'Regen':
                chartSensorsHidden[20] = false;
                yAxisVisible[4] = true;
                tableSensorsHidden[9] = false;
                break;
            case 'Windgeschwindigkeit':
                chartSensorsHidden[15] = false;
                yAxisVisible[2] = true;
                tableSensorsHidden[10] = false;
                break;
            case 'Windgeschwindigkeit Max':
                chartSensorsHidden[16] = false;
                yAxisVisible[2] = true;
                tableSensorsHidden[11] = false;
                break;
            case 'Windrichtung':
                chartSensorsHidden[19] = false;
                yAxisVisible[5] = true;
                tableSensorsHidden[12] = false;
                break;
            case 'Windböen':
                chartSensorsHidden[18] = false;
                yAxisVisible[2] = true;
                tableSensorsHidden[19] = false;
                break;
            case 'Windböen Max':
                chartSensorsHidden[17] = false;
                yAxisVisible[2] = true;
                tableSensorsHidden[20] = false;
                break;
            case 'Windchill':
                chartSensorsHidden[3] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[16] = false;
                break;
            case 'Windchill Min':
                chartSensorsHidden[4] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[18] = false;
                break;
            case 'Windchill Max':
                chartSensorsHidden[5] = false;
                yAxisVisible[0] = true;
                tableSensorsHidden[17] = false;
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
    const UNIT_ID = FIELDS_READABLE.indexOf(label) - 1;
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


// const variable Declaration
const FIELDS = ['date', 'temp', 'temp_min', 'temp_max', 'humidity', 'humidity_min', 'humidity_max', 'pressure', 'pressure_min', 'pressure_max', 'rain', 'wind', 'wind_max', 'wind_direction', 'dewpoint', 'dewpoint_max', 'dewpoint_min', 'windchill', 'windchill_max', 'windchill_min', 'windguests', 'windguests_max'];
const FIELDS_READABLE = ['Datum', 'Temperatur', 'Temperatur Min', 'Temperatur Max', 'Luftfeuchte', 'Luftfeuchte Min', 'Luftfeuchte Max', 'Luftdruck', 'Luftdruck Min', 'Luftdruck Max', 'Regen', 'Windgeschwindigkeit', 'Windgeschwindigkeit Max', 'Windrichtung', 'Taupunkt', 'Taupunkt Max', 'Taupunkt Min', 'Windchill', 'Windchill Max', 'Windchill Min', 'Windböen', 'Windböen Max'];
const FIELDS_UNITS = ['°C', '°C', '°C', '%', '%', '%', 'hPa', 'hPa', 'hPa', 'mm', 'km/h', 'km/h', '°', '°C', '°C', '°C', '°C', '°C', '°C', 'km/h', 'km/h'];
const CHART = document.getElementById('chartElement');
const LOADER = document.querySelectorAll('.loader')[0];
const DATE_FROM = document.getElementById("date-from");
const DATE_TO = document.getElementById("date-to");
const SENSOR_SELECTOR = document.getElementById("sensors");
const REFRESH_BTN = document.getElementById("refresh_btn");
const TABLE_SELECTOR = document.getElementById("tableWrapper");
const DONWLOAD_BTN = document.getElementById('download');
const VIEW_TOGGLE = document.getElementById('viewToggle');
const VIEW_TYPE = document.getElementById('viewType');
const VIEW_TYPE_ICON = document.getElementById('viewTypeIcon');


// let variable Declaration
let isCurrentChart = true;
let chart;
let dataArea = new Array();
let chartSensorsHidden = new Array();
let tableSensorsHidden = new Array();
let yAxisVisible = new Array();
let date_cleaned = new Array();


// Event Listeners
SENSOR_SELECTOR.onchange = function () {
    updateSensorSelection();
    updateTable();
    updateChart();
}

DATE_FROM.onchange = function () {
    setDatepicker();
};

DATE_TO.onchange = function () {
    setDatepicker();
};

REFRESH_BTN.onclick = function () {
    getDataArray();
};

DONWLOAD_BTN.onclick = function () {
    if (isCurrentChart) {
        downloadChart("WetterNaarnDiagramm_" + new Date(dataArea[5]).toLocaleDateString('de-AT') + "-" + new Date(dataArea[6]).toLocaleDateString('de-AT') + ".png");
    } else {
        htmlToCSV("WetterNaarnTabelle_" + new Date(dataArea[5]).toLocaleDateString('de-AT') + "-" + new Date(dataArea[6]).toLocaleDateString('de-AT') + ".csv");
    }
}

VIEW_TOGGLE.onclick = function () {
    isCurrentChart = !isCurrentChart;
    if (isCurrentChart) {
        VIEW_TYPE_ICON.setAttribute("class", "bx bx-table");
    } else {
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

DATE_FROM.valueAsDate = subtractDays(31, new Date());
DATE_TO.valueAsDate = subtractDays(1, new Date());


setDatepicker();
saveInputValues();
updateSensorSelection();
fetchData(dataArea);