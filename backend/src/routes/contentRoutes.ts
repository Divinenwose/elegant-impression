import express from 'express';
import { getContent } from '../controllers/contentController';

const router = express.Router();

router.get('/:type', getContent);

export default router;
