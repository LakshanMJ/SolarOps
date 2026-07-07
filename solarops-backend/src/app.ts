import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import dashboardRoutes from './routes/dashboard.routes.js'
import siteRoutes from './routes/sites.routes.js'
import invertersRoutes from './routes/inverters.routes.js'
import alertsRoutes from './routes/alerts.routes.js'
import manufacturersRoutes from './routes/manufacturers.routes.js'
import uploadRoutes from './routes/upload.js'
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import exportRoutes from './routes/reports.routes.js'
import metaDataRoutes from './routes/metadata.routes.js'

import startTelemetryWorker from './jobs/telemetryWorker.js'

dotenv.config()

startTelemetryWorker()

const app = express()

app.use(cors())
app.use(express.json())

// Auth
app.use("/auth", authRoutes)

// Image upload (Cloudinary)
app.use("/api/upload-image", uploadRoutes)

// API routes
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/sites', siteRoutes)
app.use('/api/inverters', invertersRoutes)
app.use('/api/alerts', alertsRoutes)
app.use('/api/manufacturers', manufacturersRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/roles', rolesRoutes)
app.use("/api/reports", exportRoutes)
app.use("/api", metaDataRoutes)

export default app