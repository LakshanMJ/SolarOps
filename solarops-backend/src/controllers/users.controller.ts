import { Request, Response } from 'express'
import { prisma } from '../db/prisma.js'
import { createUserService, deleteUserService, getUsersByIdService, getUsersService, updateUserService } from '../services/users.service.js'

export async function createUser(req: Request, res: Response) {
  try {
    const data = await createUserService(req.body)
    res.status(201).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create user' })
  }
}

export async function getUsers(req: Request, res: Response) {
  console.log('Fetching users...')
  try {
    const data = await getUsersService()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch users' })
  }
}

export async function getUsersById(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

    const data = await getUsersByIdService(id)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch user' })
  }
}

export async function updateUser(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params
    const data = await updateUserService(id, req.body)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update user' })
  }
}

export async function deleteUser(req: Request<{ id: string }>, res: Response) {
  try {
    const { id } = req.params
    const data = await deleteUserService(id)
    res.json({ message: 'User deleted successfully', user: data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete user' })
  }
}