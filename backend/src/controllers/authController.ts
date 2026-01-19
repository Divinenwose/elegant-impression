import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Need to install bcryptjs
import User from '../models/User';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_dev_key', {
        expiresIn: '30d',
    });
};

export const authUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // Simple password check (In real app use bcrypt.compare)
        // For this V1 setup I'll assume we seed admin with hashed password or plain if we skip bcrypt for now
        // BUT best practice is bcrypt. 
        // Let's stick to bcrypt since it's standard.
        // I will install bcryptjs.

        if (user && (await bcrypt.compare(password, user.password_hash))) {
            res.json({
                _id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
