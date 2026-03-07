import { Router } from 'express'
import { getSites, createSite, deleteSite, getSiteById, updateSite } from '../controllers/sites.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router()

router.post('/', authMiddleware, createSite); 
router.get('/', authMiddleware, getSites);
router.get("/:id", authMiddleware, getSiteById);
router.put("/:id", authMiddleware, updateSite);
router.delete("/:id", authMiddleware, deleteSite);

export default router
