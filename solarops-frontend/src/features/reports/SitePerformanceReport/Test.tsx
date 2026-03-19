import React from 'react';
import {
    Zap,
    Activity,
    AlertTriangle,
    TrendingUp,
    Percent,
    Heart,
    BatteryFull,
    Clock,
    Bell,
    CheckCircle,
    XCircle
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

export function test() {
    const { siteInfo, metrics } = reportData;
    const inverterEfficiency = ((metrics.activeInverters / metrics.totalInverters) * 100).toFixed(1);

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
            {/* Header */}
            <div style={{ padding: '20px 30px', backgroundColor: '#1d4ed8', color: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '22px' }}>Site Performance Report</h1>
                        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>{siteInfo.name}</p>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>{siteInfo.location}</p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Report Date</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{siteInfo.reportDate}</p>
                        <p style={{ margin: 0, fontSize: '11px', opacity: 0.8 }}>
                            {siteInfo.reportPeriod}
                        </p>
                    </div>
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
                            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
                                System Health
                            </p>
                            <p style={{ margin: 0, fontWeight: 'bold', color: '#16a34a' }}>
                                {metrics.health}
                            </p>
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

                {/* Top Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                    <StatCard icon={<Zap color="#2563eb" />} label="Total Inverters" value={metrics.totalInverters} />
                    <StatCard icon={<Activity color="#16a34a" />} label="Active Inverters" value={metrics.activeInverters} />
                    <StatCard icon={<AlertTriangle color="#dc2626" />} label="Alerts" value={metrics.alertsCount} />
                </div>

                {/* Mid Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                    <MiniCard icon={<TrendingUp color="#9333ea" />} label="Avg Output" value={metrics.avgOutput} unit="kW" />
                    <MiniCard icon={<Percent color="#4f46e5" />} label="Avg PR" value={metrics.avgPR} unit="%" />
                    <MiniCard icon={<BatteryFull color="#d97706" />} label="Energy" value={metrics.energyProduced} unit="kWh" />
                </div>

                {/* Bottom Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                    <MiniCard icon={<Heart color="#16a34a" />} label="Health" value={metrics.health} />
                    <MiniCard icon={<Clock color="#ea580c" />} label="Downtime" value={metrics.downtimePercentage} unit="%" />
                    <MiniCard icon={<Bell color="#ec4899" />} label="Alert Rate" value={metrics.alertRate} unit="/day" />
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

function StatCard({ icon, label, value }: any) {
    return (
        <div style={{ padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <div style={{ marginBottom: '8px' }}>{icon}</div>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{label}</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{value}</p>
        </div>
    );
}

function MiniCard({ icon, label, value, unit }: any) {
    return (
        <div style={{ padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <div style={{ marginBottom: '8px' }}>{icon}</div>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{label}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                {value} {unit}
            </p>
        </div>
    );
}