import { Router } from 'express'
import { getSites } from '../controllers/sites.controller.js'

const router = Router()

router.get('/', getSites)

export default router
