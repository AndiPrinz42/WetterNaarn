export {
  getMoonIcon,
  getMoonName,
  getMoonIndex,
  getHumidityText,
  getBarometerText,
  getBarometerIcon,
  getWindText,
};

function getMoonIcon(index: number): string {
  if (index < 0 || index > 7) {
    throw new Error("moonindex must be between 0 and 7");
  }

  const moonicons: string[] = [
    "/assets/icons/meteocons/static/moon/moon-new.svg",
    "/assets/icons/meteocons/static/moon/moon-waxing-crescent.svg",
    "/assets/icons/meteocons/static/moon/moon-first-quarter.svg",
    "/assets/icons/meteocons/static/moon/moon-waxing-gibbous.svg",
    "/assets/icons/meteocons/static/moon/moon-full.svg",
    "/assets/icons/meteocons/static/moon/moon-waning-gibbous.svg",
    "/assets/icons/meteocons/static/moon/moon-last-quarter.svg",
    "/assets/icons/meteocons/static/moon/moon-waning-crescent.svg",
  ];

  return moonicons[index];
}

function getMoonName(index: number): string {
  if (index < 0 || index > 7) {
    throw new Error("moonindex must be between 0 and 7");
  }

  const phasenames: string[] = [
    "Neumond",
    "zunehmend",
    "zunehmender Halbmond",
    "zunehmend",
    "Vollmond",
    "abnehmend",
    "abnehmender Halbmond",
    "abnehmend",
  ];

  return phasenames[index];
}

function getMoonIndex(moonpercent: number): number {
  if (moonpercent <= 3 || moonpercent >= 97) {
    return 0;
  } else if (moonpercent > 3 && moonpercent < 25) {
    return 1;
  } else if (moonpercent === 25) {
    return 2;
  } else if (moonpercent > 25 && moonpercent < 47) {
    return 3;
  } else if (moonpercent >= 47 && moonpercent <= 53) {
    return 4;
  } else if (moonpercent > 53 && moonpercent < 75) {
    return 5;
  } else if (moonpercent === 75) {
    return 6;
  } else if (moonpercent > 75 && moonpercent < 97) {
    return 7;
  } else {
    throw new Error("Moonpercent out of range: " + moonpercent);
  }
}

function getHumidityText(humidity: number): string {
  if (humidity < 20) {
    return "trocken";
  } else if (humidity < 40) {
    return "niedrig";
  } else if (humidity < 60) {
    return "normal";
  } else if (humidity < 80) {
    return "hoch";
  }
  return "sehr hoch";
}

function getBarometerText(barometer: number): string {
  if (barometer < 1010) {
    return "niedrig";
  }
  if (barometer < 1020) {
    return "normal";
  }
  return "hoch";
}

function getBarometerIcon(barometer: number): string {
  if (barometer < 1010) {
    return "/assets/icons/meteocons/static/sensors/barometer/barometer-min.svg";
  }
  if (barometer < 1020) {
    return "/assets/icons/meteocons/static/sensors/barometer/barometer.svg";
  }
  return "/assets/icons/meteocons/static/sensors/barometer/barometer-max.svg";
}

function getWindText(windspeed: number): string {
  if (windspeed == 0) {
    return "Windstille";
  } else if (windspeed < 5) {
    return "Leichter Zug";
  } else if (windspeed < 11) {
    return "Leichte Brise";
  } else if (windspeed < 19) {
    return "Schwache Brise";
  } else if (windspeed < 28) {
    return "Mäßige Brise";
  } else if (windspeed < 38) {
    return "Frische Brise";
  } else if (windspeed < 49) {
    return "Starker Wind";
  } else if (windspeed < 61) {
    return "Steifer Wind";
  } else if (windspeed < 74) {
    return "Stürmischer Wind";
  } else if (windspeed < 88) {
    return "Sturm";
  } else if (windspeed < 102) {
    return "Schwerer Sturm";
  } else if (windspeed < 117) {
    return "Orkanartiger Sturm";
  }
  return "Orkan";
}

