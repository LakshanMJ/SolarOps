import { prisma } from "../db/prisma.js";
import { User } from "@prisma/client";

/**
 * Get all users
 * Excludes password field for security
 */
export async function getUsersService(): Promise<Omit<User, "password">[]> {
  // Fetch all users
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Remove password before returning
  return users.map(({ password, ...rest }) => rest);
}