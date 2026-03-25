import { Request, Response } from "express"
import { createOrUpdateRoleService, deleteRoleService, getRoleByIdService, getRolesService } from "../services/roles.services.js"
import { prisma } from "../db/prisma.js"
import type { AuthRequest } from "../middleware/auth.middleware.js"

export async function createOrUpdateRole(req: Request, res: Response) {
  try {
    const data = await createOrUpdateRoleService(req.body)

    if (!data) {
      return res.status(404).json({ message: 'Role not found' })
    }

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create or update role' })
  }
}

export async function getRoles(req: Request, res: Response) {
  try {
    const data = await getRolesService()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch roles" })
  }
}

export async function getRoleById(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params
    const data = await getRoleByIdService(id)

    if (!data) {
      return res.status(404).json({ message: "Role not found" })
    }

    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to fetch role" })
  }
}

export async function deleteRole(req: AuthRequest, res: Response) {
  try {
    const id = req.params.id as string; // 🔥 cast here

    // Only System Administrator can delete
    if (req.user?.role !== "System Administrator") {
      return res.status(403).json({ message: "Only System Administrators can delete roles" });
    }

    const data = await deleteRoleService(id);

    if (!data) return res.status(404).json({ message: "Role not found" });

    res.json({ message: "Role deleted successfully", role: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete role" });
  }
}