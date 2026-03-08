import { Router } from 'express'
import { getSites, deleteSite, getSiteById, createOrUpdateSite } from '../controllers/sites.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router()

router.post('/', authMiddleware, createOrUpdateSite); 
router.get('/', authMiddleware, getSites);
router.get("/:id", authMiddleware, getSiteById);
router.put("/:id", authMiddleware, createOrUpdateSite);
router.delete("/:id", authMiddleware, deleteSite);

export default router
