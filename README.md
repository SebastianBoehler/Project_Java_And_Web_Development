# E-Commerce Site with Admin Panel

This is my e-commerce project for the "Project: Java and Web Development" course. Built with Next.js and featuring a full admin panel to manage products.

## Live Demo

The site is hosted on Vercel and can be accessed at:
https://project-java-and-web-development.vercel.app/

## Requirements

- Node.js v14.13.1 or higher (required for `node:crypto` module support)
- _(Developed on Node.js v23.7.0)_
- Supabase database and storage
- OpenAI API key

## Setup

Getting this up and running is pretty straightforward:

1. Clone the repo with `git clone https://github.com/SebastianBoehler/Project_Java_And_Web_Development.git`
2. Move into the project directory with `cd Project_Java_And_Web_Development`
3. Set up your environment variables:
   ```
   OPENAI_API_KEY=your_key_here
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```
4. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```
5. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

## Tech Stack

- Next.js for the frontend and API routes
- Supabase for database and storage
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
