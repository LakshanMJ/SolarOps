import { Router } from 'express'
import { getDashboardKpis } from '../controllers/dashboard.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', authMiddleware, getDashboardKpis)

export default router

