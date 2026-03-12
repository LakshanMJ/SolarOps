import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { exportCsvController } from '../controllers/export.controller.js'

const router = Router()

router.get("/export/alertcsv",authMiddleware, exportCsvController)

export default router
