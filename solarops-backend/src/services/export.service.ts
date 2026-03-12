// services/exportService.ts
import { parse } from "json2csv";

// Example: your DB query function
async function getAlertsFromDB(filters: any) {
  // TODO: Replace with your actual DB query
  // e.g., SELECT * FROM alerts WHERE status = filters.status ...
  return [
    { date: "2026-03-12", status: "open", site: "Site 1", severity: "Warning" },
    { date: "2026-03-12", status: "resolved", site: "Site 2", severity: "Critical" },
  ];
}

export const generateCsv = async (filters: any) => {
  const data = await getAlertsFromDB(filters);

  // Convert JSON to CSV
  const csv = parse(data, { fields: ["date", "status", "site", "severity"] });
  return csv;
};