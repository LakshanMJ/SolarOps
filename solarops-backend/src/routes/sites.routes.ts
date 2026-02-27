import { Router } from 'express'
import { getSites, createSite, deleteSite, getSiteById } from '../controllers/sites.controller.js'

const router = Router()

// Get all sites
router.get('/', getSites);

// Get site by id
router.get("/:id", getSiteById);

// Create a new site
router.post('/', createSite);   

// Delete a new site
router.delete("/:id", deleteSite);

export default router
