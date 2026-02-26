import { Router } from 'express'
import { createInverter, deleteInverter, getInverterById, getInverters } from '../controllers/inverters.controller.js'

const router = Router()

router.post('/', createInverter)
router.get('/', getInverters)
router.get("/:id", getInverterById);
router.put('/:id', createInverter) // reuse create for updates (upsert)
router.delete('/:id', deleteInverter);

export default router
