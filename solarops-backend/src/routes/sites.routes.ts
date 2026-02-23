import { Router } from 'express'
import { getSites, createSite } from '../controllers/sites.controller.js'

const router = Router()

// Get all sites
router.get('/', getSites);

// Create a new site
router.post('/', createSite);   

export default router
