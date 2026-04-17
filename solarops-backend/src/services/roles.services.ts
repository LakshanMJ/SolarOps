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

export async function getRolesService() {
    return prisma.role.findMany({
        where: { deletedAt: null },
        orderBy: {
            createdAt: 'desc',
        },
    })
}

export async function getRoleByIdService(id: string) {
    return prisma.role.findFirst({
        where: {
            id,
            deletedAt: null,
        },
    })
}

export async function deleteRoleService(id: string) {
    const existing = await prisma.role.findUnique({ where: { id } })
    if (!existing) return null

    const deletedRole = await prisma.role.update({
        where: { id },
        data: { deletedAt: new Date() },
    })

    return deletedRole
}