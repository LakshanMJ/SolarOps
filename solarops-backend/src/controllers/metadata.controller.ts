import { Request, Response } from "express";
import { getMetadata } from "../services/metadata.services.js";

export const fetchMetadata = (req: Request, res: Response) => {
  const data = getMetadata();
  res.json(data);
};