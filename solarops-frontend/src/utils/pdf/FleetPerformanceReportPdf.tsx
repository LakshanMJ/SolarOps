import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { 
  Sun, 
  Server, 
  Power, 
  PowerOff, 
  AlertTriangle,
  TrendingUp,
  Zap
} from 'lucide-react';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Mock data for the chart
const chartData = [
  { name: 'Site A', output: 450, pr: 85 },
  { name: 'Site B', output: 380, pr: 92 },
  { name: 'Site C', output: 520, pr: 88 },
  { name: 'Site D', output: 290, pr: 78 },
  { name: 'Site E', output: 410, pr: 90 },
  { name: 'Site F', output: 360, pr: 86 },
];

export function FleetPerformanceReportPdf() {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="border-b pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fleet Performance Report</h1>
              <p className="text-gray-500 mt-1">Generated on March 16, 2026</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Sun className="size-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Total Sites */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography  className="text-sm font-medium text-gray-600">
                Total Sites
              </Typography >
              <Server className="size-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">24</div>
              <p className="text-xs text-gray-500 mt-1">Across all locations</p>
            </CardContent>
          </Card>

          {/* Total Inverters */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography  className="text-sm font-medium text-gray-600">
                Total Inverters
              </Typography >
              <Zap className="size-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">156</div>
              <p className="text-xs text-gray-500 mt-1">Fleet-wide</p>
            </CardContent>
          </Card>

          {/* Online Inverters */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography  className="text-sm font-medium text-gray-600">
                Online Inverters
              </Typography >
              <Power className="size-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">152</div>
              <p className="text-xs text-gray-500 mt-1">97.4% availability</p>
            </CardContent>
          </Card>

          {/* Offline Inverters */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography className="text-sm font-medium text-gray-600">
                Offline Inverters
              </Typography>
              <PowerOff className="size-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">4</div>
              <p className="text-xs text-gray-500 mt-1">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts */}
        <div className="mb-6">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography className="text-sm font-medium text-gray-900">
                Active Alerts
              </Typography>
              <AlertTriangle className="size-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">7</div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Critical</span>
                  <span className="font-semibold text-red-600">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Warning</span>
                  <span className="font-semibold text-orange-600">3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Info</span>
                  <span className="font-semibold text-blue-600">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Total Output */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography className="text-sm font-medium text-gray-900">
                Total Output (Today)
              </Typography>
              <TrendingUp className="size-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-900">2,410 kWh</div>
              <div className="mt-2 flex items-center">
                <span className="text-green-600 text-sm font-semibold">↑ 12.5%</span>
                <span className="text-gray-600 text-sm ml-2">vs. yesterday</span>
              </div>
            </CardContent>
          </Card>

          {/* Average PR */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Typography className="text-sm font-medium text-gray-900">
                Average Performance Ratio
              </Typography>
              <Sun className="size-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-900">86.5%</div>
              <div className="mt-2 flex items-center">
                <span className="text-green-600 text-sm font-semibold">↑ 2.1%</span>
                <span className="text-gray-600 text-sm ml-2">vs. last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card>
          <CardHeader>
            <Typography className="text-lg font-semibold text-gray-900">
              Site Performance Overview
            </Typography>
            <p className="text-sm text-gray-500">Output (kWh) and Performance Ratio (%) by Site</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    label={{ value: 'Output (kWh)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    label={{ value: 'PR (%)', angle: 90, position: 'insideRight', fill: '#6b7280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
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
                    name="PR (%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p>Solar Fleet Management System • Report ID: FPR-2026-0316-001</p>
        </div>
      </div>
    </div>
  );
}
