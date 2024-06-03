export function formatDateTime(date: Date): string {
  const now = new Date();
  let formattedDate = "";

  if (date.toDateString() === now.toDateString()) {
    formattedDate = "Heute " + date.toLocaleString("de-DE", { hour: "2-digit", minute: "2-digit" });
  } else if (date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) {
    formattedDate = "Gestern " + date.toLocaleString("de-DE", { hour: "2-digit", minute: "2-digit" });
  } else {
    formattedDate = date.toLocaleString("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).replace(".,", "");
  }
  return formattedDate;
}

export function formatDate(date: Date) {
  return date.toLocaleString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatTime(date: Date): string {
  return date.toLocaleString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

export function calcDayDiff(date1: Date, date2: Date): number {
  const diff = date1.getTime() - date2.getTime();
  return Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function futureDatestring(daysuntil: number): string {
  if (daysuntil === 0) {
    return "Heute";
  } else if (daysuntil === 1) {
    return "Morgen";
  } else {
    return `in ${daysuntil} Tagen`;
  }
}

export function convertIcon(icon: string, sunIsUp: boolean): string {
  if (icon.length === 1) {
    icon = "0" + icon;
  }
  return icon + (sunIsUp ? "d" : "n");
}

export function getUTCTimestampByOffset(hours: number, minutes: number, days = 0): number {
  const now = new Date();
  now.setUTCHours(hours, minutes, 0, 0);
  now.setUTCDate(now.getUTCDate() + days);
  return Math.round(now.getTime() / 1000);
}

export function getDayName(dayoffset: number): string {
  if (dayoffset === 0) {
    return "Heute";
  }
  if (dayoffset === 1) {
    return "Morgen";
  }
  const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const now = new Date();
  now.setDate(now.getDate() + dayoffset);
  return weekdays[now.getDay()];
}

export function formatMonthDate(date: Date): string {
  const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  return `${date.toLocaleString("de-DE", { day: "2-digit" })}. ${months[date.getMonth()]}`;
}

export function flattenIcons(icons: string[]): number {
  if (icons.length === 0) {
    return 0;
  }
  let sum = 0;
  let snow = false;
  let mist = false;
  for (const icon of icons) {
    if (icon.includes("01")) {
      // clear sky
      sum += 6;
    } else if (icon.includes("02")) {
      // few clouds
      sum += 5;
    } else if (icon.includes("03")) {
      // scattered clouds
      sum += 4;
    } else if (icon.includes("04")) {
      // broken clouds
      sum += 3;
    } else if (icon.includes("09")) {
      // shower rain
      sum += 2;
    } else if (icon.includes("10")) {
      // rain
      sum += 1;
    } else if (icon.includes("11")) {
      // thunderstorm
      sum += 0;
    } else if (icon.includes("13")) {
      // snow
      sum += 1;
      snow = true;
    } else if (icon.includes("50")) {
      // mist
      sum += 3;
      mist = true;
    }
  }

  // 0 -> Thunderstorm
  // 1 -> Snow
  // 2 -> Snowshowers
  // 3 -> Mist
  // 4 -> Rain
  // 5 -> Shower Rain
  // 6 -> Broken Clouds
  // 7 -> Scattered Clouds
  // 8 -> Few Clouds
  // 9 -> Clear Sky

  // divide by the number of icons
  sum /= icons.length;
  sum = Math.round(sum);

  if (sum !== 0) {
    sum += 3;
  }

  // if rain or shower rain and snow, subtract three again
  if ((sum - 3 === 1 || sum - 3 === 2) && snow) {
    sum -= 3;
  }

  // if mist and broken clouds, subtract three again
  if (mist && sum - 3 === 3) {
    sum = 3;
  }

  return sum;
}

export function getForecastIcon(iconnumber: number, sunIsUp: boolean): string {
  let returnicon = "";
  if (iconnumber < 10) {
    returnicon += "0";
  }
  returnicon += iconnumber;
  if (sunIsUp) {
    returnicon += "d";
  } else {
    returnicon += "n";
  }
  return returnicon;
}

export function getForecastCondition(iconnumber: number): string {
  const icons: string[] = ["Gewitter", "Schneefall", "Schneeschauer", "Nebel", "Regen", "Regenschauer", "stark bewölkt", "bewölkt", "wechselnd bewölkt", "wolkenlos"];

  return icons[iconnumber];
}

export function getMoonIcon(index: number): string {
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

export function getMoonName(index: number): string {
  if (index < 0 || index > 7) {
    throw new Error("moonindex must be between 0 and 7");
  }

  const phasenames: string[] = ["Neumond", "zunehmend", "zunehmender Halbmond", "zunehmend", "Vollmond", "abnehmend", "abnehmender Halbmond", "abnehmend"];

  return phasenames[index];
}

export function getMoonIndex(moonpercent: number): number {
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

export function getHumidityText(humidity: number): string {
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

export function getBarometerText(value: number): string {
  if (value < 1000) {
    return "sehr niedrig";
  } else if (value >= 1000 && value < 1011) {
    return "niedrig";
  } else if (value >= 1011 && value <= 1025) {
    return "normal";
  } else if (value > 1025 && value <= 1036) {
    return "hoch";
  } else {
    return "sehr hoch";
  }
}

export function getBarometerRotation(value: number): number {
  const min = 993;
  const max = 1043;
  const maxAngle = 110;
  const minAngle = -110;
  if (value <= min) {
    return minAngle;
  }
  if (value >= max) {
    return maxAngle;
  }
  const ratio = (value - min) / (max - min);
  return ratio * (maxAngle - minAngle) + minAngle;
}

export function getWindText(windspeed: number): string {
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

export function round(value: number, precision: number = 0): number {
  return Number(Number(value).toFixed(precision));
}