import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await createUser(email, password);
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};