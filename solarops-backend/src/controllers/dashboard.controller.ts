import { Request, Response } from 'express'
import { getDashboardKpisService } from '../services/dashboard.service.js'

export async function getDashboardKpis(
  req: Request,
  res: Response
) {
  try {
    const kpis = await getDashboardKpisService()
    res.json(kpis)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Failed to load dashboard KPIs'
    })
  }
}
