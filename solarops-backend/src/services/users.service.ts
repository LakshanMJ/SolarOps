import { prisma } from "../db/prisma.js";

export async function getUsersService() {
  // Fetch all users with full related data
  const users = await prisma.user.findMany({
    where: {
      deletedAt: null // Soft-delete filter
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
      contactNumber: true, // Corrected from 'phone' to match your Prisma model
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
      // Include the relation arrays
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
      deletedAt: null, // Ensures we don't fetch "soft-deleted" users
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userName: true,
      contactNumber: true,     // Corrected from 'phone'
      designation: true,       // Corrected from 'title'
      employeeIdNumber: true,
      onboardingDate: true,
      image: true,
      timezone: true,
      notificationChannels: true,
      twoFactorEnabled: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      // Include Relations
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
      // 1. Handle Number conversion if necessary
      employeeIdNumber: employeeIdNumber ? employeeIdNumber : null,

      // 2. Handle Date conversion
      onboardingDate: onboardingDate ? new Date(onboardingDate) : null,

      // 3. Update Roles (Many-to-Many)
      // 'set' replaces all existing roles with the new list
      ...(roles && {
        roles: {
          set: roles.map((roleId: string) => ({ id: roleId })),
        },
      }),

      // 4. Update Assigned Sites (Many-to-Many)
      ...(assignedSites && {
        assignedSites: {
          set: assignedSites.map((siteId: string) => ({ id: siteId })),
        },
      }),
    },
    // Optional: Select what to return to the frontend
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

  // remove password before returning
  const { password, ...rest } = updatedUser;
  return rest;
}