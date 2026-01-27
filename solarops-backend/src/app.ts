import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboard.routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// 🔽 ADD THIS LINE
app.use('/dashboard', dashboardRoutes)

export default app
