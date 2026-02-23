import { Request, Response } from 'express'
import { getManufacturersService } from '../services/manufacturers.service.js'

export async function getManufacturers(req: Request, res: Response) {
  try {
    const data = await getManufacturersService()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch manufacturers' })
  }
}