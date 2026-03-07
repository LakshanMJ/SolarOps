import { Request, Response } from "express"
import { createRoleService, deleteRoleService, getRoleByIdService, getRolesService, updateRoleService } from "../services/roles.services.js"

interface CreateRoleBody {
  name: string
}

export async function createRole(
  req: Request<{}, {}, CreateRoleBody>,
  res: Response
) {
  try {
    const data = await createRoleService(req.body)
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to create role" })
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

interface UpdateRoleBody {
  name?: string
}

export async function updateRole(
  req: Request<{ id: string }, {}, UpdateRoleBody>,
  res: Response
) {
  try {
    const { id } = req.params
    const data = await updateRoleService(id, req.body)

    if (!data) {
      return res.status(404).json({ message: "Role not found" })
    }

    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to update role" })
  }
}

export async function deleteRole(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params
    const data = await deleteRoleService(id)

    if (!data) {
      return res.status(404).json({ message: "Role not found" })
    }

    res.json({ message: "Role deleted successfully", role: data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to delete role" })
  }
}