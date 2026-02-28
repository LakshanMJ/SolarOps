import { Router } from 'express'
import { getSites, createSite, deleteSite, getSiteById } from '../controllers/sites.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router()

// Get all sites
router.get('/', authMiddleware, getSites);

// Get site by id
router.get("/:id", authMiddleware, getSiteById);

// Create a new site
router.post('/', authMiddleware, createSite);   

// Delete a new site
router.delete("/:id", authMiddleware, deleteSite);

export default router
