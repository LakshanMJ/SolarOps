import bcrypt from "bcrypt";
import { prisma } from "../db/prisma.js";
import { Role } from "@prisma/client"; // if using enum Role

interface CreateUserInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  role?: Role; // defaults to USER if not provided
}

// 🔹 Create a new user
export const createUser = async (input: CreateUserInput) => {
  console.log("Create user input:", input);
  const { email, password, firstName, lastName, phone, avatarUrl, role } = input;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || Role.USER, // default to USER
      firstName,
      lastName,
      phone,
      avatarUrl,
      isActive: true,           // default true
      lastLoginAt: null,        // will update on login
    },
  });

  return user;
};

// 🔹 Login user
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  // Check if user is active
  if (!user.isActive) throw new Error("User account is deactivated");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  // Update last login time
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return user;
};