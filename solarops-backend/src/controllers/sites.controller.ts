import type { NextFunction } from 'express'
import { prisma } from '../db/prisma.js'
import { createSiteService, deleteSiteService, getSiteByIdService, getSitesService, updateSiteService } from '../services/sites.service.js'
import { Request, Response } from "express";

export const createSite = async (req, res) => {
  try {
    const newSite = await createSiteService(req.body);
    res.status(201).json(newSite);
  } catch (error) {
    if (error instanceof Error && error.message === "VALIDATION_ERROR") {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.error("Error creating site:", error);
    res.status(500).json({ error: "Internal server error" });
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

    const site = await getSiteByIdService(id);

    res.json(site);
  } catch (error) {
    if (error instanceof Error && error.message === "SITE_NOT_FOUND") {
      return res.status(404).json({ error: "Site not found" });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to fetch site" });
  }
}

export const updateSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid site id" });
    }

    const updatedSite = await updateSiteService(id, data);

    if (!updatedSite) {
      return res.status(404).json({ message: "Site not found" });
    }

    res.status(200).json(updatedSite);
  } catch (error: any) {
    if (error instanceof Error && error.message === "VALIDATION_ERROR") {
      return res.status(400).json({ error: "All fields are required" });
    }

    console.error("Error updating site:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSite = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid site id" });
    }

    const result = await deleteSiteService(id);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(404).json({
      message: error.message || "Failed to delete site",
    });
  }
};