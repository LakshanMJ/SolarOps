import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { deleteUser, getUsers, getUsersById, updateUser } from '../controllers/users.controller.js'
import { createRole, deleteRole, getRoleById, getRoles, updateRole } from '../controllers/roles.controller.js'

const router = Router()

router.post('/', authMiddleware,createRole);
router.get('/', authMiddleware, getRoles);
router.get("/:id", authMiddleware, getRoleById);
router.put('/:id', authMiddleware, updateRole);   
router.delete('/:id', authMiddleware, deleteRole);

export default router
