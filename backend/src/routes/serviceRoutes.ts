import express from 'express';
import { getServices } from '../controllers/productController';

const router = express.Router();

router.get('/', getServices);

export default router;
