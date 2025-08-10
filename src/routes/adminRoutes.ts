import express from 'express';
import { createAdmin, getAdmins, updateAdmin, deleteAdmin } from '../controllers/adminController';
import authToken from '../middlewares/authTokenHandler';

const router = express.Router();

router.post('/', authToken, createAdmin);
router.get('/', authToken, getAdmins);
router.put('/:id', authToken, updateAdmin);
router.delete('/:id', authToken, deleteAdmin);

export default router;