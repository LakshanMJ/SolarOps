import { Request, Response } from 'express'
import { createOrUpdateInverterService, deleteInverterService, getInvertersService } from '../services/inverters.service.js'
import { prisma } from '../db/prisma.js'

export async function getInverters(req: Request, res: Response) {
  try {
    const data = await getInvertersService()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch inverters' })
  }
}

export async function createInverter(req: Request, res: Response) {
  try {
    const data = await createOrUpdateInverterService(req.body)
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create inverter' })
  }
}

export const getInverterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const inverter = await prisma.inverter.findUnique({
      where: { id },
      include: {
        site: true,        // optional relations
        manufacturer: true
      }
    });

    if (!inverter) {
      return res.status(404).json({
        message: "Inverter not found",
      });
    }
    res.json(inverter);
  } catch (error) {
    console.error("Fetch inverter error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteInverter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await deleteInverterService(id);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({
      message: error.message || "Failed to delete inverter",
    });
  }
};