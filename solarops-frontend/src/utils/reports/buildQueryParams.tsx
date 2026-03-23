import { Dayjs } from "dayjs";

type Filters = {
  fromDate?: Dayjs | null;
  toDate?: Dayjs | null;
  [key: string]: any;
};

const isDayjs = (value: unknown): value is Dayjs => {
  return typeof value === "object" && value !== null && "format" in value;
};

/**
 * Converts filter object to query string
 * - fromDate → start of day UTC
 * - toDate → end of day UTC
 * - other fields → string
 */
const buildQueryParams = (filters: Filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    if (key === "fromDate" && isDayjs(value)) {
      // start of day UTC
      params.append(key, value.startOf("day").toISOString());
    } else if (key === "toDate" && isDayjs(value)) {
      // end of day UTC
      params.append(key, value.endOf("day").toISOString());
    } else {
      params.append(key, String(value));
    }
  });

  return params.toString();
};

export default buildQueryParams;