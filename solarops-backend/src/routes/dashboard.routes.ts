import { Router } from 'express'
import { getDashboardKpis } from '../controllers/dashboard.controller.js'

const router = Router()

router.get('/kpis', getDashboardKpis)

export default router
