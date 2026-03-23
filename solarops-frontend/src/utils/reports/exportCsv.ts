import { BACKEND_URLS } from "@/backendUrls";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getTimestampedFilename } from "../getTimestampedFilename";

dayjs.extend(utc);

type ReportType = "alerts" | "fleet-summary" | "site-performance";

export const exportReportFile = (
    reportType: ReportType,
    filters: Record<string, any> = {}
) => {
    // alert('in')
    try {
        const params = new URLSearchParams(
            Object.entries(filters).reduce((acc, [key, val]) => {
                if (val === undefined || val === null || val === "") return acc;

                if (key === "fromDate" || key === "toDate") {
                    let d = val;

                    if (val.$d) d = dayjs(val.$d);
                    else if (!dayjs.isDayjs(val)) d = dayjs(val);

                    if (key === "fromDate") {
                        acc[key] = d.utc(true).startOf("day").toISOString();
                    } else {
                        acc[key] = d.utc(true).endOf("day").toISOString();
                    }
                } else {
                    acc[key] = val.toString();
                }

                return acc;
            }, {} as Record<string, string>)
        ).toString();

        // ✅ Hardcoded format=csv
        // const url = `${BACKEND_URLS.REPORTS_BASE}/${reportType}/export?format=csv&${params}`;
        const url = `${BACKEND_URLS.REPORTS_BASE}/${reportType}/export${params ? `?${params}` : ""}`;

        fetch(url)
            .then(async (res) => {
                if (!res.ok) {
                    const errData = await res.json().catch(() => null);
                    const msg = errData?.error || "Failed to download file";
                    throw new Error(msg);
                }
                return res.blob();
            })
            .then((blob) => {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = getTimestampedFilename(`${reportType}_report`, "csv"); // ✅ always csv
                link.click();
                window.URL.revokeObjectURL(link.href);
            })
            .catch((err) => {
                console.error("Export error:", err);
                alert(err.message);
            });
    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
};