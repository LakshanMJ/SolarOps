import { Request, Response } from 'express';
import { PrismaClient, AlertStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const getAlerts = async (req: Request, res: Response) => {
  const alerts = await prisma.alert.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(alerts);
};

export const updateAlertStatus = async (req: Request, res: Response) => {
  let { id } = req.params;

  // Make sure id is a string
  if (Array.isArray(id)) id = id[0];

  const { status } = req.body as { status: AlertStatus };

  try {
    const alert = await prisma.alert.update({
      where: { id },
      data: { status },
    });

    res.json(alert);
  } catch (error) {
    res.status(400).json({ error: 'Alert not found or invalid request' });
  }
};
