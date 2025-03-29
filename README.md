# E-Commerce Site with Admin Panel

This is my e-commerce project for the "Project: Java and Web Development" course. Built with Next.js and featuring a full admin panel to manage products.

## What's in the box

- Full-featured e-commerce storefront
- Admin dashboard for inventory management
- OPEN AI DALL-E for product image generation

## Requirements

- Node.js v14.13.1 or higher (required for `node:crypto` module support)
- _(Developed on Node.js v23.7.0)_
- MongoDB database
- OpenAI API key

## Setup

Getting this up and running is pretty straightforward:

1. Clone the repo
2. Set up your environment variables:
   ```
   OPENAI_API_KEY=your_key_here
   MONGODB_URL=your_mongodb_connection_string
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```
4. Fire it up:
   ```bash
   npm run dev
   # or
   bun dev
   ```

## Tech Stack

- Next.js for the frontend and API routes
- MongoDB for database
- OpenAI for product description and images
- Tailwind CSS for styling
- Node.js native crypto module for secure authentication

## Features

- Responsive design that works on mobile and desktop
- Real-time inventory updates
- Session specific shopping cart
- Admin dashboard with secure authentication
- Product description and image generation

---

_Built by Sebastian Boehler, CS Student_
