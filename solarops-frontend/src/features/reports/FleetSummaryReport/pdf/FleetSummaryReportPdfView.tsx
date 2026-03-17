// FleetReportPage.tsx
import { useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom"; // if using react-router
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FleetSummaryReportPdfLayout } from "./FleetSummaryReportPdfLayout";

export default function FleetSummaryReportPdfView() {
  const reportRef = useRef<HTMLDivElement>(null);
  // const location = useLocation();
  const [searchParams] = useSearchParams();
   // Get filters from query params
  const filters = {
    fromDate: searchParams.get("fromDate"),
    toDate: searchParams.get("toDate"),
  };
  
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (hasGenerated.current) return;
    hasGenerated.current = true;

    const generatePDF = async () => {
      await new Promise((r) => setTimeout(r, 500));

      const canvas = await html2canvas(reportRef.current!, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("fleet-performance-report.pdf");
    };

    generatePDF();
  }, [filters]);

  return (
    <div ref={reportRef}>
      <FleetSummaryReportPdfLayout filters={filters} />
    </div>
  );
}