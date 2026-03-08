import { prisma } from "../db/prisma.js";

export async function createOrUpdateRoleService(payload: {
  id?: string
  name: string
}) {
  if (payload.id) {
    const existing = await prisma.role.findUnique({
      where: { id: payload.id },
    })

    if (!existing) return null

    return prisma.role.update({
      where: { id: payload.id },
      data: {
        name: payload.name,
      },
    })
  }

  return prisma.role.create({
    data: {
      name: payload.name,
    },
  })
}

// Fetch all roles that are NOT soft-deleted
export async function getRolesService() {
  return prisma.role.findMany({
    where: { deletedAt: null },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

// Fetch single role by id, ignoring soft-deleted roles
export async function getRoleByIdService(id: string) {
  return prisma.role.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  })
}

export async function deleteRoleService(id: string) {
  // Check if role exists first
  const existing = await prisma.role.findUnique({ where: { id } })
  if (!existing) return null

  // Soft delete by setting deletedAt
  const deletedRole = await prisma.role.update({
    where: { id },
    data: { deletedAt: new Date() },
  })

  return deletedRole
}