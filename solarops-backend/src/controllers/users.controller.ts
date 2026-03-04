import { Request, Response } from 'express'
import { prisma } from '../db/prisma.js'
import { getUsersService } from '../services/users.service.js'

export async function getUsers(req: Request, res: Response) {
  try {
    const data = await getUsersService()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch users' })
  }
}