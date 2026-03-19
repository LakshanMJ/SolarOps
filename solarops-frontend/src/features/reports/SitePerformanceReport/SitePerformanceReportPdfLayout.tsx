import React from 'react';

// Mock data for the report
const reportData = {
  siteInfo: {
    name: 'Solar Site Alpha',
    location: 'Phoenix, Arizona',
    reportDate: 'March 19, 2026',
    reportPeriod: 'March 1-18, 2026',
  },
  metrics: {
    totalInverters: 24,
    activeInverters: 22,
    alertsCount: 3,
    avgOutput: 485.2, // kW
    avgPR: 87.5, // %
    health: 'Good',
    energyProduced: 12547.8, // kWh
    downtimePercentage: 8.3, // %
    alertRate: 2.1, // alerts per day
  },
};

// Inline SVG Icons
const Icons = {
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  ),
  Activity: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  ),
  AlertTriangle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  TrendingUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  ),
  Percent: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19"></line>
      <circle cx="6.5" cy="6.5" r="2.5"></circle>
      <circle cx="17.5" cy="17.5" r="2.5"></circle>
    </svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  Battery: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
      <line x1="22" y1="11" x2="22" y2="13"></line>
      <line x1="6" y1="11" x2="6" y2="13"></line>
      <line x1="10" y1="11" x2="10" y2="13"></line>
      <line x1="14" y1="11" x2="14" y2="13"></line>
    </svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  ),
  XCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  ),
};


export function SitePerformanceReportPdfLayout(filters) {

  const { siteInfo, metrics } = reportData;
  const healthStatus = metrics.health;
  const inverterEfficiency = ((metrics.activeInverters / metrics.totalInverters) * 100).toFixed(1);

  const styles = {
    container: {
      background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
      padding: '32px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    pdfPage: {
      width: '794px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    header: {
      background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
      color: '#ffffff',
      padding: '32px',
    },
    headerFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '20px',
    },
    headerTitle: {
      fontSize: '36px',
      fontWeight: '700',
      marginBottom: '8px',
      margin: '0',
    },
    headerSubtitle: {
      color: '#bfdbfe',
      fontSize: '18px',
      margin: '4px 0',
    },
    headerLocation: {
      color: '#dbeafe',
      fontSize: '14px',
      marginTop: '4px',
    },
    dateBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '8px',
      padding: '12px 24px',
      textAlign: 'right' as const,
    },
    dateLabel: {
      fontSize: '14px',
      color: '#bfdbfe',
      margin: '0',
    },
    dateValue: {
      fontSize: '20px',
      fontWeight: '600',
      margin: '4px 0',
    },
    datePeriod: {
      fontSize: '14px',
      color: '#dbeafe',
      marginTop: '4px',
    },
    content: {
      padding: '32px',
    },
    healthBanner: (status: string) => ({
      borderRadius: '8px',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: `2px solid ${status === 'Good' ? '#bbf7d0' : status === 'Fair' ? '#fef08a' : '#fecaca'}`,
      backgroundColor: status === 'Good' ? '#f0fdf4' : status === 'Fair' ? '#fefce8' : '#fef2f2',
      marginBottom: '32px',
      flexWrap: 'wrap' as const,
      gap: '20px',
    }),
    healthLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    healthIcon: (status: string) => ({
      width: '48px',
      height: '48px',
      color: status === 'Good' ? '#16a34a' : status === 'Fair' ? '#ca8a04' : '#dc2626',
    }),
    healthLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#475569',
      margin: '0',
    },
    healthValue: (status: string) => ({
      fontSize: '30px',
      fontWeight: '700',
      color: status === 'Good' ? '#15803d' : status === 'Fair' ? '#a16207' : '#b91c1c',
      margin: '4px 0 0 0',
    }),
    healthRight: {
      textAlign: 'right' as const,
    },
    grid3: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    card: (bgGradient: string, borderColor: string) => ({
      background: bgGradient,
      borderRadius: '8px',
      padding: '24px',
      border: `1px solid ${borderColor}`,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s ease',
    }),
    cardWhite: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s ease',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
    },
    iconCircle: (bgColor: string, color: string) => ({
      backgroundColor: bgColor,
      borderRadius: '50%',
      padding: '12px',
      width: '48px',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
    }),
    badge: (bgColor: string, textColor: string) => ({
      fontSize: '12px',
      fontWeight: '600',
      color: textColor,
      backgroundColor: bgColor,
      padding: '4px 12px',
      borderRadius: '9999px',
    }),
    cardLabel: (color: string) => ({
      fontSize: '14px',
      fontWeight: '500',
      color: color,
      margin: '0 0 4px 0',
    }),
    cardValue: (color: string) => ({
      fontSize: '36px',
      fontWeight: '700',
      color: color,
      margin: '0',
    }),
    cardUnit: (color: string) => ({
      fontSize: '12px',
      color: color,
      marginTop: '8px',
    }),
    metricHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
    },
    smallIcon: (bgColor: string, color: string) => ({
      backgroundColor: bgColor,
      borderRadius: '50%',
      padding: '8px',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
    }),
    metricLabel: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#334155',
      margin: '0',
    },
    metricValue: {
      fontSize: '30px',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0',
    },
    metricUnit: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '4px',
    },
    footer: {
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#64748b',
      flexWrap: 'wrap' as const,
      gap: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.pdfPage}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerFlex}>
            <div>
              <h1 style={styles.headerTitle}>Site Performance Report</h1>
              <p style={styles.headerSubtitle}>{siteInfo.name}</p>
              <p style={styles.headerLocation}>{siteInfo.location}</p>
            </div>
            <div style={styles.dateBox}>
              <p style={styles.dateLabel}>Report Date</p>
              <p style={styles.dateValue}>{siteInfo.reportDate}</p>
              <p style={styles.datePeriod}>Period: {siteInfo.reportPeriod}</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.content}>
          {/* Health Status Banner */}
          <div style={styles.healthBanner(healthStatus)}>
            <div style={styles.healthLeft}>
              <div style={styles.healthIcon(healthStatus)}>
                {healthStatus === 'Good' ? (
                  <Icons.CheckCircle />
                ) : healthStatus === 'Fair' ? (
                  <Icons.Activity />
                ) : (
                  <Icons.XCircle />
                )}
              </div>
              <div>
                <p style={styles.healthLabel}>Overall System Health</p>
                <p style={styles.healthValue(healthStatus)}>{healthStatus}</p>
              </div>
            </div>
            <div style={styles.healthRight}>
              <p style={styles.healthLabel}>Active Inverters</p>
              <p style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: '4px 0' }}>
                {metrics.activeInverters}/{metrics.totalInverters}
              </p>
              <p style={{ fontSize: '14px', color: '#64748b' }}>{inverterEfficiency}% Operational</p>
            </div>
          </div>

          {/* Primary Metrics Grid */}
          <div style={styles.grid3}>
            {/* Total Inverters */}
            <div style={styles.card('linear-gradient(to bottom right, #eff6ff, #dbeafe)', '#bfdbfe')}>
              <div style={styles.cardHeader}>
                <div style={styles.iconCircle('#2563eb', '#ffffff')}>
                  <Icons.Zap />
                </div>
                <div style={styles.badge('#bfdbfe', '#1e40af')}>TOTAL</div>
              </div>
              <p style={styles.cardLabel('#1e3a8a')}> Total Inverters</p>
              <p style={styles.cardValue('#1d4ed8')}>{metrics.totalInverters}</p>
              <p style={styles.cardUnit('#2563eb')}>Installed Units</p>
            </div>

            {/* Active Inverters */}
            <div style={styles.card('linear-gradient(to bottom right, #f0fdf4, #dcfce7)', '#bbf7d0')}>
              <div style={styles.cardHeader}>
                <div style={styles.iconCircle('#16a34a', '#ffffff')}>
                  <Icons.Activity />
                </div>
                <div style={styles.badge('#bbf7d0', '#15803d')}>ACTIVE</div>
              </div>
              <p style={styles.cardLabel('#14532d')}>Active Inverters</p>
              <p style={styles.cardValue('#15803d')}>{metrics.activeInverters}</p>
              <p style={styles.cardUnit('#16a34a')}>Currently Operating</p>
            </div>

            {/* Alerts Count */}
            <div style={styles.card('linear-gradient(to bottom right, #fef2f2, #fee2e2)', '#fecaca')}>
              <div style={styles.cardHeader}>
                <div style={styles.iconCircle('#dc2626', '#ffffff')}>
                  <Icons.AlertTriangle />
                </div>
                <div style={styles.badge('#fecaca', '#991b1b')}>ALERTS</div>
              </div>
              <p style={styles.cardLabel('#7f1d1d')}>Active Alerts</p>
              <p style={styles.cardValue('#b91c1c')}>{metrics.alertsCount}</p>
              <p style={styles.cardUnit('#dc2626')}>Require Attention</p>
            </div>
          </div>

          {/* Secondary Metrics Grid */}
          <div style={styles.grid3}>
            {/* Average Output */}
            <div style={styles.cardWhite}>
              <div style={styles.metricHeader}>
                <div style={styles.smallIcon('#f3e8ff', '#9333ea')}>
                  <Icons.TrendingUp />
                </div>
                <p style={styles.metricLabel}>Average Output</p>
              </div>
              <p style={styles.metricValue}>{metrics.avgOutput}</p>
              <p style={styles.metricUnit}>kW</p>
            </div>

            {/* Average PR */}
            <div style={styles.cardWhite}>
              <div style={styles.metricHeader}>
                <div style={styles.smallIcon('#e0e7ff', '#4f46e5')}>
                  <Icons.Percent />
                </div>
                <p style={styles.metricLabel}>Average PR</p>
              </div>
              <p style={styles.metricValue}>{metrics.avgPR}%</p>
              <p style={styles.metricUnit}>Performance Ratio</p>
            </div>

            {/* Energy Produced */}
            <div style={styles.cardWhite}>
              <div style={styles.metricHeader}>
                <div style={styles.smallIcon('#fef3c7', '#d97706')}>
                  <Icons.Battery />
                </div>
                <p style={styles.metricLabel}>Energy Produced</p>
              </div>
              <p style={styles.metricValue}>{metrics.energyProduced.toLocaleString()}</p>
              <p style={styles.metricUnit}>kWh</p>
            </div>
          </div>

          {/* Bottom Metrics Grid */}
          <div style={styles.grid3}>
            {/* Health */}
            <div style={styles.cardWhite}>
              <div style={styles.metricHeader}>
                <div
                  style={styles.smallIcon(
                    healthStatus === 'Good' ? '#dcfce7' : healthStatus === 'Fair' ? '#fef9c3' : '#fee2e2',
                    healthStatus === 'Good' ? '#16a34a' : healthStatus === 'Fair' ? '#ca8a04' : '#dc2626'
                  )}
                >
                  <Icons.Heart />
                </div>
                <p style={styles.metricLabel}>System Health</p>
              </div>
              <p
                style={{
                  fontSize: '30px',
                  fontWeight: '700',
                  color: healthStatus === 'Good' ? '#16a34a' : healthStatus === 'Fair' ? '#ca8a04' : '#dc2626',
                  margin: '0',
                }}
              >
                {metrics.health}
              </p>
              <p style={styles.metricUnit}>Status</p>
            </div>

            {/* Downtime Percentage */}
            <div style={styles.cardWhite}>
              <div style={styles.metricHeader}>
                <div style={styles.smallIcon('#fed7aa', '#ea580c')}>
                  <Icons.Clock />
                </div>
                <p style={styles.metricLabel}>Downtime</p>
              </div>
              <p style={styles.metricValue}>{metrics.downtimePercentage}%</p>
              <p style={styles.metricUnit}>Of Total Time</p>
            </div>

            {/* Alert Rate */}
            <div style={styles.cardWhite}>
              <div style={styles.metricHeader}>
                <div style={styles.smallIcon('#fce7f3', '#ec4899')}>
                  <Icons.Bell />
                </div>
                <p style={styles.metricLabel}>Alert Rate</p>
              </div>
              <p style={styles.metricValue}>{metrics.alertRate}</p>
              <p style={styles.metricUnit}>Alerts / Day</p>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={{ margin: '0' }}>Generated by Solar Monitoring System</p>
            <p style={{ margin: '0' }}>© 2026 All Rights Reserved</p>
          </div>

        </div>
      </div>
    </div>
  );
}