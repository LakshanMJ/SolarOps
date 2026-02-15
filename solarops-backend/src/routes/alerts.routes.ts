import { Router } from 'express';
import { getAlerts, updateAlertStatus } from '../controllers/alerts.controller.js';

const router = Router();


router.get('/', getAlerts);
router.patch('/:id/status', updateAlertStatus);

export default router;
