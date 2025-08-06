import express from 'express';
import { createAdmin, getAdmins, updateAdmin, deleteAdmin } from '../controllers/adminControllers';

const router = express.Router();

router.post('/', createAdmin);
router.get('/', getAdmins);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;