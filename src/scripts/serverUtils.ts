export function formatDate(unix: number): string {
  const now = new Date();
  const date = new Date(unix * 1000);
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