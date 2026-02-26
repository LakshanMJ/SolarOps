import { Router } from 'express'
import { getSites, createSite, deleteSite } from '../controllers/sites.controller.js'

const router = Router()

// Get all sites
router.get('/', getSites);

// Create a new site
router.post('/', createSite);   

// Delete a new site
router.delete("/:id", deleteSite);

export default router
