export function getWeekdayLv(date: Date): string {
  const days = [
    "Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena",
    "Ceturtdiena", "Piektdiena", "Sestdiena",
  ];
  return days[date.getDay()];
}

export function getMonthLv(date: Date): string {
  const months = [
    "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs",
    "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris",
  ];
  return months[date.getMonth()];
}