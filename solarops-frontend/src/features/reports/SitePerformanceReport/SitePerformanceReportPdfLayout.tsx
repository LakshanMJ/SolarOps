import React from 'react';
import {
    Activity,
    AlertTriangle,
    TrendingUp,
    Percent,
    Heart,
    BatteryFull,
    Clock,
    Bell,
    CheckCircle,
    XCircle,
    Building2,
    MapPinned,
    MapPin
} from 'lucide-react';


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
        avgOutput: 485.2,
        avgPR: 87.5,
        health: 'Good',
        energyProduced: 12547.8,
        downtimePercentage: 8.3,
        alertRate: 2.1,
    },
};

// Inline SVG Icons
const Icons = {
    Zap: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
    ),
    Activity: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
    ),
    AlertTriangle: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
    ),
    TrendingUp: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
    ),
    Percent: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="5" x2="5" y2="19"></line>
            <circle cx="6.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="17.5" r="2.5"></circle>
        </svg>
    ),
    Heart: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    ),
    Battery: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
            <line x1="22" y1="11" x2="22" y2="13"></line>
            <line x1="6" y1="11" x2="6" y2="13"></line>
            <line x1="10" y1="11" x2="10" y2="13"></line>
            <line x1="14" y1="11" x2="14" y2="13"></line>
        </svg>
    ),
    Clock: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    ),
    Bell: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
    ),
    CheckCircle: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    ),
    XCircle: ({ color = 'currentColor', size = 24 }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
    ),
};

export function SitePerformanceReportPdfLayout(data: any) {
    const { siteInfo, metrics } = reportData;
    const inverterEfficiency = ((metrics.activeInverters / metrics.totalInverters) * 100).toFixed(1);
    const healthStatus = metrics.health;

    return (
        <div
            style={{
                width: '794px',
                height: '1123px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                fontFamily: "'Inter', sans-serif"
            }}
        >
            <div style={{ padding: '20px 30px', backgroundColor: '#1d4ed8', color: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                            src="public/solarops_logo.png"        // put your PNG in public folder
                            alt="Sun Icon"
                            width={52}            // same size as your <Sun size={32} />
                            height={52}
                            style={{ display: "block" }} // optional, keeps layout clean
                        />
                        <div>
                            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Solar Ops</h1>
                            <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
                                Site Performance Report
                            </p>
                            {/* <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>{siteInfo.name}</p>
                            <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>{siteInfo.location}</p> */}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '12px' }}>
                        <p style={{ margin: 0, opacity: 0.8 }}>Report Date</p>
                        <p style={{ fontWeight: 'bold', margin: 0 }}>March 17, 2026</p>
                    </div>
                </div>
            </div>

            {/* Site Information */}
            <div style={{ padding: '20px 30px' }}>
                {/* Site Name with Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0' }}>
                    <Building2 size={30}/>
                    <p style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: 0
                    }}>
                        {siteInfo.name}
                    </p>
                </div>

                {/* Location with Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px' }}>
                    <MapPin size={20} />
                    <p style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        margin: 0
                    }}>
                        {siteInfo.location}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '25px', flex: 1 }}>

                {/* Health Banner */}
                <div
                    style={{
                        border: '1px solid #d1fae5',
                        backgroundColor: '#ecfdf5',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle color="#16a34a" />
                        <div>
                            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#6b7280', margin: 0 }}>
                                Overall System Health: <span style={{ color: healthStatus === 'Good' ? '#15803d' : healthStatus === 'Fair' ? '#a16207' : '#b91c1c' }}>{healthStatus}</span>
                            </h2>
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                            Active Inverters
                        </p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>
                            {metrics.activeInverters}/{metrics.totalInverters}
                        </p>
                        <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>
                            {inverterEfficiency}% operational
                        </p>
                    </div>
                </div>

                {/* Primary Status Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                    <StatCard
                        icon={<Icons.Zap color="#2563eb" size={24} />}
                        label="Total Inverters"
                        value={metrics.totalInverters}
                        sub="Installed Units"
                        color="#dbeafe"
                    />
                    <StatCard
                        icon={<Icons.Activity color="#16a34a" size={24} />}
                        label="Active Inverters"
                        value={metrics.activeInverters}
                        sub={`${inverterEfficiency}% uptime`}
                        color="#dcfce7"
                    />
                    <StatCard
                        icon={<Icons.AlertTriangle color="#dc2626" size={24} />}
                        label="Active Alerts"
                        value={metrics.alertsCount}
                        sub="Require attention"
                        color="#fee2e2"
                    />
                </div>

                {/* Alert Rate Banner */}
                <div style={{
                    backgroundColor: '#fff7ed',
                    border: '1px solid #fed7aa',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <Icons.Bell color="#ea580c" size={18} />
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#6b7280', margin: 0 }}>
                            Alert Rate: {metrics.alertRate} alerts/day
                        </h2>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '5px 0 0 26px' }}>
                        Downtime: <strong>{metrics.downtimePercentage}%</strong> of total time
                    </p>
                </div>

                {/* Secondary Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                    <StatCard
                        icon={<Icons.TrendingUp color="#9333ea" size={24} />}
                        label="Avg Output"
                        value={metrics.avgOutput}
                        sub="kW"
                        color="#f3e8ff"
                    />
                    <StatCard
                        icon={<Icons.Percent color="#4f46e5" size={24} />}
                        label="Avg PR"
                        value={`${metrics.avgPR}%`}
                        sub="Performance Ratio"
                        color="#e0e7ff"
                    />
                    <StatCard
                        icon={<Icons.Heart color={healthStatus === 'Good' ? '#16a34a' : healthStatus === 'Fair' ? '#ca8a04' : '#dc2626'} size={24} />}
                        label="System Health"
                        value={metrics.health}
                        sub="Status"
                        color={healthStatus === 'Good' ? '#dcfce7' : healthStatus === 'Fair' ? '#fef9c3' : '#fee2e2'}
                    />
                </div>

                {/* KPI Section - Energy & Downtime */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <MetricCard
                        title="Energy Produced"
                        value={metrics.energyProduced.toLocaleString()}
                        unit="kWh"
                        bg="#eff6ff"
                        accent="#1e40af"
                        icon={<Icons.Battery color="#1e40af" size={80} />}
                    />
                    <MetricCard
                        title="Downtime"
                        value={metrics.downtimePercentage}
                        unit="% of total time"
                        bg="#fff7ed"
                        accent="#c2410c"
                        icon={<Icons.Clock color="#c2410c" size={80} />}
                    />
                </div>
            </div>

            {/* Footer */}
            <div style={{ padding: '15px', textAlign: 'center', borderTop: '1px solid #eee' }}>
                <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0 }}>
                    Generated on {siteInfo.reportDate} • Confidential
                </p>
            </div>
        </div>
    );
}

/* Components */
// Sub-components to keep code clean
function StatCard({ icon, label, value, sub, color }: any) {
    return (
        <div style={{ padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    backgroundColor: color,
                    marginBottom: '8px'
                }}
            >
                {icon}
            </div>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{label}</p>
            <p style={{ fontSize: '20px', color: '#1f2937', fontWeight: 'bold', margin: 0 }}>{value}</p>
            {sub && <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>{sub}</p>}
        </div>
    );
}

function MetricCard({ title, value, unit, icon, bg, accent }: any) {
    return (
        <div
            style={{
                backgroundColor: bg,
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${bg}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
            }}
        >
            {/* Left content */}
            <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: accent, margin: '0 0 10px 0' }}>
                    {title}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '28px', fontWeight: 'bold', color: accent }}>
                        {value}
                    </span>
                </div>
                <span style={{ fontSize: '14px', color: accent }}>
                    {unit}
                </span>
            </div>

            {/* Right icon box */}
            {icon && (
                <div
                    style={{
                        width: '70px',
                        height: '70px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff33'
                    }}
                >
                    {icon}
                </div>
            )}
        </div>
    );
}