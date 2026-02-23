import { Router } from 'express'
// import { getSites, createSite } from '../controllers/sites.controller.js'

const router = Router()

// Get all manufacturers
router.get('/', getManufacturers); 

export default router
