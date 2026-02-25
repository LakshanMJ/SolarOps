import { Router } from 'express'
import { createInverter, getInverterById, getInverters } from '../controllers/inverters.controller.js'

const router = Router()

router.get('/', getInverters)
router.post('/', createInverter)
router.get("/:id", getInverterById);

export default router
