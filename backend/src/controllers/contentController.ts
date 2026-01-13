import { Request, Response } from 'express';
import Content from '../models/Content';

export const getContent = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;
        const content = await Content.findOne({ type });
        if (content) {
            res.json(content);
        } else {
            res.status(404).json({ message: 'Content not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
