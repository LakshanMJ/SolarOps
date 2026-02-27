import type { NextFunction } from 'express'
import { prisma } from '../db/prisma.js'
import { deleteSiteService, getSitesService } from '../services/sites.service.js'
import { Request, Response } from "express";

// NEW createSite
export const createSite = async (req, res) => {
  console.log("Received body:", req.body);
  try {
    const { name, latitude, longitude, region, peakCapacityMw } = req.body;

    // Basic validation
    if (!name || latitude == null || longitude == null || !region || !peakCapacityMw) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newSite = await prisma.site.create({
      data: {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        region,
        peakCapacityMw: parseFloat(peakCapacityMw),
      },
    });

    res.status(201).json(newSite);
  } catch (error) {
    console.error('Error creating site:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export async function getSites(req: any, res: any) {
  try {
    const sites = await getSitesService()
    res.json(sites)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch sites' })
  }
}

export async function getSiteById(req: any, res: any) {
  try {
    const { id } = req.params;
    const site = await prisma.site.findUnique({
      where: { id },
    });
    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }
    res.json(site);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch site' });
  }
}

export const deleteSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await deleteSiteService(id);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({
      message: error.message || "Failed to delete site",
    });
  }
};