import { Request, Response } from 'express';
import { sendContactFormEmail } from '../services/emailService';

export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Basic Validation
        if (!name || !email || !service || !message) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        // Send Email
        await sendContactFormEmail({ name, email, phone, service, message });

        res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('[CONTACT] Error submitting form:', error);
        res.status(500).json({ message: 'Failed to send message.' });
    }
};
