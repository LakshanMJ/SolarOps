import { BACKEND_URLS } from "@/backendUrls";
import { getTimestampedFilename } from "./getTimestampedFilename";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

type ReportType = "alerts" | "fleet-summary" | "site-performance";
type ExportFormat = "csv" | "pdf";

export const exportReportFile = (
    reportType: ReportType,
    format: ExportFormat,
    filters: Record<string, any> = {}
) => {
    try {
        const params = new URLSearchParams(
            Object.entries(filters).reduce((acc, [key, val]) => {
                if (val === undefined || val === null || val === "") return acc;
                if (key === "fromDate" || key === "toDate") {
                    let d = val;

                    // Convert Dayjs / Date / string to Dayjs
                    if (val.$d) d = dayjs(val.$d);
                    else if (!(val instanceof dayjs)) d = dayjs(val);

                    // CHANGE HERE: Use .utc(true) to lock the date numbers
                    if (key === "fromDate") {
                        acc[key] = d.utc(true).startOf("day").toISOString();
                    } else {
                        acc[key] = d.utc(true).endOf("day").toISOString();
                    }
                }

                // Other filters just to string
                else {
                    acc[key] = val.toString();
                }

                return acc;
            }, {} as Record<string, string>)
        ).toString();

        const url = `${BACKEND_URLS.REPORTS_BASE}/${reportType}/export?format=${format}&${params}`;

        fetch(url)
            .then(async (res) => {
                if (!res.ok) {
                    // Try to read JSON error message
                    const errData = await res.json().catch(() => null);
                    const msg = errData?.error || "Failed to download file";
                    throw new Error(msg);
                }
                return res.blob();
            })
            .then((blob) => {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = getTimestampedFilename(`${reportType}_report`, format);
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
            .catch((err) => {
                console.error("Export error:", err);
                alert(err.message); // ✅ Show the backend message, e.g., "No data available for the selected dates"
            });
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
};