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
