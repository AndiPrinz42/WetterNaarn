const CSS_ROOT = document.documentElement;
const MORNING_ELEMENT = document.querySelector("#item3 #morning > .time");
const AFTERNOON_ELEMENT = document.querySelector("#item3 #afternoon > .time");
const ACC_BTNS = document.querySelectorAll("#item4 .accordion-header");
const ACC_CONTENTS = document.querySelectorAll("#item4 .accordion-body");
const ITEMS = document.querySelectorAll(
  "#item4 .accordion-header .infos .item"
);
const CONDITION_TEXT_ELEMENT = document.querySelectorAll(
  "#item4 .accordion-header .infos .condition .conditionTxt"
);
const WIND_ELEMENT = document.querySelectorAll(
  "#item4 .accordion-header .infos .wind"
);

function init() {
  const UUID = generateUUID();

  if (!CSS || !CSS.supports("display", "grid")) {
    console.warn(
      "Die display:grid Eigenschaft wird nicht unterstützt! Bitte wechseln Sie zu einem neueren Browser, um ihr Benutzererlebnis zu verbessern.\n\ndisplay:grid property not supported! Please switch to a newer browser for better experience."
    );
  }

  //get current data
  fetch("https://wetter-naarn.at/assets/api/getCurrent/index.php?cache=" + UUID)
    .then((response) => response.json())
    .then((data) => {
      //backgrounds
      CSS_ROOT.style.setProperty(
        "--bgImageURL",
        "url('https://wetter-naarn.at/assets/img/dashboard/bg/" +
          data["icon"] +
          ".jpg')"
      );

      //item1
      document.querySelector("#item1 .icon > img").src =
        "https://wetter-naarn.at/assets/img/dashboard/icons/current/" +
        data["icon"] +
        ".svg";

      document.querySelector("#item1 .time").innerText = data["date"]["time"];

      document.querySelector("#item1 .temp > div").innerText =
        data["temp"]["current"] + "°C";

      document.querySelector("#item1 .condition > div").innerText =
        data["condition"];

      //item2
      document.querySelector(
        "#item2 .feelslike-sunlocation .top .feelsliketemp"
      ).innerText = data["wind"]["chill"]["current"] + "°C";

      document.querySelector("#item2 #valueTable .humidity .value").innerText =
        data["humidity"]["current"] + "%";

      document.querySelector("#item2 #valueTable .dewpoint .value").innerText =
        data["dewpoint"]["current"] + "°C";

      document.querySelector("#item2 #valueTable .pressure .value").innerText =
        data["pressure"]["current"] + "hPa";

      document.querySelector("#item2 #valueTable .wind .value").innerText =
        data["wind"]["speed"]["current"] + "km/h";

      document.querySelector("#item2 #valueTable .guests .value").innerText =
        data["wind"]["guests"]["current"] + "km/h";

      document.querySelector(
        "#item2 #valueTable .windDirection .value"
      ).innerText = data["wind"]["direction"]["txt"];
      
      document.querySelector(
        "#item2 #valueTable .lasticeday .value"
      ).innerText = data["lasticeday"];

      document.querySelector("#item2 #valueTable .rain .value").innerText =
        data["rain"]["today"] + "mm²";

      document.querySelector("#item2 #valueTable .lastRain .value").innerText =
        data["rain"]["last"];

      document.querySelector("#item2 #valueTable .horizView .value").innerText =
        data["horiz_view"];

      document.querySelector("#item2 #valueTable .cloudline .value").innerText =
        data["cloudline"] + "m";

      document.querySelector("#item2 #valueTable .snowline .value").innerText =
        data["snowline"] + "m";

      document.querySelector("#item2 #valueTable .sunset .value").innerText =
        data["sun"]["set"];

      document.querySelector("#item2 #valueTable .moonphase .value").innerText =
        data["moon"]["phase"]["current"] + "%";

      let currentTime = data["date"]["time"];

      currentTime =
        parseInt(currentTime.substring(0, 2) * 60) +
        parseInt(currentTime.substring(3));
      let rise = data["sun"]["rise"];

      rise = parseInt(rise.substring(0, 2) * 60) + parseInt(rise.substring(3));
      let set = data["sun"]["set"];

      set = parseInt(set.substring(0, 2) * 60) + parseInt(set.substring(3));

      let sunAngle;
      sunAngle = ((currentTime - rise) / (set - rise)) * 180 - 90;
      if (currentTime >= rise && currentTime <= set) {
        document.querySelector(
          "#item2 #section1 .bottom #suntimes .rise"
        ).innerText = data["sun"]["rise"];

        document.querySelector(
          "#item2 #section1 .bottom #suntimes .set"
        ).innerText = data["sun"]["set"];

      } else {
        document.querySelector(
          "#item2 #section1 .bottom #suntimes .rise"
        ).innerText = data["moon"]["rise"];

        document.querySelector(
          "#item2 #section1 .bottom #suntimes .set"
        ).innerText = data["moon"]["set"];

        document.querySelector(
          "#item2 #section1 .bottom #suntimes .riseicon"
        ).innerHTML = "&#127765;";

        document.querySelector(
          "#item2 #section1 .bottom #suntimes .seticon"
        ).innerHTML = "&#127761;";

        document.querySelector(
          "#item2 #section1 .top .sungraph .sunimgpos"
        ).style.filter = "invert(1)";

        document.querySelector("#item2 #section1 .top .sungraph .sunimg").src =
          "https://wetter-naarn.at/assets/img/dashboard/icons/forecast/8n.svg";

        sunAngle = sunAngle - 180;
      }
      CSS_ROOT.style.setProperty("--sunPosition", sunAngle + "deg");

      let date = data["date"]["date"];

      let weekdayText = date.split(",").shift();

      let weekday = weekdayStringToInt(weekdayText);

      for (i = 0; i < 5; i++) {
        document.querySelectorAll(
          "#item4 .accordion-header .infos .date .weekday"
        )[i].innerText = weekdayIntToString(weekday);
        weekday++;
        if (weekday == 7) {
          weekday = 0;
        }
      }
      date = date.split(" ");
      date.splice(0, 1);
      date = turnArray(date);
      date = date.join(" ");
      date = parseGermanDate(date);
      date.setDate(date.getDate() + 1);
      for (i = 1; i < 5; i++) {
        document.querySelectorAll(
          "#item4 .accordion-header .infos .date .monthday"
        )[i].innerText = date.getDate();
        date.setDate(date.getDate() + 1);
      }
    });

  //get forecast Data
  fetch(
    "https://wetter-naarn.at/assets/api/getForecast/index.php?cache=" + UUID
  )
    .then((response) => response.json())
    .then((data) => {
      data = data["forecast"];
      //Item1
      document.querySelector("#item1 .day").innerText =
        Math.round(
          (parseInt(data[1]["temp"]) + parseInt(data[2]["temp"])) / 2
        ) + "°C";
      document.querySelector("#item1 .night").innerText =
        Math.round(
          (parseInt(data[0]["temp"]) + parseInt(data[3]["temp"])) / 2
        ) + "°C";

      //Item3
      let daycycle;
      let daysymbol;
      for (i = 0; i <= 3; i++) {
        switch (i) {
          case 0:
            daycycle = "#night";
            daysymbol = "n";
            break;
          case 1:
            daycycle = "#morning";
            daysymbol = "d";
            break;
          case 2:
            daycycle = "#afternoon";
            daysymbol = "d";
            break;
          case 3:
            daycycle = "#evening";
            daysymbol = "n";
        }
        document.querySelector(
          "#item3 #valuetable " + daycycle + " > .temp"
        ).innerText = data[i]["temp"] + "°C";

        document.querySelector(
          "#item3 #valuetable " + daycycle + " > .wind"
        ).innerText = data[i]["windspeed"] + "km/h";

        document.querySelector(
          "#item3 #valuetable " + daycycle + " > .pop"
        ).innerText = data[i]["pop"] + "%";

        document.querySelector(
          "#item3 #valuetable " + daycycle + " > .icon > img"
        ).src =
          "https://wetter-naarn.at/assets/img/dashboard/icons/forecast/" +
          data[i]["icon"] +
          daysymbol +
          ".svg";
      }

      //Item4
      //Accordion-Header
      const TEMPMAX_ITEMS_HEAD = document.querySelectorAll(
        "#item4 .accordion-header .infos .temp .max"
      );

      const TEMPMIN_ITEMS_HEAD = document.querySelectorAll(
        "#item4 .accordion-header .infos .temp .min"
      );

      const CONDITON_ICONS_HEAD = document.querySelectorAll(
        "#item4 .accordion-header .infos .condition > img"
      );
      
      const CONDITION_TEXT_HEAD = document.querySelectorAll(
        "#item4 .accordion-header .infos .condition .conditionTxt"
      );

      const POP_ITEMS_HEAD = document.querySelectorAll(
        "#item4 .accordion-header .infos .rain .value"
      );

      let winddeg;
      const WIND_ICON_HEAD = document.querySelectorAll(
        "#item4 .accordion-header .infos .wind > img"
      );

      const WIND_DIRECTION_HEAD = document.querySelectorAll(
        "#item4 .accordion-header .infos .wind .value .dirTxt"
      );

      const WIND_SPEED_HEAD = document.querySelectorAll(
        "#item4 .accordion-header .infos .wind .value .speed"
      );
      
      let currentDataPosition = 4;
      for (i = 0; i < 5; i++) {
        TEMPMAX_ITEMS_HEAD[i].innerText =
          data[currentDataPosition]["tempmax"] + "°C";
        TEMPMIN_ITEMS_HEAD[i].innerText =
          data[currentDataPosition + 1]["tempmin"] + "°C";
        CONDITON_ICONS_HEAD[i].src =
          "https://wetter-naarn.at/assets/img/dashboard/icons/forecast/" +
          Math.round(
            (parseInt(data[currentDataPosition]["icon"]) +
              parseInt(data[currentDataPosition + 1]["icon"])) /
              2
          ) +
          "d.svg";
        CONDITION_TEXT_HEAD[i].innerText = convertConditionText(
          Math.round(
            (parseInt(data[currentDataPosition]["icon"]) +
              parseInt(data[currentDataPosition + 1]["icon"])) /
              2
          )
        );
        POP_ITEMS_HEAD[i].innerText =
          Math.round(
            (parseInt(data[currentDataPosition]["pop"]) +
              parseInt(data[currentDataPosition + 1]["pop"])) /
              2
          ) + "%";
        winddeg = Math.round(
          (parseInt(data[currentDataPosition]["winddeg"]) +
            parseInt(data[currentDataPosition + 1]["winddeg"])) /
            2
        );
        WIND_ICON_HEAD[i].style.transform = "rotate(" + winddeg + "deg)";
        winddeg = convertWindDirection(winddeg);
        WIND_DIRECTION_HEAD[i].innerText = winddeg;
        WIND_SPEED_HEAD[i].innerText =
          Math.round(
            (parseInt(data[currentDataPosition]["windspeed"]) +
              parseInt(data[currentDataPosition + 1]["windspeed"])) /
              2
          ) + "km/h";
        currentDataPosition = currentDataPosition + 2;
      }

      //Accordion-Body
      FORECAST_DAYCYCLE_ICONS = document.querySelectorAll(
        "#item4 .accordion-body .daycycleIcon"
      );
      const TEMPMAX_ITEMS_BODY = document.querySelectorAll(
        "#item4 .accordion-body .grid .temp .max"
      );
      const TEMPMIN_ITEMS_BODY = document.querySelectorAll(
        "#item4 .accordion-body .grid .temp .min"
      );
      const WINDDEG_ITEMS_BODY = document.querySelectorAll(
        "#item4 .accordion-body .grid .wind .deg"
      );
      const WINDSPEED_ITEMS_BODY = document.querySelectorAll(
        "#item4 .accordion-body .grid .wind .speed"
      );
      const POP_ITEMS_BODY = document.querySelectorAll(
        "#item4 .accordion-body .grid .rain > div:nth-child(2)"
      );
      const CLOUD_ITEMS_BODY = document.querySelectorAll(
        "#item4 .accordion-body .grid .clouds > div:nth-child(2)"
      );
      for (i = 4; i < 14; i++) {
        if ((i - 4) % 2 == 0) {
          FORECAST_DAYCYCLE_ICONS[i - 4].src =
            "https://wetter-naarn.at/assets/img/dashboard/icons/forecast/" +
            data[i]["icon"] +
            "d.svg";
        } else {
          FORECAST_DAYCYCLE_ICONS[i - 4].src =
            "https://wetter-naarn.at/assets/img/dashboard/icons/forecast/" +
            data[i]["icon"] +
            "n.svg";
        }
        TEMPMAX_ITEMS_BODY[i - 4].innerText = data[i]["tempmax"] + "°C";
        TEMPMIN_ITEMS_BODY[i - 4].innerText = data[i]["tempmin"] + "°C";
        winddeg = convertWindDirection(parseInt(data[i]["winddeg"]));
        WINDDEG_ITEMS_BODY[i - 4].innerText = winddeg;
        WINDSPEED_ITEMS_BODY[i - 4].innerText = data[i]["windspeed"] + "km/h";
        POP_ITEMS_BODY[i - 4].innerText = data[i]["pop"] + "%";
        CLOUD_ITEMS_BODY[i - 4].innerText = data[i]["clouds"] + "%";
      }

      suntimesWidth();
      forecastText();
      forecastItemsWidth();
    });

  fetch(
    "https://wetter-naarn.at/assets/api/getSunevents/index.php?cache=" + UUID
  )
    .then((response) => response.json())
    .then((data) => {
      for (i = 1; i <= 5; i++) {
        document.querySelector(
          "#item4 #accordion > div:nth-child(" +
            i +
            ") .grid.sun .sunrise > div:nth-child(2)"
        ).innerText = data[i]["sunrise"];
        document.querySelector(
          "#item4 #accordion > div:nth-child(" +
            i +
            ") .grid.sun .sunset > div:nth-child(2)"
        ).innerText = data[i]["sunset"];
      }
    });

  //Event Listeners
  window.addEventListener("resize", debounce(suntimesWidth, 500));
  window.addEventListener("resize", debounce(forecastText, 500));
  window.addEventListener("resize", debounce(forecastItemsWidth, 500));

  ACC_BTNS.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      ACC_CONTENTS.forEach((acc) => {
        if (
          e.target.nextElementSibling !== acc &&
          acc.classList.contains("active")
        ) {
          acc.classList.remove("active");
          ACC_BTNS.forEach((btn) => btn.classList.remove("active"));
        }
      });
      const PANEL = btn.nextElementSibling;
      PANEL.classList.toggle("active");
      btn.classList.toggle("active");
    });
  });

  window.onclick = (e) => {
    if (
      !e.target.matches(".accordion-header") &&
      !e.target.matches(".accordion-body *")
    ) {
      ACC_BTNS.forEach((btn) => btn.classList.remove("active"));
      ACC_CONTENTS.forEach((acc) => acc.classList.remove("active"));
    }
  };
}

function suntimesWidth() {
  const ELEMENT = document.querySelector(
    "#item2 #section1 .feelslike-sunlocation .bottom #suntimes"
  );
  let width = ELEMENT.clientWidth;
  document.querySelector(
    "#item2 #section1 .feelslike-sunlocation .top .sungraph"
  ).style.width = width + "px";
}

function forecastText() {
  let width = window.screen.width;
  if (width <= 600) {
    MORNING_ELEMENT.innerHTML = "Vorm.";
    AFTERNOON_ELEMENT.innerHTML = "Nachm.";
  } else {
    MORNING_ELEMENT.innerHTML = "Vormittag";
    AFTERNOON_ELEMENT.innerHTML = "Nachmittag";
  }
}

function forecastItemsWidth() {
  const itemVars = [
    "--forecastItemsWidthDate",
    "--forecastItemsWidthTemp",
    "--forecastItemsWidthCondition",
    "--forecastItemsWidthRain",
    "--forecastItemsWidthWind",
  ];

  itemVars.forEach((itemVar) => {
    CSS_ROOT.style.setProperty(itemVar, "fit-content");
  });
  let itemWidths = [0, 0, 0, 0, 0];

  for (i = 0; i < ITEMS.length; i++) {
    if (ITEMS[i].clientWidth > itemWidths[i % 5]) {
      itemWidths[i % 5] = ITEMS[i].clientWidth;
    }
  }

  itemVars.forEach((itemVar, index) => {
    CSS_ROOT.style.setProperty(itemVar, itemWidths[index] + "px");
  });

  return itemWidths.reduce((a, b) => a + b, 0);
}

function debounce(func, time) {
  let currentWindowWidth = window.innerWidth;
  time = time || 100;
  let timer;
  let timer2;
  return function (event) {
    if (timer) {
      clearTimeout(timer);
      clearTimeout(timer2);
    }

    if (Math.abs(currentWindowWidth - window.innerWidth) > 10) {
      timer = setTimeout(func, time, event);
    }
    timer2 = setTimeout(function () {
      currentWindowWidth = window.innerWidth;
    }, time);
  };
}

function convertWindDirection(winddeg) {
  if (winddeg >= 337.5 || winddeg < 22.5) {
    return "N";
  }
  if (winddeg < 67.5) {
    return "NO";
  }
  if (winddeg < 112.5) {
    return "O";
  }
  if (winddeg < 157.5) {
    return "SO";
  }
  if (winddeg < 202.5) {
    return "S";
  }
  if (winddeg < 247.5) {
    return "SW";
  }
  if (winddeg < 292.5) {
    return "W";
  }
  if (winddeg < 337.5) {
    return "NW";
  }
  return "N/A";
}

function convertConditionText(icon) {
  switch (icon) {
    case 8:
      return "wolkenlos";
    case 7:
      return "teils bewölkt";
    case 6:
      return "bewölkt";
    case 5:
      return "stark bewölkt";
    case 4:
      return "Regenschauer";
    case 3:
      return "Regen";
    case 2:
      return "Schneeschauer";
    case 1:
      return "Schneefall";
    case 0:
      return "Gewitter";
  }
}

function parseGermanDate(dateString) {
  const dateParts = dateString.split(" ");
  dateParts[0] = dateParts[0].replace(".", "");
  const monthNames = [
    "Jänner",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const month = monthNames.indexOf(dateParts[1]);
  const day = parseInt(dateParts[0]);
  const year = parseInt(dateParts[2]);
  return new Date(year, month, day);
}

function weekdayStringToInt(weekday) {
  switch (weekday) {
    case "Montag":
      return 0;
    case "Dienstag":
      return 1;
    case "Mittwoch":
      return 2;
    case "Donnerstag":
      return 3;
    case "Freitag":
      return 4;
    case "Samstag":
      return 5;
    case "Sonntag":
      return 6;
  }
}

function weekdayIntToString(weekday) {
  switch (weekday) {
    case 0:
      return "Mo.";
    case 1:
      return "Di.";
    case 2:
      return "Mi.";
    case 3:
      return "Do.";
    case 4:
      return "Fr.";
    case 5:
      return "Sa.";
    case 6:
      return "So.";
  }
}

function turnArray(arrIn) {
  let arrOut = new Array();
  arrOut[0] = arrIn[1];
  arrOut[1] = arrIn[0];
  arrOut[2] = arrIn[2];
  return arrIn;
}

function generateUUID() {
  let d = new Date().getTime(),
    d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
}

init();