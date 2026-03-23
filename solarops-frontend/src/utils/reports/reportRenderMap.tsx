import { FleetSummaryReportPdfLayout } from "@/features/reports/FleetSummaryReport/FleetSummaryReportPdfLayout";
import { AlertsReportPdfLayout } from "@/features/reports/AlertsReport/AlertsReportPdfLayout";
import { SitePerformanceReportPdfLayout } from "@/features/reports/SitePerformanceReport/SitePerformanceReportPdfLayout";
import type { JSX } from "react";

type ReportType = "alerts" | "fleet-summary" | "site-performance";

export const reportRenderMap: Record<
  ReportType,
  (data: any,isFirstPage:any) => JSX.Element
> = {
  "fleet-summary": (data) => <FleetSummaryReportPdfLayout data={data} />,
  alerts: (data, isFirstPage) => <AlertsReportPdfLayout data={data} isFirstPage={isFirstPage} />,
  "site-performance": (data) => <SitePerformanceReportPdfLayout data={data} />,
};