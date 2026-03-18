import {
    Sun, Zap, Building2, Power, PowerOff, AlertTriangle, TrendingUp, Battery
} from 'lucide-react';
import { BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const chartData = [
    { name: 'Site A', output: 450, pr: 85 },
    { name: 'Site B', output: 380, pr: 92 },
    { name: 'Site C', output: 520, pr: 88 },
    { name: 'Site D', output: 290, pr: 78 },
    { name: 'Site E', output: 410, pr: 90 },
    { name: 'Site F', output: 360, pr: 86 },
];

export function FleetSummaryReportPdfLayout() {
    return (
        /* Standard A4 dimensions at 96 DPI: 794px x 1123px */
        <div
            style={{
                width: '794px',
                height: '1123px', // Fixed A4 height
                overflow: 'hidden', // Clips anything that tries to go to page 2
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                margin: '0',
                padding: '0',
                boxSizing: 'border-box',
                fontFamily: "'Inter', sans-serif"
            }}
        >
            {/* Header - Simplified colors to reduce PDF size */}
            <div style={{ padding: '20px 30px', backgroundColor: '#1d4ed8', color: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* <Sun size={32} color="#fde047" /> */}
                        <img
                            src="public/solarops_logo.png"        // put your PNG in public folder
                            alt="Sun Icon"
                            width={32}            // same size as your <Sun size={32} />
                            height={32}
                            style={{ display: "block" }} // optional, keeps layout clean
                        />
                        <div>
                            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Fleet Performance Report</h1>
                            <p style={{ color: '#dbeafe', fontSize: '12px', margin: 0 }}>Solar Energy Management</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '12px' }}>
                        <p style={{ margin: 0, opacity: 0.8 }}>Report Date</p>
                        <p style={{ fontWeight: 'bold', margin: 0 }}>March 17, 2026</p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ padding: '25px', flex: 1 }}>

                {/* Status Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' }}>
                    <StatCard icon={<Building2 color="#2563eb" />} label="Total Sites" value="24" color="#dbeafe" />
                    <StatCard icon={<Zap color="#9333ea" />} label="Inverters" value="156" color="#f3e8ff" />
                    <StatCard icon={<Power color="#16a34a" />} label="Online" value="152" sub="97.4% uptime" color="#dcfce7" />
                    <StatCard icon={<PowerOff color="#dc2626" />} label="Offline" value="4" sub="2.6% down" color="#fee2e2" />
                </div>

                {/* Alerts - Solid border instead of shadow */}
                <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <AlertTriangle size={18} color="#ea580c" />
                        <h3 style={{ fontSize: '14px', margin: 0, color: '#9a3412' }}>Active Alerts: 7</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '30px', fontSize: '12px' }}>
                        <span>Critical: <strong style={{ color: '#dc2626' }}>2</strong></span>
                        <span>Warning: <strong style={{ color: '#f97316' }}>3</strong></span>
                        <span>Info: <strong style={{ color: '#3b82f6' }}>2</strong></span>
                    </div>
                </div>

                {/* Performance Chart - Animations disabled to prevent frame bloating */}
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Fleet Overview</h2>
                    <div style={{ height: '280px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" fontSize={10} tickLine={false} axisLine={false} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                                <Bar isAnimationActive={false} yAxisId="left" dataKey="output" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar isAnimationActive={false} yAxisId="left" dataKey="pr" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* KPI Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <KPICard
                        title="Total Energy Output"
                        value="3,847"
                        unit="MWh"
                        trend="+12.5%"
                        bg="#eff6ff"
                        accent="#1e40af"
                    />
                    <KPICard
                        title="Avg Performance Ratio"
                        value="88.2"
                        unit="% PR"
                        trend="+3.2%"
                        bg="#f0fdf4"
                        accent="#166534"
                    />
                </div>
            </div>

            {/* Simple Footer */}
            <div style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid #f3f4f6' }}>
                <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0 }}>
                    Generated on March 17, 2026 • Confidential
                </p>
            </div>
        </div>
    );
}

// Sub-components to keep code clean
function StatCard({ icon, label, value, sub, color }: any) {
    return (
        <div style={{ padding: '15px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <div style={{ padding: '8px', width: 'fit-content', borderRadius: '6px', backgroundColor: color, marginBottom: '8px' }}>
                {icon}
            </div>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{label}</p>
            <p style={{ fontSize: '20px', color: '#6b7280', fontWeight: 'bold', margin: 0 }}>{value}</p>
            {sub && <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>{sub}</p>}
        </div>
    );
}

function KPICard({ title, value, unit, trend, bg, accent }: any) {
    return (
        <div style={{ backgroundColor: bg, padding: '20px', borderRadius: '8px', border: `1px solid ${bg}` }}>
            <p style={{ fontSize: '12px', fontWeight: 600, color: accent, margin: '0 0 10px 0' }}>{title}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: accent }}>{value}</span>
                <span style={{ fontSize: '14px', color: accent }}>{unit}</span>
            </div>
            <p style={{ fontSize: '12px', color: accent, marginTop: '5px', fontWeight: 'bold' }}>{trend} this month</p>
        </div>
    );
}