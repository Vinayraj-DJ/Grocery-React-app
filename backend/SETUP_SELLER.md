# Seller Account Setup Guide

## Overview
The seller account in this grocery app is managed through environment variables. There's no need to create a database record - the authentication is based on values stored in your `.env` file.

## Current Seller Credentials
From your `.env` file:
- **Email**: `admin@gmail.com`
- **Password**: `admin123`

## How to Access the Seller Panel
1. Navigate to `/seller` in your browser (e.g., `http://localhost:5173/seller`)
2. You'll be redirected to the seller login page
3. Enter the credentials from your `.env` file

## Changing Seller Credentials
To change the seller login credentials:

1. Open your `.env` file in the backend folder
2. Modify these lines:
   ```
   SELLER_EMAIL=your_new_email@example.com
   SELLER_PASSWORD=your_new_password
   ```

## Verification Script
We've included a script to verify your seller account is properly configured:

```bash
# From the backend directory
npm run setup-seller
```

This will check if the required environment variables are properly set.

## Features Available to Seller
Once logged in, the seller can:
- Add new products
- View product list
- Manage orders (approve/cancel based on item availability)
- Update product stock status

## Security Note
Remember to use strong passwords in production environments and never commit your `.env` file to version control.