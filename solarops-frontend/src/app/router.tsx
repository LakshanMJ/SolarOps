import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import AlertsPage from '@/features/alerts/AlertsPage'
import DashboardPage from '@/features/dashboard/DashboardPage'

export const router = createBrowserRouter([
  {
    path: '/',            // parent layout path
    element: <App />,      // App with header
    children: [
      { index: true, element: <DashboardPage /> }, // root dashboard
      { path: 'alerts', element: <AlertsPage /> }, // relative path
    ],
  },
])

