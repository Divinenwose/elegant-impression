import express from 'express';
import { createOrder, getOrderById, calculateQuote } from '../controllers/orderController';

const router = express.Router();

router.post('/calculate', calculateQuote);
router.post('/', createOrder);
router.get('/:id', getOrderById);

export default router;
