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

// Create Content (Admin)
export const createContent = async (req: Request, res: Response) => {
    try {
        const { type, content } = req.body;

        const contentExists = await Content.findOne({ type });
        if (contentExists) {
            res.status(400);
            throw new Error('Content already exists');
        }

        const newContent = await Content.create({
            type,
            content
        });

        res.status(201).json(newContent);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// Update Content (Admin)
export const updateContent = async (req: Request, res: Response) => {
    try {
        const { type } = req.params;
        const { content } = req.body;

        const contentItem = await Content.findOne({ type });

        if (contentItem) {
            contentItem.content = content || contentItem.content;
            const updatedContent = await contentItem.save();
            res.json(updatedContent);
        } else {
            res.status(404).json({ message: 'Content not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
