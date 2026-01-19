import { createBrowserRouter } from 'react-router-dom'
import AlertsPage from '@/features/alerts/AlertsPage'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/alerts',
    element: <AlertsPage />,
  },
])