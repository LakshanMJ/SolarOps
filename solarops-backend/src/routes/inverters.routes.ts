import { Router } from 'express'
import { getInverters } from '../controllers/inverters.controller.js'

const router = Router()

router.get('/', getInverters)

export default router
