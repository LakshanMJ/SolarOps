import { Router } from 'express';
import { getAlerts, updateAlertStatus } from '../controllers/alerts.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();


router.get('/', authMiddleware, getAlerts);
router.patch('/:id/status', authMiddleware, updateAlertStatus);

export default router;
