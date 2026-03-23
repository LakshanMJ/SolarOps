// backendUrls.ts
export const BACKEND_URLS = {
  DASHBOARD: 'http://localhost:4000/api/dashboard',
  INVERTERS: 'http://localhost:4000/api/inverters',
  SITES: 'http://localhost:4000/api/sites',
  ALERTS: 'http://localhost:4000/api/alerts',
  MANUFACTURERS: 'http://localhost:4000/api/manufacturers',
  UPLOAD_IMAGE: "http://localhost:4000/api/upload-image/",
  USERS: 'http://localhost:4000/api/users',
  ROLES: 'http://localhost:4000/api/roles',
  METADATA: 'http://localhost:4000/api/metadata',
  
  // Reports
  REPORTS_BASE: 'http://localhost:4000/api/reports',

  // Alerts report export
  ALERTS_EXPORT: 'http://localhost:4000/api/reports/alerts/export',
  // ALERTS_EXPORT_CSV: 'http://localhost:4000/api/reports/alerts/export?format=csv',
  // ALERTS_EXPORT_PDF: 'http://localhost:4000/api/reports/alerts/export?format=pdf',

  // Fleet Summary report export
  FLEET_SUMMARY_EXPORT_CSV: 'http://localhost:4000/api/reports/fleet-summary/export?format=csv',
  FLEET_SUMMARY_EXPORT_PDF: 'http://localhost:4000/api/reports/fleet-summary/export?format=pdf',

  // Site Performance report export
  SITE_PERFORMANCE_EXPORT_CSV: 'http://localhost:4000/api/reports/site-performance/export?format=csv',
  SITE_PERFORMANCE_EXPORT_PDF: 'http://localhost:4000/api/reports/site-performance/export?format=pdf',
}
