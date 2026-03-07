import { Request, Response } from 'express';
import { AlertStatus } from '@prisma/client';
import { getAlertsService, updateAlertStatusService } from '../services/alerts.service.js';

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await getAlertsService();
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
};

export const updateAlertStatus = async (req: Request, res: Response) => {
  let { id } = req.params;
  if (Array.isArray(id)) id = id[0];
  const { status } = req.body as { status: AlertStatus };
  try {
    const alert = await updateAlertStatusService(id, status);
    res.json(alert);
  } catch (error) {
    res.status(400).json({
      error: "Alert not found or invalid request",
    });
  }
};
