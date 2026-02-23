import { Request, Response } from 'express'
import { createInverterService, getInvertersService } from '../services/inverters.service.js'

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
    const data = await createInverterService(req.body)
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create inverter' })
  }
}