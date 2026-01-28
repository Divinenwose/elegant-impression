import express from 'express';
import { getContent, createContent, updateContent } from '../controllers/contentController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:type', getContent);
router.post('/', protect, admin, createContent);
router.put('/:type', protect, admin, updateContent);

export default router;
