import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import AlertsPage from '@/features/alerts/AlertsPage'
import DashboardPage from '@/features/dashboard/DashboardPage'
import Sites from '@/features/sites/Sites'
import Inverters from '@/features/inverters/Inverters'
import PrivateRoute from './PrivateRoute'
import Login from '@/features/login/Login'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'alerts', element: <AlertsPage /> },
      { path: 'sites', element: <Sites /> },
      { path: 'inverters', element: <Inverters /> },
    ],
  },
])