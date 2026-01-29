import cloudinary from '../config/cloudinary';
import fs from 'fs';

export const uploadImage = async (filePath: string, folder: string = 'products'): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `elegant_impressions/${folder}`,
            use_filename: true,
            unique_filename: false,
        });

        // Remove file from local after upload if needed? For now keep it simple.
        // fs.unlinkSync(filePath); 

        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Image upload failed');
    }
};
