import bcrypt from "bcrypt";
import { prisma } from "../db/prisma.js";

interface CreateUserPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  userName?: string;
  roles?: string[];
}

export const createUser = async (payload: CreateUserPayload) => {
  const { email, firstName, lastName, phone, avatarUrl, userName, roles } = payload;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already in use");

  // Auto-generate temp password
  const tempPassword = "solar@123";
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  // Connect roles by ID directly
  const rolesToConnect: { id: string }[] = [];
  if (roles && roles.length > 0) {
    for (const roleId of roles) {
      // Optional: check if the role ID exists
      const roleRecord = await prisma.role.findUnique({ where: { id: roleId } });
      if (!roleRecord) throw new Error(`Role ID '${roleId}' does not exist`);
      rolesToConnect.push({ id: roleId });
    }
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      avatarUrl,
      userName,
      roles: { connect: rolesToConnect },
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userName: true,
      phone: true,
      avatarUrl: true,
      roles: { select: { name: true, id: true } },
      isActive: true,
      createdAt: true,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { roles: true },
  });
  if (!user) throw new Error("Invalid credentials");
  if (!user.isActive) throw new Error("User account is deactivated");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });
  return user;
};