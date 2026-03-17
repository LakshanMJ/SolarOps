import {
    Sun,
    Zap,
    Building2,
    Power,
    PowerOff,
    AlertTriangle,
    TrendingUp,
    Battery
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


export function FleetSummaryReportPdfLayout(filters: any) {
    return (
        <div style={{ width: '794px', maxWidth: '100%', margin: '0 auto' }}>
            <div style={{ minHeight: '100vh', padding: '1rem', backgroundColor: '#f9fafb', color: '#111827', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: '#ffffff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}>
                    {/* Header */}
                    <div style={{ padding: '1.5rem 2rem', background: 'linear-gradient(to right, rgb(37, 99, 235), rgb(29, 78, 216))' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Sun style={{ width: '2.5rem', height: '2.5rem', color: '#fde047' }} />
                                <div>
                                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Fleet Performance Report</h1>
                                    <p style={{ marginTop: '0.25rem', color: '#dbeafe', fontSize: '0.875rem', margin: 0 }}>Solar Energy Management Dashboard</p>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ color: '#dbeafe', fontSize: '0.875rem', margin: 0 }}>Report Date</p>
                                <p style={{ fontWeight: '600', color: '#ffffff', margin: 0 }}>March 17, 2026</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div style={{ padding: '2rem' }}>
                        {/* Overview Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                            {/* Total Sites */}
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#dbeafe' }}>
                                        <Building2 style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Total Sites</h3>
                                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>24</p>
                            </div>

                            {/* Total Inverters */}
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#f3e8ff' }}>
                                        <Zap style={{ width: '1.5rem', height: '1.5rem', color: '#9333ea' }} />
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Total Inverters</h3>
                                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>156</p>
                            </div>

                            {/* Online Inverters */}
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#dcfce7' }}>
                                        <Power style={{ width: '1.5rem', height: '1.5rem', color: '#16a34a' }} />
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Online</h3>
                                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#16a34a', margin: '0 0 0.25rem 0' }}>152</p>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: '#6b7280', margin: 0 }}>97.4% uptime</p>
                            </div>

                            {/* Offline Inverters */}
                            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#fee2e2' }}>
                                        <PowerOff style={{ width: '1.5rem', height: '1.5rem', color: '#dc2626' }} />
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>Offline</h3>
                                <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#dc2626', margin: '0 0 0.25rem 0' }}>4</p>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: '#6b7280', margin: 0 }}>2.6% down</p>
                            </div>
                        </div>

                        {/* Active Alerts */}
                        <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#fff7ed' }}>
                                    <AlertTriangle style={{ width: '1.5rem', height: '1.5rem', color: '#ea580c' }} />
                                </div>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280', margin: 0 }}>Active Alerts</h3>
                            </div>
                            <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ea580c', margin: '0 0 0.25rem 0' }}>7</p>
                            <div style={{ marginTop: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem', color: '#374151' }}>
                                    <span>Critical</span>
                                    <span style={{ fontWeight: '600', color: '#dc2626' }}>2</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem', color: '#374151' }}>
                                    <span>Warning</span>
                                    <span style={{ fontWeight: '600', color: '#f97316' }}>3</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#374151' }}>
                                    <span>Info</span>
                                    <span style={{ fontWeight: '600', color: '#3b82f6' }}>2</span>
                                </div>
                            </div>
                        </div>

                        {/* Performance Chart Placeholder */}
                        <div
                            style={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                padding: '1.5rem',
                                marginBottom: '2rem',
                                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                                pageBreakInside: 'avoid'
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1.5rem',
                                    color: '#111827',
                                }}
                            >
                                Fleet Performance Overview
                            </h2>

                            <div style={{ height: '20rem' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 20, right: 50, left: 0, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            interval={0} // show all sites
                                            angle={-30} // tilt labels for readability
                                            textAnchor="end"
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            label={{
                                                value: 'Output (kWh)',
                                                angle: -90,
                                                position: 'insideLeft',
                                                fill: '#6b7280',
                                            }}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            label={{
                                                value: 'PR (%)',
                                                angle: 90,
                                                position: 'insideRight',
                                                fill: '#6b7280',
                                            }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '6px',
                                            }}
                                        />
                                        <Legend verticalAlign="top" height={36} />
                                        <Bar
                                            yAxisId="left"
                                            dataKey="output"
                                            fill="#3b82f6"
                                            name="Output (kWh)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            yAxisId="right"
                                            dataKey="pr"
                                            fill="#10b981"
                                            name="Performance Ratio (%)"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                            {/* Total Output */}
                            <div style={{ background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',pageBreakInside: 'avoid' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#2563eb' }}>
                                        <Battery style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1d4ed8', margin: 0 }}>This Month</p>
                                        <p style={{ fontWeight: '600', color: '#2563eb', margin: 0 }}>+12.5%</p>
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#1e40af', margin: '0 0 0.5rem 0' }}>Total Energy Output</h3>
                                <p style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#1e3a8a', margin: '0 0 0.25rem 0' }}>3,847</p>
                                <p style={{ fontWeight: '500', color: '#1d4ed8', margin: 0 }}>MWh</p>
                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #bfdbfe' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                        <span style={{ color: '#1d4ed8' }}>Expected: 3,420 MWh</span>
                                        <span style={{ fontWeight: '600', color: '#1e3a8a' }}>+427 MWh</span>
                                    </div>
                                </div>
                            </div>

                            {/* Average PR */}
                            <div style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)', border: '1px solid #bbf7d0', borderRadius: '0.5rem', padding: '1.5rem', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',pageBreakInside: 'avoid' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#16a34a' }}>
                                        <TrendingUp style={{ width: '1.75rem', height: '1.75rem', color: '#ffffff' }} />
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#15803d', margin: 0 }}>vs Target</p>
                                        <p style={{ fontWeight: '600', color: '#16a34a', margin: 0 }}>+3.2%</p>
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#166534', margin: '0 0 0.5rem 0' }}>Average Performance Ratio</h3>
                                <p style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#14532d', margin: '0 0 0.25rem 0' }}>88.2</p>
                                <p style={{ fontWeight: '500', color: '#15803d', margin: 0 }}>% PR</p>
                                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #bbf7d0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                        <span style={{ color: '#15803d' }}>Target: 85.0%</span>
                                        <span style={{ fontWeight: '600', color: '#14532d' }}>Exceeding</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                                Generated on March 17, 2026 at 09:45 AM • Confidential Report
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
