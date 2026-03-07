import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const roles = user.roles.map(r => r.name);

    const token = jwt.sign(
      { userId: user.id, roles }, // note plural
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};