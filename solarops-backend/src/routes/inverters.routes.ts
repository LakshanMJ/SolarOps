import { Router } from 'express'
import { createInverter, deleteInverter, getInverterById, getInverters } from '../controllers/inverters.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/', authMiddleware,createInverter)
router.get('/', authMiddleware, getInverters)
router.get("/:id", authMiddleware, getInverterById);
router.put('/:id', authMiddleware, createInverter) // reuse create for updates (upsert)
router.delete('/:id', authMiddleware, deleteInverter);

export default router
