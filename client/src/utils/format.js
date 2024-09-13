import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "../constants/common";

export const formatDateByDayJS = (
    dateTime,
    format = DEFAULT_DATE_FORMAT
  ) => {     
    return dayjs(dateTime).format(format); 
  }