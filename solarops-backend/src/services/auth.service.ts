import bcrypt from "bcrypt";
import { prisma } from "../db/prisma.js";

interface CreateUserInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  userName?: string;
  roles?: string[]; // defaults to USER if not provided
}

// 🔹 Create a new user
export const createUser = async (input: CreateUserInput) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phone,
    avatarUrl,
    userName,
    roles,
  } = input;

  const tempPassword = password || "Solar@123";

  const hashedPassword = await bcrypt.hash(tempPassword, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      avatarUrl,
      userName,
      isActive: true,
      lastLoginAt: null,

      // 👇 default USER role if none provided
      roles: {
        connect: roles?.length
          ? roles.map((roleName) => ({ name: roleName }))
          : [{ name: "USER" }],
      },
    },
    include: {
      roles: true,
    },
  });

  return user;
};

// 🔹 Login user
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