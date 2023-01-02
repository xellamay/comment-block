import {format, parse} from "date-fns";
import { ru } from "date-fns/locale";

const FORMAT_DATETIME_SERVER = "yyyy-MM-dd'T'HH:mm";
const FORMAT_DATETIME_HUMAN = "d MMMM HH:mm";

export function getDateTimeNow() {
  const dataTime = format(new Date(), FORMAT_DATETIME_SERVER);
  return dataTime;
}

export function formatDateTimeToHuman(date) {
  const parseDateTime = parse(date, FORMAT_DATETIME_SERVER, new Date());
  const formatDateTime = format(parseDateTime, FORMAT_DATETIME_HUMAN, { locale: ru });
  return formatDateTime;
}