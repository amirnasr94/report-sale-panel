export function dateFormatter(date: Date) {
  if (!(date instanceof Date)) return "تاریخ معتبر نمیباشد!";
  return new Intl.DateTimeFormat("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(date);
}
