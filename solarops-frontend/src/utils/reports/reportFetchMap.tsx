import { BACKEND_URLS } from "@/backendUrls";
import { fetchData } from "../fetch";
import buildQueryParams from "./buildQueryParams";

export const reportFetchMap: Record<
  ReportType,
  (filters: any) => Promise<any>
> = {
  "alerts": async (filters) => {
    const params = buildQueryParams(filters);
    return await fetchData(`${BACKEND_URLS.REPORTS_BASE}/alerts?${params}`);
  },

  "fleet-summary": async (filters) => {
    const params = buildQueryParams(filters);
    return await fetchData(`${BACKEND_URLS.REPORTS_BASE}/fleet-summary?${params}`);
  },

  "site-performance": async (filters) => {
    const params = buildQueryParams(filters);
    return await fetchData(`${BACKEND_URLS.REPORTS_BASE}/site-performance?${params}`);
  },
};