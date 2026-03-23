import React from "react";

/* Mock Data */
const alerts = [
  {
    id: 1,
    severity: "Critical",
    message: "Inverter status worsened from Online to Offline",
    inverter: "Inverter Y",
    site: "siteeeeeeee",
    createdAt: "03/20/2026, 8:20",
    status: "Open",
  },
  {
    id: 2,
    severity: "Warning",
    message: "Status changed from Online to Degraded",
    inverter: "Inverter Y",
    site: "siteeeeeeee",
    createdAt: "03/20/2026, 8:20",
    status: "Open",
  },
  {
    id: 3,
    severity: "Warning",
    message: "Temperature exceeded 75°C",
    inverter: "Newwww",
    site: "222",
    createdAt: "03/20/2026, 8:00",
    status: "Resolved",
  },
  {
    id: 4,
    severity: "Warning",
    message: "Temperature exceeded 75°C",
    inverter: "inv 999",
    site: "siteeeeeeee",
    createdAt: "03/20/2026, 7:50",
    status: "Resolved",
  },
  {
    id: 5,
    severity: "Critical",
    message: "Inverter status worsened from Critical to Failed",
    inverter: "inv 777",
    site: "siteeeeeeee",
    createdAt: "03/20/2026, 7:50",
    status: "Open",
  },
];

export function AlertsReportPdfLayout({ data, isFirstPage }: any) {
  console.log(JSON.stringify(data))
  const total = alerts.length;
  const critical = alerts.filter(a => a.severity === "Critical").length;
  const open = alerts.filter(a => a.status === "Open").length;
  const resolved = alerts.filter(a => a.status === "Resolved").length;

  return (
    <div
      style={{
        width: "794px",
        height: "1123px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      {isFirstPage && (
        <div style={{ padding: "20px 30px", backgroundColor: "#1d4ed8", color: "#fff" }}>
          <h1 style={{ margin: 0, fontSize: "22px" }}>Solar Alert Report</h1>
          <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
            System alerts & maintenance notifications
          </p>
        </div>
      )}


      {/* Content */}
      <div style={{ padding: "25px", flex: 1 }}>
        {/* Stats */}
        {isFirstPage && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "15px",
            marginBottom: "20px"
          }}>
            <StatCard label="Total Alerts" value={total} />
            <StatCard label="Critical" value={critical} color="#fee2e2" text="#dc2626" />
            <StatCard label="Open" value={open} color="#fef3c7" text="#d97706" />
            <StatCard label="Resolved" value={resolved} color="#dcfce7" text="#16a34a" />
          </div>
        )}


        {/* Table */}
        <div style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr 1fr 1.5fr 1fr",
            backgroundColor: "#1f2937",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "600",
            padding: "10px"
          }}>
            <span>Severity</span>
            <span>Message</span>
            <span>Inverter</span>
            <span>Site</span>
            <span>Created</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          {data.map((alert, i) => (
            <div
              key={alert.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 1fr 1fr 1.5fr 1fr",
                padding: "10px",
                fontSize: "11px",
                backgroundColor: i % 2 === 0 ? "#f9fafb" : "#ffffff",
                borderBottom: "1px solid #eee"
              }}
            >
              <SeverityBadge severity={alert.severity} />
              <span>{alert.message}</span>
              <span>{alert.inverter}</span>
              <span>{alert.site}</span>
              <span>{alert.createdAt}</span>
              <StatusBadge status={alert.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "12px",
        textAlign: "center",
        borderTop: "1px solid #eee",
        fontSize: "10px",
        color: "#9ca3af"
      }}>
        Generated • Confidential
      </div>
    </div>
  );
}

/* Components */

function StatCard({ label, value, color = "#f3f4f6", text = "#111827" }) {
  return (
    <div style={{
      padding: "15px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px"
    }}>
      <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>{label}</p>
      <p style={{ fontSize: "20px", fontWeight: "bold", margin: 0, color: text }}>
        {value}
      </p>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const isCritical = severity === "Critical";

  return (
    <span style={{
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "10px",
      color: "#fff",
      backgroundColor: isCritical ? "#dc2626" : "#d97706",
      textAlign: "center",
      width: "fit-content"
    }}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const isOpen = status === "Open";

  return (
    <span style={{
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "10px",
      color: "#fff",
      backgroundColor: isOpen ? "#dc2626" : "#16a34a",
      textAlign: "center",
      width: "fit-content"
    }}>
      {status}
    </span>
  );
}