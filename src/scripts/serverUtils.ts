export function formatDate(unix: number): string {
  const now = new Date();
  const date = new Date(unix);
  let formattedDate = '';

  if (date.toDateString() === now.toDateString()) {
    formattedDate = "Heute " + date.toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit'});
  } else if (date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString()) {
    formattedDate = "Gestern " + date.toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit'});
  } else {
    formattedDate = date.toLocaleString('de-DE', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}).replace('.,', '');
  }
  return formattedDate;
}

export function formatTime(unix: number): string {
  const date = new Date(unix);
  return date.toLocaleString('de-DE', {hour: '2-digit', minute: '2-digit'});
}

export function convertIcon(icon: string, sunIsUp: boolean): string {
  if (icon.length === 1) {
    icon = "0" + icon;
  }
  return icon + (sunIsUp ? "d" : "n");
}

export function getUTCTimestampByOffset (hours: number, minutes: number, days = 0): number {
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
  // date from day
  const now = new Date();
  now.setDate(now.getDate() + dayoffset);
  return weekdays[now.getDay()];
}

export function formatMonthDate(unix: number): string {
  const date = new Date(unix * 1000);
  const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  return `${date.getDate()}. ${months[date.getMonth()]}`;
}

export function flattenIcons(icons: string[]): number {
  if (icons.length === 0) {
    return 0;
  }
  let sum = 0;
  let snow = false;
  let mist = false;
  for (const icon of icons) {
    if (icon.includes('01')) {
      // clear sky
      sum += 6;
    } else if (icon.includes('02')) {
      // few clouds
      sum += 5;
    } else if (icon.includes('03')) {
      // scattered clouds
      sum += 4;
    } else if (icon.includes('04')) {
      // broken clouds
      sum += 3;
    } else if (icon.includes('09')) {
      // shower rain
      sum += 2;
    } else if (icon.includes('10')) {
      // rain
      sum += 1;
    } else if (icon.includes('11')) {
      // thunderstorm
      sum += 0;
    } else if (icon.includes('13')) {
      // snow
      sum += 1;
      snow = true;
    } else if (icon.includes('50')) {
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
  const icons: string[] = [
    "Gewitter",
    "Schneefall",
    "Schneeschauer",
    "Nebel",
    "Regen",
    "Regenschauer",
    "stark bewölkt",
    "bewölkt",
    "wechselnd bewölkt",
    "wolkenlos"
  ];

  return icons[iconnumber];
}