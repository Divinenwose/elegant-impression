# Database Update Guide: Preserving Cloudinary URLs

This guide explains how to update your local MongoDB database to include the new `slug` field for products without losing existing Cloudinary image URLs.

## Prerequisites
- Ensure you have the latest backend code pulled.
- Ensure your `.env` file is set up correctly (connected to your local MongoDB).
- Run `npm install` to ensure all dependencies are up to date.

## The Seed Script
The logic in `src/scripts/seed.ts` has been updated to:
1.  **Backup** existing images from your database into memory.
2.  **Clear** the current database collections (Products, Categories, Content).
3.  **Re-seed** the database with the updated schema (including the new `slug` field).
4.  **Restore** the backed-up images to the corresponding products.

## Steps to Update

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Run the seed script:**
    ```bash
    npm run seed
    ```
    *You should see output indicating that images were backed up and restored.*
    
    Example Output:
    ```text
    Fetching existing products to backup images...
    Backed up images for X products.
    Clearing existing data...
    Seeding Products...
    Data Seeding Complete!
    ```

3.  **Verify the update:**
    You can run the verification script to confirm slugs are present and images are preserved:
    ```bash
    npx ts-node src/scripts/check-slugs.ts
    ```

## Troubleshooting
- If you see `imagesCount: 0` for products that previously had images, ensure that the product names in the seed file match exactly what was in the database.
- If the script fails, check your MongoDB connection in `.env`.
