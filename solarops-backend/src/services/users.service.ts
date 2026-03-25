import { prisma } from "../db/prisma.js";

export async function getUsersService() {
  // Fetch all users with roles, excluding password directly
  const users = await prisma.user.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userName: true,
      phone: true,
      avatarUrl: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      roles: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  // users already excludes password
  return users;
}

export async function getUsersByIdService(id: string) {
  const user = await prisma.user.findFirst({
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
      phone: true,
      avatarUrl: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      roles: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!user) return null;

  return {
    ...user,
    // roles already has objects with id and name, so just return as-is
    roles: user.roles || [],
  };
}

export async function updateUserService(id: string, payload: any) {
  const { roles, ...rest } = payload;

  return prisma.user.update({
    where: { id },
    data: {
      ...rest,
      ...(roles && {
        roles: {
          set: roles.map((roleId: string) => ({ id: roleId })),
        },
      }),
    },
  });
}

export async function deleteUserService(id: string) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  // remove password before returning
  const { password, ...rest } = updatedUser;
  return rest;
}