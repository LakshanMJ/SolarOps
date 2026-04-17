import { Router } from 'express'
import { getManufacturers } from '../controllers/manufacturers.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router()

router.get('/', authMiddleware, getManufacturers); 

export default router
