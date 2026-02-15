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
  const { id } = req.params;
  const { status } = req.body;

  const alert = await prisma.alert.update({
    where: { id },
    data: { status: status as AlertStatus },
  });

  res.json(alert);
};
