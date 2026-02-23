import { Router } from 'express'
import { getManufacturers } from '../controllers/manufacturers.controller.js';

const router = Router()

// Get all manufacturers
router.get('/', getManufacturers); 

export default router
