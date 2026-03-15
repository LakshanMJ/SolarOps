import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboard.routes.js'
import siteRoutes from './routes/sites.routes.js'
import invertersRoutes from './routes/inverters.routes.js'
import startTelemetryWorker from './jobs/telemetryWorker.js';
import alertsRoutes from './routes/alerts.routes.js'
import manufacturersRoutes from './routes/manufacturers.routes.js'
import path from 'path'
import uploadRoutes from './routes/upload.js';
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import rolesRoutes from './routes/roles.routes.js'
import exportRoutes from './routes/reports.routes.js'
import metaDataRoutes from './routes/metadata.routes.js'

// __dirname replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

startTelemetryWorker();

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/upload-image", uploadRoutes);

app.use('/api/dashboard', dashboardRoutes)
app.use('/api/sites', siteRoutes)
app.use('/api/inverters', invertersRoutes)
app.use('/api/alerts', alertsRoutes);
app.use('/api/manufacturers', manufacturersRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use("/api/reports/", exportRoutes);
app.use("/api", metaDataRoutes);

export default app
