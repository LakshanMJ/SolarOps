import { getSitesService } from '../services/sites.service.js'

export async function getSites(req:any, res:any) {
  try {
    const sites = await getSitesService()
    res.json(sites)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch sites' })
  }
}
