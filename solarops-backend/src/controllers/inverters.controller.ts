import { Request, Response } from 'express'
import { createOrUpdateInverterService, deleteInverterService, getInverterByIdService, getInvertersService } from '../services/inverters.service.js'
import { prisma } from '../db/prisma.js'

export async function createInverter(req: Request, res: Response) {
  try {
    const data = await createOrUpdateInverterService(req.body)
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create inverter' })
  }
}

export async function getInverters(req: Request, res: Response) {
  try {
    const data = await getInvertersService()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch inverters' })
  }
}

export const getInverterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid inverter id" });
    }
    const inverter = await getInverterByIdService(id);
    res.json(inverter);
  } catch (error) {
    if (error instanceof Error && error.message === "INVERTER_NOT_FOUND") {
      return res.status(404).json({
        message: "Inverter not found",
      });
    }
    console.error("Fetch inverter error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteInverter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (Array.isArray(id)) {
      throw new Error("Invalid inverter id");
    }
    const result = await deleteInverterService(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({
      message: error.message || "Failed to delete inverter",
    });
  }
};