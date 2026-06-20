const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const BACKEND_URLS = {
  // DASHBOARD: 'http://localhost:4000/api/dashboard',
  // INVERTERS: 'http://localhost:4000/api/inverters',
  // SITES: 'http://localhost:4000/api/sites',
  // ALERTS: 'http://localhost:4000/api/alerts',
  // MANUFACTURERS: 'http://localhost:4000/api/manufacturers',
  // UPLOAD_IMAGE: "http://localhost:4000/api/upload-image/",
  // USERS: 'http://localhost:4000/api/users',
  // CURRENT_USER: 'http://localhost:4000/api/users/me',
  // ROLES: 'http://localhost:4000/api/roles',
  // METADATA: 'http://localhost:4000/api/metadata',
  // IMAGE_PATH: 'http://localhost:4000/uploads',
  DASHBOARD: `${BASE_URL}/api/dashboard`,
  INVERTERS: `${BASE_URL}/api/inverters`,
  SITES: `${BASE_URL}/api/sites`,
  ALERTS: `${BASE_URL}/api/alerts`,
  MANUFACTURERS: `${BASE_URL}/api/manufacturers`,
  UPLOAD_IMAGE: `${BASE_URL}/api/upload-image/`,
  USERS: `${BASE_URL}/api/users`,
  CURRENT_USER: `${BASE_URL}/api/users/me`,
  ROLES: `${BASE_URL}/api/roles`,
  METADATA: `${BASE_URL}/api/metadata`,
  IMAGE_PATH: `${BASE_URL}/uploads`,

  // Reports
  // REPORTS_BASE: 'http://localhost:4000/api/reports',
  REPORTS_BASE: `${BASE_URL}/api/reports`,

  // Alerts report export
  // ALERTS_EXPORT: 'http://localhost:4000/api/reports/alerts/export',
  ALERTS_EXPORT: `${BASE_URL}/api/reports/alerts/export`,

  // Fleet Summary report export
  // FLEET_SUMMARY_EXPORT_CSV: 'http://localhost:4000/api/reports/fleet-summary/export?format=csv',
  // FLEET_SUMMARY_EXPORT_PDF: 'http://localhost:4000/api/reports/fleet-summary/export?format=pdf',
  FLEET_SUMMARY_EXPORT_CSV: `${BASE_URL}/api/reports/fleet-summary/export?format=csv`,
  FLEET_SUMMARY_EXPORT_PDF: `${BASE_URL}/api/reports/fleet-summary/export?format=pdf`,

  // Site Performance report export
  // SITE_PERFORMANCE_EXPORT_CSV: 'http://localhost:4000/api/reports/site-performance/export?format=csv',
  // SITE_PERFORMANCE_EXPORT_PDF: 'http://localhost:4000/api/reports/site-performance/export?format=pdf',
  SITE_PERFORMANCE_EXPORT_CSV: `${BASE_URL}/api/reports/site-performance/export?format=csv`,
  SITE_PERFORMANCE_EXPORT_PDF: `${BASE_URL}/api/reports/site-performance/export?format=pdf`,
}
