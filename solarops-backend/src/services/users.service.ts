import { prisma } from "../db/prisma.js";
import { User } from "@prisma/client";

export async function createUserService(payload: any) {
  const tempPassword = payload.password || "Temp@123";

  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  // remove password before returning
  const { password, ...rest } = user;
  return rest;
}

export async function getUsersService(): Promise<Omit<User, "password">[]> {
  // Fetch all users
  const users = await prisma.user.findMany({
    where: { deletedAt: null }, 
    orderBy: { createdAt: "desc" },
  });

  // Remove password before returning
  return users.map(({ password, ...rest }) => rest);
}

export async function getUsersByIdService(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user || user.deletedAt) return null; // ignore soft-deleted
  const { password, ...rest } = user;
  return rest;
}

export async function updateUserService(id: string, payload: any) {
  return prisma.user.update({
    where: { id },
    data: payload,
  })
}

export async function deleteUserService(id: string) {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() }, // mark as deleted
  });

  // remove password before returning
  const { password, ...rest } = updatedUser;
  return rest;
}