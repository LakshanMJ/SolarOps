import { prisma } from "../db/prisma.js";

export async function createRoleService(payload: { name: string }) {
    const role = await prisma.role.create({
        data: {
            name: payload.name,
        },
    });

    return role;
}

// Fetch all roles that are NOT soft-deleted
export async function getRolesService() {
    return prisma.role.findMany({
        where: { deletedAt: null },
        orderBy: { name: "asc" },
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

export async function updateRoleService(id: string, payload: { name?: string }) {
    // Optional: check if role exists first
    const existing = await prisma.role.findUnique({ where: { id } })
    if (!existing) return null

    return prisma.role.update({
        where: { id },
        data: payload,
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