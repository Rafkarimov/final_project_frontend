import moment from "moment/moment";

export function formatDate(value: Date) {
  if (value) {
    return moment(String(value)).format("DD.MM.YYYY");
  }
}

export function formatDateTime(value: Date) {
  if (value) {
    return moment(String(value)).format("DD.MM.YYYY HH:mm:ss");
  }
}

export function getMaxDate() {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today;
}

export function getMinDate() {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 120);
  return today;
}
