import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {createOrUpdateRole, deleteRole, getRoleById, getRoles } from '../controllers/roles.controller.js'

const router = Router()

router.post('/', authMiddleware,createOrUpdateRole);
router.get('/', authMiddleware, getRoles);
router.get("/:id", authMiddleware, getRoleById);
router.put('/:id', authMiddleware, createOrUpdateRole);   
router.delete('/:id', authMiddleware, deleteRole);

export default router
