import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboard.routes.js'
import siteRoutes from './routes/sites.routes.js'
import invertersRoutes from './routes/inverters.routes.js'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// 🔽 ADD THIS LINE
app.use('/dashboard', dashboardRoutes)
app.use('/sites', siteRoutes)
app.use('/inverters', invertersRoutes)

export default app
