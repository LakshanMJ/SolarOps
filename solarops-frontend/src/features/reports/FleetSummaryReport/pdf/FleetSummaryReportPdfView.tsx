// FleetReportPage.tsx
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FleetSummaryReportPdfLayout } from "./FleetSummaryReportPdfLayout";

export default function FleetSummaryReportPdfView() {
  const reportRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  const filters = {
    fromDate: searchParams.get("fromDate"),
    toDate: searchParams.get("toDate"),
  };

  const hasGenerated = useRef(false);

  useEffect(() => {
    if (hasGenerated.current) return;
    hasGenerated.current = true;

    const generatePDF = async () => {
      if (!reportRef.current) return;

      // Wait for Recharts animations to finish (crucial for file size)
      await new Promise((r) => setTimeout(r, 1000));

      const fullCanvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      // Create a NEW canvas with exact A4 size
      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = 794;
      croppedCanvas.height = 1123;

      const ctx = croppedCanvas.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas context not available");
      }

      // Copy ONLY the top 1123px from original
      ctx.drawImage(fullCanvas, 0, 0, 794, 1123, 0, 0, 794, 1123);

      // Use this instead
      const imgData = croppedCanvas.toDataURL("image/jpeg", 0.75);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true // Internal PDF compression
      });

      // Force the image to fit 210mm x 297mm exactly. 
      // No loops, no "heightLeft" logic. Just one page.
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 296.5);

      pdf.save("fleet-report.pdf");
    };

    generatePDF();
  }, [filters]);

  return (
    /* We use a wrapper with a fixed aspect ratio to ensure html2canvas 
       sees exactly what should be on one page */
    <div
      style={{
        width: '794px',
        height: '1123px',
        overflow: 'hidden',
        margin: '0 auto',
        background: '#fff'
      }}
    >
      <div ref={reportRef} >
        <FleetSummaryReportPdfLayout filters={filters} />
      </div>
    </div>
  );
}