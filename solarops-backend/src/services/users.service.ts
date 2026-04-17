import { prisma } from "../db/prisma.js";

export async function getUsersService() {
    const users = await prisma.user.findMany({
        where: {
            deletedAt: null
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            userName: true,
            contactNumber: true,
            designation: true,
            employeeIdNumber: true,
            onboardingDate: true,
            image: true,
            timezone: true,
            notificationChannels: true,
            twoFactorEnabled: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            lastLoginAt: true,
            roles: {
                select: {
                    id: true,
                    name: true,
                },
            },
            assignedSites: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return users;
}

export async function getUsersByIdService(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id,
            deletedAt: null,
        },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            userName: true,
            contactNumber: true,
            designation: true,
            employeeIdNumber: true,
            onboardingDate: true,
            image: true,
            timezone: true,
            notificationChannels: true,
            twoFactorEnabled: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            roles: {
                select: {
                    id: true,
                    name: true,
                },
            },
            assignedSites: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    if (!user) return null;

    return user;
}

export async function updateUserService(id: string, payload: any) {
    const {
        roles,
        assignedSites,
        onboardingDate,
        employeeIdNumber,
        ...rest
    } = payload;

    return prisma.user.update({
        where: { id },
        data: {
            ...rest,
            employeeIdNumber: employeeIdNumber ? employeeIdNumber : null,
            onboardingDate: onboardingDate ? new Date(onboardingDate) : null,
            ...(roles && {
                roles: {
                    set: roles.map((roleId: string) => ({ id: roleId })),
                },
            }),
            ...(assignedSites && {
                assignedSites: {
                    set: assignedSites.map((siteId: string) => ({ id: siteId })),
                },
            }),
        },

        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            roles: { select: { id: true, name: true } },
            assignedSites: { select: { id: true, name: true } },
        }
    });
}

export async function deleteUserService(id: string) {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
    });

    const { password, ...rest } = updatedUser;
    return rest;
}