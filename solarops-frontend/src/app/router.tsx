import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import AlertsPage from '@/features/alerts/AlertsPage'
import DashboardPage from '@/features/dashboard/DashboardPage'
import Sites from '@/features/sites/Sites'
import Inverters from '@/features/inverters/Inverters'
import PrivateRoute from './PrivateRoute'
import Login from '@/features/login/Login'
import Register from '@/features/register/Register'
import Users from '@/features/users/Users'
import Reports from '@/features/reports/Reports'
import FleetSummaryReportPdfView from '@/features/reports/FleetSummaryReport/pdf/FleetSummaryReportPdfView'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  { path: 'register',
    element: <Register />
  },
  { path: '/fleet-report', element: <FleetSummaryReportPdfView /> },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      // { index: true, element: <DashboardPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'sites', element: <Sites /> },
      { path: 'inverters', element: <Inverters /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'reports', element: <Reports /> },
      { path: 'users', element: <Users /> },
      // { path: 'fleet-report', element: <FleetSummaryReportPdfView /> },
    ],
  },
])