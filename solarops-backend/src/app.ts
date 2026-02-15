import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboard.routes.js'
import siteRoutes from './routes/sites.routes.js'
import invertersRoutes from './routes/inverters.routes.js'
import startTelemetryWorker from './jobs/telemetryWorker.js';
import alertsRoutes from './routes/alerts.routes.js'

startTelemetryWorker();

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


app.use('/dashboard', dashboardRoutes)
app.use('/sites', siteRoutes)
app.use('/inverters', invertersRoutes)
app.use('/alerts', alertsRoutes);

export default app
