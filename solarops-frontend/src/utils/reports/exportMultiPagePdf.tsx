import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { createRoot } from "react-dom/client";
import { reportFetchMap } from "./reportFetchMap";
import { reportRenderMap } from "./reportRenderMap";

/**
 * Enhanced Multi-page PDF Export that avoids splitting rows
 * across page boundaries.
 */
export const exportMultiPagePdf = async (
    reportType: string,
    filters: any
) => {
    const container = document.createElement("div");
    try {
        const fetchFn = reportFetchMap[reportType as keyof typeof reportFetchMap];
        const allData = await fetchFn(filters);

        Object.assign(container.style, {
            position: "absolute",
            left: "-9999px",
            width: "794px",
            backgroundColor: "white",
        });
        document.body.appendChild(container);

        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const root = createRoot(container);
        const ReportComponent = reportRenderMap[reportType as keyof typeof reportRenderMap];

        // LOGIC: Page 1 gets fewer rows because it has the Header. 
        // Subsequent pages get more rows because they are just table.
        const rowsFirstPage = 12; 
        const rowsOtherPages = 22; 
        
        let currentIndex = 0;
        let pageNumber = 0;

        while (currentIndex < allData.length) {
            const isFirstPage = pageNumber === 0;
            const limit = isFirstPage ? rowsFirstPage : rowsOtherPages;
            
            const chunk = allData.slice(currentIndex, currentIndex + limit);

            // Pass the isFirstPage flag to the component
            root.render(ReportComponent(chunk, isFirstPage));

            await new Promise((res) => setTimeout(res, 600));

            const canvas = await html2canvas(container, {
                scale: 2,
                useCORS: true,
                width: 794,
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.95);
            const imgHeightMm = (canvas.height * pageWidth) / canvas.width;

            if (pageNumber > 0) pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeightMm);

            currentIndex += limit;
            pageNumber++;
        }

        pdf.save(`${reportType}_report.pdf`);
        root.unmount();
        document.body.removeChild(container);

    } catch (err) {
        console.error(err);
        alert("Export failed.");
    }
};