import { Request, Response } from 'express'
import { getInvertersService } from '../services/inverters.service.js'

export async function getInverters(req: Request, res: Response) {
  try {
    const data = await getInvertersService()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch inverters' })
  }
}
