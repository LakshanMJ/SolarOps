import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import { reportFetchMap } from "./reportFetchMap";
import { reportRenderMap } from "./reportRenderMap";

const A4_WIDTH_PX = 210 * 4;   // ~840px
const A4_HEIGHT_PX = 297 * 4;  // ~1188px

const handleExportPdf = async (
    reportType: any,
    filters: any,
    reportRef: any
) => {
    const { fromDate, toDate } = filters;

    if (!fromDate || !toDate) {
        alert("Please select both From and To dates before exporting.");
        return;
    }

    try {
        // ✅ 1. Fetch filtered data
        const fetchFn = reportFetchMap[reportType as keyof typeof reportFetchMap];
        const data = await fetchFn(filters);

        if (!data || (Array.isArray(data) && data.length === 0)) {
            alert("No data available for selected filters");
            return;
        }

        // ✅ 2. Create hidden container
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "-9999px";
        container.style.left = "-9999px";
        container.style.width = `${A4_WIDTH_PX}px`;
        container.style.minHeight = `${A4_HEIGHT_PX}px`;
        container.style.padding = "20px"; // optional padding
        container.style.boxSizing = "border-box"; // ensures padding doesn't shrink content
        container.style.background = "white"; // important for PDF
        document.body.appendChild(container);

        // ✅ 3. Render correct report
        const root = createRoot(container);
        const ReportComponent = reportRenderMap[reportType as keyof typeof reportRenderMap];
        root.render(ReportComponent(data));

        // wait for render
        await new Promise((res) => setTimeout(res, 500));

        // ✅ 4. Capture
        const canvas = await html2canvas(container, { scale: 4 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        const fileName = `${reportType}_${fromDate.format("YYYY-MM-DD")}_to_${toDate.format("YYYY-MM-DD")}.pdf`;

        pdf.setProperties({ title: fileName });

        const blob = pdf.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");

        setTimeout(() => {
            URL.revokeObjectURL(url);
            root.unmount();
            document.body.removeChild(container);
        }, 10000);

    } catch (err: any) {
        console.error(err);
        alert(err.message || "Export failed");
    }
};

export default handleExportPdf;