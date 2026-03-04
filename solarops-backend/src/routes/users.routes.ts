import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { getUsers } from '../controllers/users.controller.js'

const router = Router()

router.get('/', authMiddleware, getUsers)
// router.get("/:id", authMiddleware, getUsersById);
// router.put('/:id', authMiddleware, updateUser)
// router.delete('/:id', authMiddleware, deleteUser);

export default router
