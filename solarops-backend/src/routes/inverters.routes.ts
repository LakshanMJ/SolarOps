import { Router } from 'express'
import { createInverter, getInverters } from '../controllers/inverters.controller.js'

const router = Router()

router.get('/', getInverters)
router.post('/', createInverter)

export default router
