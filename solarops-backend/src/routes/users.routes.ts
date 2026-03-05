import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { deleteUser, getUsers, getUsersById, updateUser } from '../controllers/users.controller.js'
import { register } from '../controllers/auth.controller.js'

const router = Router()

router.post('/', authMiddleware,register)
router.get('/', authMiddleware, getUsers)
router.get("/:id", authMiddleware, getUsersById);
router.put('/:id', authMiddleware, updateUser)   
router.delete('/:id', authMiddleware, deleteUser);

export default router
