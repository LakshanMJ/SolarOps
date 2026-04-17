import { createOrUpdateSiteService, deleteSiteService, getSiteByIdService, getSitesService } from '../services/sites.service.js'
import { Request, Response } from "express";

export const createOrUpdateSite = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const payload = {
      id,
      ...req.body,
    };
    const site = await createOrUpdateSiteService(payload);
    if (!site && id) {
      return res.status(404).json({ message: "Site not found" });
    }
    res.status(id ? 200 : 201).json(site);
  } catch (error) {
    if (error instanceof Error && error.message === "VALIDATION_ERROR") {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.error("Error creating/updating site:", error);
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