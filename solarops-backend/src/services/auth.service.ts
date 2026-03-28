import bcrypt from "bcrypt";
import { prisma } from "../db/prisma.js";

import { PrismaClient, NotificationChannel } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserPayload {
  firstName: string;
  lastName: string;
  userName: string;
  designation: string;
  employeeIdNumber: string;
  onboardingDate: string;   // ISO string from frontend
  email: string;
  contactNumber: string;
  assignedSites: string[];  // Array of Site IDs
  roles: string[];           // Array of Role IDs
  timezone: string;
  notificationChannels: NotificationChannel[]; // Use Prisma Enum
  twoFactorEnabled: boolean;
  image?: string;
}

export const createUser = async (payload: CreateUserPayload) => {
  const {
    firstName,
    lastName,
    userName,
    designation,
    employeeIdNumber,
    onboardingDate,
    email,
    contactNumber,
    assignedSites,
    roles,
    timezone,
    notificationChannels,
    twoFactorEnabled,
    image,
  } = payload;

  // 1. Check if email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already in use");

  // 2. Hash temporary password
  const tempPassword = "solar@123";
  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  // 3. Validate Roles and Sites exist (Efficiency: One query instead of a loop)
  const [validRoles, validSites] = await Promise.all([
    prisma.role.findMany({ where: { id: { in: roles } } }),
    prisma.site.findMany({ where: { id: { in: assignedSites } } }),
  ]);

  if (validRoles.length !== roles.length) throw new Error("One or more Role IDs are invalid");
  if (validSites.length !== assignedSites.length) throw new Error("One or more Site IDs are invalid");

  // 4. Create User
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userName,
      designation,
      employeeIdNumber,
      onboardingDate: onboardingDate ? new Date(onboardingDate) : null, // Convert string to Date object
      contactNumber,
      timezone,
      notificationChannels,
      twoFactorEnabled,
      image,
      // Many-to-Many connections
      roles: {
        connect: roles.map((id) => ({ id })),
      },
      assignedSites: {
        connect: assignedSites.map((id) => ({ id })),
      },
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userName: true,
      contactNumber: true, // Fixed: your select had 'phone' but model has 'contactNumber'
      image: true,
      roles: { select: { name: true, id: true } },
      assignedSites: { select: { name: true, id: true } }, // Included this for the UI
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