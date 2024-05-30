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